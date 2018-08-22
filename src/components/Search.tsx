// 搜索组件
// 以后还是用react-
import React, { PureComponent, FormEvent } from 'react'

import { Omit } from '../tools/Omit'
import VAR from '../config/var'
import Mask from './Mask'
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
}

/**
 * 不允许外部修改的 State 的 属性列表
 */
type ShadowState = ''

/**
 * 对外导出的State
 */
export type State = Partial<Omit<InitalState, ShadowState>>

const initalState: InitalState = {
  popup: false,
  value: 'init',
  transformTop: '0px',
}

const FakeInput = React.forwardRef((props: any, ref: any) => {
  return (
    <input ref={ref} {...props} />
  )
})

/**
 * @class Toast
 * @desc 弹窗组件
 */
class SearchBar extends PureComponent<any, InitalState> {
  readonly state: InitalState = initalState
  private fakeInput: React.RefObject<HTMLInputElement> = React.createRef()
  private handleChange = (evt: FormEvent<HTMLInputElement>) => {
    this.setState({
      value: evt.currentTarget.value
    })
  }
  public componentDidMount () {
    if (this.fakeInput.current) {
      const { width, height, top, right, bottom, left } = this.fakeInput.current.getBoundingClientRect()
      this.setState({
        value: '' + JSON.stringify([width, height, top, right, bottom, left])
      })
    }
  }

  public popupHandle = () => {
    if (this.fakeInput.current) {
      const { width, height, top, right, bottom, left } = this.fakeInput.current.getBoundingClientRect()
      if (top) {
        this.setState({
          popup: true,
          transformTop: `${top}px`,
          value: '' + JSON.stringify([width, height, top, right, bottom, left]),
        })
        Mask.open()
        Mask.onClose(this.closeHandle)
        this.fakeInput.current.scrollIntoView()
      }
    }
    return false
  }

  public focusHandle = () => {
    if ( this.fakeInput.current ) {
      this.fakeInput.current.focus()
    }
  }

  public closeHandle = () => {
    this.setState({
      popup: false,
      transformTop: '0px'
    })
  }

  public render() {
    return (
      <div className='react_searchbar_input_container' style={{minHeight: '100px'}}>
        <div className="slie_border input_box">
          <input value={this.state.value} readOnly {...this.props}/>
        </div>
        <div className={`slie_border input_box fake_input ${this.state.popup ? 'active' : ''}`} onClick={this.popupHandle} style={{transform: `translateY(-${this.state.transformTop})`, zIndex: VAR.zIndex.abovemask}}>
          <FakeInput ref={this.fakeInput} value={this.state.value} onChange={this.handleChange} />
        </div>
      </div>
    )
  }
}

export default SearchBar;
