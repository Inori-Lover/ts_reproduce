/**
 * 全文代码源自 https://zhuanlan.zhihu.com/p/37298514
 * 由蚂蚁金服翻译自 https://levelup.gitconnected.com/ultimate-react-component-patterns-with-typescript-2-8-82990c516935
 *
 * 附加说明：
 * 原文中代码可行但是相关 ts 语法关键词 在当时是处于rc状态，最终实现使用了不同关键词甚至并未实现
 *
 * 理解辅助
 * 整段代码核心有两点，第一是抽出必选属性，第二是重新定义属性检查
 * P类型 Props简写，Props中所有属性都已经标记为**必选**
 * DP类型 defaultProps简写，defaultProps中所有属性都已经标记为**可选**
 * ①中代码的作用是选区P与DP的补集并标记为必选
 * ②中代码的作用是将DP（均为可选）与①得到的补集做相交，可理解为 Object.assign(DP, RequiredProps)
 *
 * ②得到的类型就是我们最初想要指定的类型 —— 在defaultProps中指定的就是可选，其他均为必选
 */

import { ComponentType } from "react";
import { Omit } from './Omit'

export const withDefaultProps = <
  P extends object,
  DP extends Partial<P>
>(
  defaultProps: DP,
  Component: ComponentType<P>,
) => {
  // ① 提取出必须的属性
  type RequiredProps = Omit<P, keyof DP>;
  // ② 重新创建我们的属性定义，通过一个相交类型，将所有的原始属性标记成可选的，必选的属性标记成可选的
  type Props = Partial<DP> & Required<RequiredProps>;

  Component.defaultProps = defaultProps;

  // 返回重新的定义的属性类型组件，通过将原始组件的类型检查关闭，然后再设置正确的属性类型
  return (Component as ComponentType<any>) as ComponentType<Props>;
}
