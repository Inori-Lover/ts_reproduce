/**
 * 搜索组件
 */

// 库
import React, { PureComponent } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

// 工具
import { Omit } from '../../tools/Omit'
import { withDefaultProps } from '../../tools/defaultProps'
import { isWebKit } from '../../tools/browser'

// 自定义组件
import { _FakeSearchPanle as FakeSearchPanle } from './FakeSearchPanle'

// 资源
import '../base.scss'
import './SearchBar.scss'

/**
 * 全量初始化State
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

/**
 * 默认Props
 */
const defaultProps: DefaultProps = {
  syncbetween: true,
  closeOnBlur: true
}

/**
 * 默认Props类型定义
 */
type DefaultProps = {
  syncbetween: boolean
  closeOnBlur: boolean
}

/**
 * 全量Props类型定义
 */
type Props = {
  syncbetween?: boolean
  closeOnBlur?: boolean
} & ( DefaultProps & React.InputHTMLAttributes<HTMLInputElement> & RouteComponentProps<any>)


/**
 * @class SearchBar
 * @desc 搜索栏
 */
export class SearchBar extends PureComponent<Props, InitalState> {
  readonly state: InitalState = {
    popup: false,
    displayValue: this.props.value ? this.props.value + '' : '🔍 搜索',
    value: this.props.value ? this.props.value + '' : '',
    transformTop: '0px',
    currentScrollPositon: null,
  }

  /**
   * 路由信息读取，当路由以 /search 结尾则进行弹出
   */
  public componentDidMount () {
    if (this.props.location.pathname.match(/\/search$/)) {
      this.props.history.replace({
        pathname: this.props.location.pathname.replace(/\/search$/, '')
      })
      this.popupHandle()
    }
    /**
     * @desc
     * webkit内核浏览器仅在document.onloaded之前pop事件不会被指派（监听）；如果在loading期间触发过至少一次的话 github.com/ReactTraining/history(react-router) 会有一个 'Initial POP'
     * @url https://stackoverflow.com/a/14150776
     */
    let initialPOP = false
    this.props.history.listen((location, action): void => {
      /**
       * 浏览器的前进后退按钮永远触发的都是pop
       */
      if (action === 'POP') {
        if (initialPOP) {
          initialPOP = false
          return
        }
        if (location.state && location.state.search === true) {
          this.popupHandle(true)
        } else {
          this.closeHandle(true)
        }
      } else if (action === 'PUSH' && location.state.search === true && isWebKit && document.readyState !== "complete") {
        // 前进操作且处于 未 加载完毕状态
        initialPOP = true
      } else if (action === 'PUSH' && location.state.search === true && isWebKit && document.readyState === "complete") {
        // 前进操作且处于 已 加载完毕状态
        initialPOP = false
      }
    })
  }

  /**
   * input值变动处理
   */
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

  /**
   * 弹层弹出控制函数
   *
   * @param {boolean|React.MouseEvent} HasPush 是否已经触发过Pop
   */
  private popupHandle = (HasPush ?: boolean|React.MouseEvent) => {
    /**
     * 弹出弹层
     */
    this.setState({
      popup: true,
    })
    /**
     * 添加文档滚动限制
     */
    if (!document.body.className.match('js-temp_overflow_hidden')) {
      document.body.className += 'js-temp_overflow_hidden'
    }
    /**
     * 实现url与弹层状态对应关系
     */
    HasPush !== true && this.props.history.push({
      pathname: `${this.props.match.path}/search`,
      state: {
        search: true
      }
    })
  }

  /**
   * 弹层关闭控制函数
   *
   * @param {boolean|React.MouseEvent} HasPop 是否已经触发过Pop
   */
  private closeHandle = (HasPop?: boolean|React.MouseEvent) => {
    /**
     * 关闭弹层
     */
    this.setState(function () {
      return {
        popup: false,
      }
    })
    /**
     * 取消文档滚动限制
     */
    if (document.body.className.match('js-temp_overflow_hidden')) {
      document.body.className = document.body.className.replace(/\s?js-temp_overflow_hidden/g, '')
    }
    /**
     * 实现url与弹层状态对应关系
     */
    HasPop !== true && this.props.history.go(-1)

  }

  public render() {
    /**
     * 分离非string类型的props防止其传递到DOM元素上造成歧义
     */
    const { syncbetween, staticContext, ...nextProps } = this.props

    return (
      <div className='react_searchbar_input_container'>
        <div className="react_searchbar_input input_box" onClickCapture={ this.popupHandle }>
          <div className="slie_border main_content">
            <input type="search" value={this.state.displayValue} readOnly />
          </div>
        </div>
        <FakeSearchPanle {...nextProps} onChange={ this.changeHandle } onClose={ this.closeHandle } popup={ this.state.popup } value={ this.state.value } />
      </div>
    )
  }
}

export default withDefaultProps(defaultProps, withRouter(SearchBar))
