import React, { PureComponent } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import '../base.scss'
import './_FakeSearchPanle.scss'

/**
 * 搜索弹层Props类型定义
 */
type Props = {
  popup: boolean
  onClose?: () => void
  onPopup?: () => void
  closeOnBlur?: boolean
  value?: string
} & React.HTMLAttributes<HTMLInputElement> & RouteComponentProps<any>

/**
 * 搜索弹层State类型定义
 */
type State = {
  value: string
  popup: boolean
  _timer: number|null
  _scrollPosition: number|null
}

/**
 * @desc 搜索栏弹层
 */
export class _FakeSearchPanle extends PureComponent<Props, State> {
  readonly state: State = {
    value: this.props.value || '',
    popup: false,
    _timer: null,
    _scrollPosition: null
  }

  /**
   * 伪弹窗input 引用，主要用于处理focus相关操作
   */
  private inputElementRef: React.RefObject<HTMLInputElement> = React.createRef()

  static getDerivedStateFromProps (props: Props): Partial<State> {
    return {
      popup: props.popup
    }
  }

  public componentDidUpdate (prevProps: Props, prevState: State) {
    if (prevState.popup !== this.state.popup && this.state.popup) {
      this.popupHandle()
    } else if (prevState.popup !== this.state.popup && !this.state.popup) {
      this.closeHandle()
    }
  }

  /**
   * 执行关闭流程
   */
  public componentWillUnmount () {
    this.props.popup && this.closeHandle()
  }

  /**
   * 弹层弹出
   */
  private popupHandle = () => {
    this.recordPosition()
    this.keepPageFixedTop()
    this.focusHelper()
    this.setState(function () {
      return {
        popup: true
      }
    })
    this.props.onPopup && this.props.onPopup()
  }

  /**
   * 弹层收起
   */
  private closeHandle = () => {
    this.cancelPageFixedTop()
    this.resumePosition()
    this.setState(function () {
      return {
        popup: false
      }
    })
    this.props.onClose && this.props.onClose()
  }

  /**
   * input 值变动处理
   */
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
   * input 点击处理
   */
  private clickHandle = (evt: React.MouseEvent<HTMLInputElement>) => {
    this.focusHelper()
    this.props.onClick && this.props.onClick(evt)
  }

  /**
   * input 失焦处理
   */
  private blurHandle = (evt: React.FocusEvent<HTMLInputElement>) => {
    if (this.props.closeOnBlur !== false) {
      this.closeHandle()
    }
    this.props.onBlur && this.props.onBlur(evt)
  }

  /**
   * 强制focus
   *
   * 用于解决原因不明的focus障碍：需要点击两次才会focus
   */
  private focusHelper = (evt?: React.MouseEvent<HTMLInputElement>) => {
    evt && evt.stopPropagation()
    this.inputElementRef.current && this.inputElementRef.current.focus()
  }

  /**
   * 记录滚动位置
   */
  private recordPosition = () => {
    this.setState(function () {
      return {
        _scrollPosition: window.scrollY
      }
    })
  }

  /**
   * 恢复滚动位置
   */
  private resumePosition = () => {
    if (this.state._scrollPosition) {
      scrollTo(0, this.state._scrollPosition)
      this.setState(function () {
        return {
          _scrollPosition: null
        }
      })
    }
  }

  /**
   * 添加 滚动到顶部 循环
   * @desc
   * 持续一秒，抵消键盘弹出时屏幕的滚动
   */
  private keepPageFixedTop = () => {
    const _timer = window.setInterval(function () {
      scrollTo(0, 0)
    }, 100)
    this.setState(function () {
      return {
        _timer: _timer
      }
    })
    setTimeout(() => {
      this.cancelPageFixedTop()
    }, 1000)
  }

  /**
   * 取消 滚动到顶部 循环
   */
  private cancelPageFixedTop = () => {
    if (this.state._timer) {
      clearInterval(this.state._timer)
      this.setState(function () {
        return {
          _timer: null
        }
      })
    }
  }

  public render () {
    return (
      <div className={ `fake_search_panle ${ this.state.popup ? 'active' : 'hide' }` } onClick={ this.closeHandle }>
        <div className="slie_border input_box">
          <input type='search' value={ this.state.value } onChange={ this.changeHandle } onClick={ this.clickHandle } onBlur={ this.blurHandle } ref={ this.inputElementRef } />
        </div>
      </div>
    )
  }
}

export default withRouter(_FakeSearchPanle)
