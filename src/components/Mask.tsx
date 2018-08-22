// 黑幕组件
import React, { PureComponent } from 'react'
import ReactDom from 'react-dom'

import { Omit } from '../tools/Omit'
import VAR from '../config/var'

import './Mask.scss'

/**
 * 全量State
 *
 * @desc
 * 按照最佳实践React的State应该在初始化时全部备齐，如数据不在初始化时获取则初始化为null
 * 保证类型完整
 */
type InitalState = {
  popup: boolean
  background: string
  zIndex: number
  onClose: () => void
  touchmove: null| number
}

/**
 * 不允许外部修改的 State 的 属性列表
 */
type ShadowState = 'touchmove'

/**
 * 对外导出的State
 */
export type State = Partial<Omit<InitalState, ShadowState>>

const initalState: InitalState = {
  popup: false,
  background: 'rgba(0, 0, 0, .8)',
  zIndex: VAR.zIndex.mask,
  onClose: function () {},
  touchmove: null,
}


/**
 * @class Toast
 * @desc 弹窗组件
 */
class Mask extends PureComponent<any, InitalState> {
  readonly state: InitalState = initalState

  public clickHandle = () => {
    this.setState({
      popup: false
    })
    this.state.onClose && this.state.onClose()
  }

  public touchMoveHandle = (evt: React.TouchEvent) => {
    const clientY = evt.touches[0].clientY
    if (this.state.touchmove !== null && Math.abs(clientY - this.state.touchmove) > 5) {
      evt.preventDefault()
    } else {
      this.setState(function () {
        return {
          touchmove: clientY
        }
      })
    }
  }

  public clearTouchMove = () => {
    this.setState(function () {
      return {
        touchmove: null
      }
    })
  }

  public render() {
    return (
      <div
        className={`react_mask ${this.state.popup ? 'active' : ''}`}
        style={{
          zIndex: this.state.zIndex,
          background: this.state.background,
        }}
        onClick={this.clickHandle}
        onTouchMove={this.touchMoveHandle}
        onTouchStart={this.clearTouchMove}
      >
      </div>
    )
  }
}

const container = document.createElement('div')
container.className = 'reat_mack_container'
document.body.appendChild(container)

const ref = ReactDom.render(<Mask />, container) as React.Component<any, State, any>

export default {
  /**
   * 重置指定项或全部属性
   */
  reset: function (key?: (keyof State)[]) {
    if (key) {
      for (let item of key) {
        ref.setState({
          [item]: initalState[item]
        })
      }
      return
    }
    ref.setState(initalState)
  },
  /**
   * 打开Mask层
   */
  open: function () {
    ref.setState({
      popup: true
    })
  },
  /**
   * 关闭Mask层
   */
  close: function () {
    ref.setState({
      popup: false
    })
  },
  /**
   * 关闭Mask层
   */
  onClose: function (func: () => void) {
    ref.setState({
      onClose: func
    })
  },
  /**
   * 检查Mask层开关状态
   */
  isOpen: function () {
    return ref.state.popup
  },
  /**
   * 修改Mask层背景色
   */
  changeColor: function (color: string) {
    ref.setState({
      background: color
    })
  },
  /**
   * 修改Mask层zIndex数值
   */
  changeZIndex: function (zIndex: number) {
    ref.setState({
      zIndex: zIndex
    })
  },
}
