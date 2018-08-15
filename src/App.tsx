import React, { Fragment } from 'react'
import { Route, Switch, Redirect } from 'react-router';

import Main from './routes/_main'
import Person from './routes/_person'
import ShoppingCar from './routes/_shoppingcar'
import Typelist from './routes/_typelist'
import Loading from "./components/Loading";

/**
 * @func default 程序整体初始化入口，目前技术栈而言就是路由入口了
 * @url https://segmentfault.com/a/1190000011765141#articleHeader17
 */
export default () => (
  <Fragment>
    <Switch>
      <Route path="/main" component={Main} />
      <Route path="/person" component={Person} />
      <Route path="/car" component={ShoppingCar} />
      <Route path="/typelist" component={Typelist} />
      <Route path='/loading' component={ Loading } />
      <Route component={() => <Redirect to="/main" />} />
    </Switch>
  </Fragment>
)
