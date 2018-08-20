// 弹窗组件
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom'

const initalState = {
  show: true,
  content: '',
  autoHide: 300
}

type InitalState = Readonly<typeof initalState>

/**
 * 可选State
 */
export type State = {
  show?: boolean,
  content?: string,
  autoHide?: number
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
