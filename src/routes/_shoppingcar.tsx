import * as React from 'react'
import { Route } from 'react-router';
import Loadable from 'react-loadable';

import Loading from '../components/Loading';

// 路由级别分割
const Car = Loadable({ loader: () => import( /* webpackChunkName: "page_shoppingcar" */ '../pages/shoppingcar'), loading: Loading })

class App extends React.Component {
  public render () {
    return (
      <Route key='pageCar' path='/car' component={ Car }/>
    )
  }
}

export default App
