import React, { Fragment } from 'react'
import { Route } from 'react-router';

import Main from './routes/_main'
import Person from './routes/_person'
import ShoppingCar from './routes/_shoppingcar'
import Typelist from './routes/_typelist'
import Loading from "./components/Loading";

const routeList = [
  <Main key='route_main'/>,
  <Person key='route_person'/>,
  <ShoppingCar key='route_shoppingcar'/>,
  <Typelist key='route_typelist'/>,
  <Route key='route_loading' path='/loading' component={ Loading } />
]

/**
 * @func default 程序整体初始化入口，目前技术栈而言就是路由入口了
 * @url https://segmentfault.com/a/1190000011765141#articleHeader17
 */
export default () => (
  <Fragment>
    { routeList }
  </Fragment>
)
