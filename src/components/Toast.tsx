// 弹窗组件
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom'
import { Omit } from "../tools/Omit";

/**
 * 全量State
 *
 * @desc
 * 按照最佳实践React的State应该在初始化时全部备齐，如数据不在初始化时获取则初始化为null
 * 保证类型完整
 */
type InitalState = {
  show: boolean
  content: string
  autoHide: number
  time: null|number
}

/**
 * 不允许外部修改的 State 的 属性列表
 */
type ShadowState = "time"

/**
 * 对外导出的State
 */
export type State = Partial<Omit<InitalState, ShadowState>>

const initalState: InitalState = {
  show: true,
  content: '',
  autoHide: 300,
  time: null
}

/**
 * @class Toast
 * @desc 弹窗组件
 */
class Toast extends PureComponent {
  readonly state:InitalState = initalState

  public render() {
    return (
      <div>
        { this.state.content.trim() }
        { this.state.autoHide }
      </div>
    )
  }
}

const container = document.createElement('div')
container.className = 'react_toast_container'
document.body.appendChild(container)
const ToastRef = ReactDOM.render(<Toast />, container)

export default ToastRef;
