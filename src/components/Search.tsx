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
  syncbetween: 1,
}

type DefaultProps = {
  syncbetween: 0|1
}

type Props = {
  syncbetween?: 0|1
} & ( DefaultProps & Partial<React.InputHTMLAttributes<HTMLInputElement>>)

const initalState: InitalState = {
  popup: false,
  value: 'init',
  transformTop: '0px',
  currentScrollPositon: null,
  container: null,
}

type FakeSearchPanleProps = {
  hide: boolean
}
type FakeSearchPanleState = {
  value: string
  hide: boolean
}

class FakeSearchPanle extends PureComponent<FakeSearchPanleProps & React.HTMLAttributes<HTMLInputElement>, FakeSearchPanleState> {
  readonly state: FakeSearchPanleState = {
    value: '',
    hide: true
  }

  private inputElementRef: React.RefObject<HTMLInputElement> = React.createRef()

  private changeHandle (evt: React.ChangeEvent<HTMLInputElement>) {
    this.setState(function () {
      return {
        value: '',
      }
    })
    this.props.onChange && this.props.onChange(evt)
  }

  /**
   * 这个点击不focus的现象还不清楚是什么原理，似乎是fstclick带进来的bug但是并不清除触发条件
   */
  private clickHandle = () => {
    this.inputElementRef.current && this.inputElementRef.current.focus()
  }

  public popup = () => {
    this.setState(function () {
      return {
        hide: false
      }
    })
  }

  public render () {
    return (
      <div className={`fake_search_panle ${!this.state.hide ? 'active' : 'hide'}`}>
        <div className="slie_border input_box">
          <input type='search' value={ this.state.value } onChange={ this.changeHandle } onClick={ this.clickHandle } ref={ this.inputElementRef } />
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
  readonly state: InitalState = initalState

  private FakeSearchPanleRef: React.RefObject<FakeSearchPanle> = React.createRef()

  public componentDidMount () {
    const container = document.createElement('div')
    container.className = 'fake_search_panle_container'
    document.body.appendChild(container)
    ReactDom.render(<FakeSearchPanle onChange={ this.props.onChange } hide={ !this.state.popup } ref={ this.FakeSearchPanleRef } />, container)
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

  private popupHandle = () => {
    this.setState({
      popup: true,
    })
    if (this.FakeSearchPanleRef.current) {
      console.log(this.FakeSearchPanleRef.current.state)
      this.FakeSearchPanleRef.current.popup()
      console.log(this.FakeSearchPanleRef.current.state)
    }
    // 禁止文档滚动
    if (!document.body.className.match('js-temp_overflow_hidden')) {
      document.body.className += 'js-temp_overflow_hidden'
    }
  }

  public render() {
    return (
      <div className='react_searchbar_input_container' style={{minHeight: '100px'}}>
        <div className="slie_border input_box" onClick={this.popupHandle}>
          <input value={this.props.syncbetween === 1 ? this.state.value : ''} readOnly {...this.props}/>
        </div>
      </div>
    )
  }
}

export default withDefaultProps(defaultProps, SearchBar)
