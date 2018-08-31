/**
 * 懒加载组件
 */

// 库
import React from 'react'

// 工具

// 资源
import '../base.scss'
import './AsyncImage.scss'

/**
 * 全量Props类型定义
 */
type Props = {
  src: string
  alt?: string
  placeholder?: string
  type?: 'cover' | 'contain' | 'normal'
  style?: React.CSSProperties
}


/**
 * @class SearchBar
 * @desc 搜索栏
 */
export class LazyImage extends React.PureComponent<Props> {
  readonly state = {
    src: this.props.placeholder || 'https://acs-web.com/blog/wp-content/uploads/2014/09/Loading-circles-acs-rectangles.gif',
  }

  public componentDidMount () {
    console.log(window.document.readyState)
    if (window.document.readyState === 'complete') {
      this.setState(function (prevState, PrevProps) {
        return {
          src: PrevProps.src
        }
      })
    } else {
      window.addEventListener('load', () => {
        this.setState(function (prevState, PrevProps) {
          return {
            src: PrevProps.src
          }
        })
      })
    }
  }

  public render () {
    const { type } = this.props

    let { style } = this.props
    style = Object.assign({}, { backgroundImage: `url("${this.state.src}")` }, style)

    if (type === 'contain') {
      return (
        <div className={`inori-lazy_image_container contain`} style={ style }>
          <img src={`${this.state.src}`} alt={this.props.alt} />
        </div>
      )
    } else if (type === 'cover') {
      return (
        <div className={`inori-lazy_image_container cover`} style={ style }>
          <img src={`${this.state.src}`} alt={this.props.alt} />
        </div>
      )
    } else {
      return (
        <img className={`inori-lazy_image normal`} src={`${this.state.src}`} alt={this.props.alt} style={ style } />
      )
    }
  }
}

export default LazyImage
