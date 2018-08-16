import React, { SFC } from 'react'
import { Route, match } from 'react-router'
import Loadable from 'react-loadable'

import Loading from '../components/Loading'
import { preloadAll } from "../tools/preLoadAll"

// 路由级别分割
const Person = Loadable({ loader: () => import( /* webpackChunkName: "page_person" */ '../pages/person'), loading: Loading })
const NavbarLayout = Loadable({ loader: () => import( /* webpackChunkName: "layout_navbar" */ '../layouts/navbar'), loading: Loading })

type Props = { match: match<null> }

export const App:SFC<Props> = ({ match }) => {
  preloadAll({ Person, NavbarLayout })
  return (
    <NavbarLayout>
      <Route path={`${match.path}`} component={ Person }/>
    </NavbarLayout>
  )
}

export default App
