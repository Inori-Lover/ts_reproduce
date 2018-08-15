import React, { SFC } from 'react'
import { Route, match } from 'react-router'
import Loadable from 'react-loadable'

import Loading from '../components/Loading'

// 路由级别分割
const Main = Loadable({ loader: () => import( /* webpackChunkName: "page_main" */ '../pages/main'), loading: Loading })

type Props = { match: match<null> };

export const App: SFC<Props> = ({ match }) => {
  return (
    <Route path={`${match.path}`} component={ Main }/>
  )
}

export default App
