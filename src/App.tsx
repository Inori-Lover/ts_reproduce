import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';

import Main from './routes/_main'
import Person from './routes/_person'
import ShoppingCar from './routes/_shoppingcar'
import Typelist from './routes/_typelist'
import Loading from "./components/Loading";

/**
 * @func default 程序整体初始化入口，目前技术栈而言就是路由入口了
 * @url https://segmentfault.com/a/1190000011765141
 */
export default () => (
  <>
    <Switch>

      {/* 有效组件 */}
      <Route path="/main" component={Main} />
      <Route path="/person" component={Person} />
      <Route path="/car" component={ShoppingCar} />
      <Route path="/typelist" component={Typelist} />

      {/* 测试性质的组件, 路径以 _ 开头 */}
      <Route path='/_loading' component={ Loading } />

      {/* 通过移动到测试段落前可以覆盖测试路径的匹配, 除此外 fallback 应该保持在最尾 */}
      <Route path='*' component={() => <Redirect to="/main" />} />
    </Switch>
  </>
)
