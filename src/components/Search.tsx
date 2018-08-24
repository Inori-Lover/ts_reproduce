// 搜索组件
// 以后还是用react-
import React, { PureComponent } from 'react'
import ReactDom from 'react-dom'

import { Omit } from '../tools/Omit'
import { withDefaultProps } from '../tools/defaultProps'

import './base.scss'
import './Search.scss'

/**
 * 全量State
 *
 * @desc
 * 按照最佳实践React的State应该在初始化时全部备齐，如数据不在初始化时获取则初始化为null
 * 保证类型完整
 */
type InitalState = {
  popup: boolean
  value: string
  transformTop: string
  currentScrollPositon: number|null
  container: null|HTMLDivElement
}

/**
 * 不允许外部修改的 State 的 属性列表
 */
type ShadowState = ''

/**
 * 对外导出的State
 */
export type State = Partial<Omit<InitalState, ShadowState>>

const defaultProps: DefaultProps = {
  syncbetween: 0,
}

type DefaultProps = {
  syncbetween: 0|1
}

/**
 * 对外export的组件的Props不能有boolean, 这是为了保证属性可以出现DOM中
 */
type Props = {
  syncbetween?: 0|1
} & ( DefaultProps & Partial<React.InputHTMLAttributes<HTMLInputElement>>)

type FakeSearchPanleProps = {
  hide: boolean
  onClose?: (() => void)
  value?: string
}
type FakeSearchPanleState = {
  value: string
  hide: boolean
  _timer: number|null
  _scrollPosition: number|null
}

class FakeSearchPanle extends PureComponent<FakeSearchPanleProps & React.HTMLAttributes<HTMLInputElement>, FakeSearchPanleState> {
  readonly state: FakeSearchPanleState = {
    value: this.props.value || '',
    hide: true,
    _timer: null,
    _scrollPosition: null
  }

  private inputElementRef: React.RefObject<HTMLInputElement> = React.createRef()

  private changeHandle = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value
    this.setState(function () {
      return {
        value: value,
      }
    })
    this.props.onChange && this.props.onChange(evt)
  }

  /**
   * 这个点击不focus的现象还不清楚是什么原理，似乎是fstclick带进来的bug但是并不清除触发条件
   */
  private focusHelper = (evt: React.MouseEvent<HTMLInputElement>) => {
    evt.stopPropagation()
    this.inputElementRef.current && this.inputElementRef.current.focus()
  }

  private clickHandle = (evt: React.MouseEvent<HTMLDivElement>) => {
    this.close()
    this.state._timer && window.clearInterval(this.state._timer)
    this.props.onClose && this.props.onClose()
  }

  public popup = () => {
    this.setState(function () {
      return {
        hide: false,
        _scrollPosition: window.scrollY,
      }
    })
    this.inputElementRef.current && this.inputElementRef.current.focus()
    const _timer = window.setInterval(function () {
      scrollTo(0, 0)
    }, 100)
    this.setState(function () {
      return {
        _timer: _timer
      }
    })
    setTimeout(() => {
      if (this.state._timer) {
        clearInterval(this.state._timer)
        this.setState(function () {
          return {
            _timer: null
          }
        })
      }
    }, 800)
  }
  public close = () => {
    if (this.state._scrollPosition) {
      scrollTo(0, this.state._scrollPosition)
      this.setState(function () {
        return {
          _scrollPosition: null
        }
      })
    }
    this.setState(function () {
      return {
        hide: true,
        _timer: null,
      }
    })
  }

  public render () {
    return (
      <div className={`fake_search_panle ${!this.state.hide ? 'active' : 'hide'}`} onClick={this.clickHandle}>
        <div className="slie_border input_box">
          <input type='search' value={ this.state.value } onChange={ this.changeHandle } onClick={ this.focusHelper } ref={ this.inputElementRef } />
        </div>
      </div>
    )
  }
}

/**
 * @class SearchBar
 * @desc 搜索栏
 */
class SearchBar extends PureComponent<Props, InitalState> {
  readonly state: InitalState = {
    popup: false,
    value: this.props.value ? this.props.value + '' : '空值初始化',
    transformTop: '0px',
    currentScrollPositon: null,
    container: null,
  }

  private FakeSearchPanleRef: React.RefObject<FakeSearchPanle> = React.createRef()

  public componentDidMount () {
    const container = document.createElement('div')
    container.className = 'fake_search_panle_container'
    document.body.appendChild(container)
    ReactDom.render(<FakeSearchPanle onChange={ this.changeHandle } onClose={ this.closeHandle } hide={ !this.state.popup } ref={ this.FakeSearchPanleRef } value={ this.state.value } />, container)
    this.setState(function () {
      return {
        container: container
      }
    })
  }

  public componentWillUnmount () {
    if (this.state.container) {
      const container = this.state.container
      ReactDom.unmountComponentAtNode(container)
      container.remove()
    }
  }

  public changeHandle = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value
    this.props.syncbetween && this.setState(function () {
      return {
        value: value
      }
    })
    this.props.onChange && this.props.onChange(evt)
  }

  private popupHandle = () => {
    this.setState({
      popup: true,
    })
    if (this.FakeSearchPanleRef.current) {
      this.FakeSearchPanleRef.current.popup()
    }
    // 禁止文档滚动
    if (!document.body.className.match('js-temp_overflow_hidden')) {
      document.body.className += 'js-temp_overflow_hidden'
    }
  }

  private closeHandle = () => {
    // 取消禁止文档滚动
    if (document.body.className.match('js-temp_overflow_hidden')) {
      document.body.className = document.body.className.replace(/\s?js-temp_overflow_hidden/g, '')
    }
  }

  public render() {
    return (
      <div className='react_searchbar_input_container' style={{minHeight: '100px'}}>
        <div className="slie_border input_box" onClick={this.popupHandle}>
          <input {...this.props} readOnly value={this.state.value}/>
        </div>
      </div>
    )
  }
}

export default withDefaultProps(defaultProps, SearchBar)
