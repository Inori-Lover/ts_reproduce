/**
 * 网格组件
 */

// 库
import React, { SFC } from 'react'

// 工具

// 资源
import '../base.scss'
import './Grid.scss'

/**
 * 全量Props类型定义
 */
type Props = {
  peerLine: number
  children: JSX.Element[]
}


/**
 * @class SearchBar
 * @desc 搜索栏
 */
export const Grid: SFC<Props> = function ({ peerLine, children }) {
  return (
    <div className={`inori-grid_container`} style={{color: `#${peerLine}`}}>{
      children.map((item, index) => {
        return (
          <div key={ index } className="inori-grid_item" style={{flexBasis: `${100 / peerLine}%`}}>{item}</div>
      )})
    }</div>
  )
}

export default Grid
