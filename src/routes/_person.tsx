import * as React from 'react'
import { Route } from 'react-router';
import Loadable from 'react-loadable';

import Loading from '../components/Loading';

// 路由级别分割
const Person = Loadable({ loader: () => import( /* webpackChunkName: "page_person" */ '../pages/person'), loading: Loading })

class App extends React.Component {
  public render () {
    return (
      <Route path='/person' component={ Person }/>
    )
  }
}

export default App
