import { LoadableComponent } from 'react-loadable'

/**
 * 利用preload特性实现Loadable组件并行加载
 * @desc 默认的Loadable组件采用串行加载的方式，虽然官方提供了 Loadable.map 实现并行加载，
 *       但该实现方式绑定render函数，导致并行加载的组件必须要在render里书写渲染结构降低了灵活性
 *       本函数通过历遍传入object的每一个Loadable组件，执行每一个组件的preload方法，通过preload方法间不互斥的方法实现组件并行急加载
 * @example
 *
 * import { preloadAll } from "./preLoadAll"
 * const Loadadle = {
 *   Main: Loadable({ loader: () => import( '../ComponentA'), loading: () => (<div>loading</div>) }),
 *   NavbarLayout: Loadable({ loader: () => import( '../ComponentB'), loading: () => (<div>loading</div>) }),
 * }
 * preloadAll(Loadadle)
 *
 * @param {Record<string, LoadableComponent>} LoadableList Loadable包装后的组件
 * @returns {Promise<void[]>} Promise
 */
export function preloadAll (LoadableList: Record<string, LoadableComponent>): Promise<void[]> {
  const preloadAll = []
  for (const item of Object.keys(LoadableList)) {
    preloadAll.push(LoadableList[item].preload())
  }
  return Promise.all(preloadAll)
}

export default preloadAll
