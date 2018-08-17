import { Props, navbarItem } from "../layouts/navbar";

export const navs: navbarItem[] = [
  {
    icon: 'https://assets-cdn.github.com/favicon.ico',
    title: '首页',
    url: '/main',
  },
  {
    icon: 'https://assets-cdn.github.com/favicon.ico',
    title: '分类列表',
    url: '/typelist',
  },
  {
    icon: 'https://assets-cdn.github.com/favicon.ico',
    title: '购物车',
    url: '/car',
  },
  {
    icon: 'https://assets-cdn.github.com/favicon.ico',
    title: '个人中心',
    url: '/person',
  },
]

export const hideonKeyboardPopup = true

export const config:Partial<Props> = {
  navs,
  hideonKeyboardPopup,
}
export default config
