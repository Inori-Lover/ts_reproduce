import * as React from 'react'
import { Route } from 'react-router';
import Loadable from 'react-loadable';

import Loading from '../components/Loading';

// 路由级别分割
const Typelist = Loadable({ loader: () => import( /* webpackChunkName: "page_typelist" */ '../pages/typelist'), loading: Loading })

class App extends React.Component {
  public render () {
    return (
      <Route path='/typelist' component={ Typelist }/>
    )
  }
}

export default App
