import React, { PureComponent } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import '../base.scss'
import './_FakeSearchPanle.scss'

/**
 * 搜索弹层Props类型定义
 */
type FakeSearchPanleProps = {
  hide: boolean
  onClose?: (() => void)
  value?: string
} & React.HTMLAttributes<HTMLInputElement> & RouteComponentProps<any>

/**
 * 搜索弹层State类型定义
 */
type FakeSearchPanleState = {
  value: string
  hide: boolean
  _timer: number|null
  _scrollPosition: number|null
}

/**
 * 搜索弹层组件
 */
export class _FakeSearchPanle extends PureComponent<FakeSearchPanleProps, FakeSearchPanleState> {
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

export default withRouter(_FakeSearchPanle)
