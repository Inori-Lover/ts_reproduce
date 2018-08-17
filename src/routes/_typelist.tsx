import React, { SFC } from 'react'
import { Route, match } from 'react-router'
import Loadable from 'react-loadable'

import { config } from "../config/index_navbar"
import Loading from '../components/Loading'
import { preloadAll } from "../tools/preLoadAll"

// 路由级别分割
const Typelist = Loadable({ loader: () => import( /* webpackChunkName: "page_typelist" */ '../pages/typelist'), loading: Loading })
const NavbarLayout = Loadable({ loader: () => import( /* webpackChunkName: "layout_navbar" */ '../layouts/navbar'), loading: Loading })

type Props = { match: match<null> };

export const App: SFC<Props> = ({ match }) => {

  preloadAll({ Typelist, NavbarLayout })

  return (
    <NavbarLayout {...config} active="分类列表">
      <Route path={`${match.path}`} component={ Typelist }/>
    </NavbarLayout>
  )
}

export default App
