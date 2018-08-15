import React, { SFC } from 'react'
import { Route, match } from 'react-router'
import Loadable from 'react-loadable'

import Loading from '../components/Loading'

// 路由级别分割
const Typelist = Loadable({ loader: () => import( /* webpackChunkName: "page_typelist" */ '../pages/typelist'), loading: Loading })

type Props = { match: match<null> };

export const App: SFC<Props> = ({ match }) => {
  return (
    <div>
      <Route path= {`${match.path}`} component={ Typelist }/>
    </div>
  )
}

export default App
