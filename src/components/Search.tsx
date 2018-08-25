// 搜索组件
// 以后还是用react-
import React, { PureComponent } from 'react'
import { RouteComponentProps, withRouter, Route } from 'react-router-dom'

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
  displayValue: string
  transformTop: string
  currentScrollPositon: number|null
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
  syncbetween: true,
}

type DefaultProps = {
  syncbetween: boolean
}

/**
 * 对外export的组件的Props不能有boolean, 这是为了保证属性可以出现DOM中
 */
type Props = {
  syncbetween?: boolean
} & ( DefaultProps & Partial<React.InputHTMLAttributes<HTMLInputElement>>)


/**
 * @class SearchBar
 * @desc 搜索栏
 */
class SearchBar extends PureComponent<Props & RouteComponentProps<any>, InitalState> {
  readonly state: InitalState = {
    popup: false,
    displayValue: this.props.value ? this.props.value + '' : '空值初始化',
    value: this.props.value ? this.props.value + '' : '空值初始化',
    transformTop: '0px',
    currentScrollPositon: null,
  }

  private FakeSearchPanleRef: React.RefObject<FakeSearchPanle> = React.createRef()
  private inputRef: React.RefObject<HTMLInputElement> = React.createRef()

  public changeHandle = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value
    this.props.syncbetween ? this.setState(function () {
      return {
        value: value,
        displayValue: value,
      }
    }) : this.setState(function () {
      return {
        value: value,
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
    // 历史记录管理
    this.props.history.replace({
      pathname: `${this.props.match.path}/search`,
      state: {
        search: true
      }
    })
  }

  private closeHandle = () => {
    // 取消禁止文档滚动
    if (document.body.className.match('js-temp_overflow_hidden')) {
      document.body.className = document.body.className.replace(/\s?js-temp_overflow_hidden/g, '')
    }
    // 历史记录管理
    this.props.history.replace({
      pathname: this.props.location.pathname.replace(/\/search$/, '')
    })
  }

  public render() {
    const { syncbetween, staticContext, ...nextProps } = this.props
    return (
      <div className='react_searchbar_input_container'>
        <div className="slie_border input_box" onClick={this.popupHandle}>
          <input {...nextProps} type="search" value={this.state.displayValue} ref={this.inputRef} readOnly />
        </div>
        <Route path={this.props.match.path} render={
          () => (
            <FakeSearchPanle {...nextProps} onChange={ this.changeHandle } onClose={ this.closeHandle } hide={ !this.state.popup } ref={ this.FakeSearchPanleRef } value={ this.state.value } />
          )
        } />
      </div>
    )
  }
}

export default withDefaultProps(defaultProps, withRouter(SearchBar))

/**
 * 伪弹窗Props定义
 */
type FakeSearchPanleProps = {
  hide: boolean
  onClose?: (() => void)
  value?: string
}
/**
 * 伪弹窗State定义
 */
type FakeSearchPanleState = {
  value: string
  hide: boolean
  _timer: number|null
  _scrollPosition: number|null
}

/**
 * 伪弹窗组件，未export
 */
class FakeSearchPanle extends PureComponent<FakeSearchPanleProps & React.HTMLAttributes<HTMLInputElement> & RouteComponentProps<any>, FakeSearchPanleState> {
  readonly state: FakeSearchPanleState = {
    value: this.props.value || '',
    hide: true,
    _timer: null,
    _scrollPosition: null
  }

  /**
   * 伪弹窗input 引用，主要用于处理focus相关操作
   */
  private inputElementRef: React.RefObject<HTMLInputElement> = React.createRef()

  /**
   * 路由信息读取，当路由以 /search 结尾则进行弹出
   */
  public componentDidMount () {
    if (this.props.location.pathname.match(/\/search$/)) {
      this.popup()
    }
  }

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

  private BlurHandle = () => {
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
      <div className={ `fake_search_panle ${ !this.state.hide ? 'active' : 'hide' }` } onClick={ this.BlurHandle }>
        <div className="slie_border input_box">
          <input type='search' value={ this.state.value } onChange={ this.changeHandle } onClick={ this.focusHelper } onBlur={ this.BlurHandle } ref={ this.inputElementRef } />
        </div>
      </div>
    )
  }
}
