import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { withDefaultProps } from "../tools/defaultProps";
import './navbar.scss'

export type navbarItem = {
  icon?: string
  title: string
  url: string
}

const defaultProps = {
  navs: [{
    title: '测试商城',
    url: '/'
  }],
  hideonKeyboardPopup: true,
  active: ''
}
type DefaultProps = typeof defaultProps

export type Props = {
  children: ReactNode,
  navs?: navbarItem[] | void[],
  hideonKeyboardPopup?: boolean,
  active?: string
} & DefaultProps

type State = {
  initalHeight: number
  hide: boolean
}

const initalState: State = {
  initalHeight: window.innerHeight,
  hide: false,
}

class _Page extends React.PureComponent<Props, State> {

  readonly state: State = initalState

  public componentDidMount () {
    window.onresize = this.resizeHandle
    this.setState(function () {
      return {
        initalHeight: window.innerHeight
      }
    })
  }

  private resizeHandle = () => {
    const shouldHide = window.innerHeight < this.state.initalHeight * 0.9
    if (shouldHide) {
      this.setState(function () {
        return {
          hide: true
        }
      })
    } else {
      this.setState(function () {
        return {
          hide: false
        }
      })
    }
  }

  public render () {
    const { children, navs, active, hideonKeyboardPopup } = this.props

    return (
      <div className="layout--navbar_container">
        <div className="layout--navbar_content">{ children }</div>
        <div className={`layout--navbar placeholder ${this.state.hide && hideonKeyboardPopup ? 'hidden' : ''}`}>
        </div>
        <div className={`layout--navbar ${this.state.hide && hideonKeyboardPopup ? 'hidden' : ''}`}>
          {
            navs.map((item: any, index: number) => {
              const { icon, title, url } = item
              return (
                <Link key={index} className={`layout--navbar_item_container ${active === title ? 'active' : ''}`} to={url ? url : ''} replace >
                  <div className={`layout--navbar_item_icon`}>
                    {
                      icon && <img src={icon} alt=""/>
                    }
                  </div>
                  <div className={`layout--navbar_item`}>{title}</div>
                </Link>
              )
            })
          }
        </div>
      </div>
    )
  }
}
export const Page = withDefaultProps(defaultProps, _Page)
export default Page
