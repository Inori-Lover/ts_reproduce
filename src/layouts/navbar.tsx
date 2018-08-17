import React, { SFC, ReactNode } from 'react'
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
  active: string
} & DefaultProps

const _Page: SFC<Props> = (props) => {
  const { children, navs, active } = props
  return (
    <div className="layout--navbar_container">
      <div className="layout--navbar_content">{ children }</div>
      <div className="layout--navbar placeholder">
      </div>
      <div className="layout--navbar">
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
export const Page = withDefaultProps(defaultProps, _Page)
export default Page
