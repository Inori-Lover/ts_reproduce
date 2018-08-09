import * as React from 'react'
import { Route } from 'react-router';
import Loadable from 'react-loadable';

import Loading from '../components/Loading';

// 路由级别分割
const Main = Loadable({ loader: () => import( /* webpackChunkName: "page_main" */ '../pages/main'), loading: Loading })

class App extends React.Component {
  public render () {
    return (
      <Route key='pageMain' path='/main' component={ Main }/>
    )
  }
}

export default App
