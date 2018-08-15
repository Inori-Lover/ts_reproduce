import React, { SFC } from 'react'
import { Route, match } from 'react-router';
import Loadable from 'react-loadable';

import Loading from '../components/Loading';

// 路由级别分割
const Car = Loadable({ loader: () => import( /* webpackChunkName: "page_shoppingcar" */ '../pages/shoppingcar'), loading: Loading })

type Props = { match: match<null> }

export const App: SFC<Props> = ({ match }) => {
  return (
    <Route path={`${match.path}`} component={ Car }/>
  )
}

export default App
