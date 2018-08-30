import React from 'react'
import Tabs from 'antd-mobile/lib/tabs'

import TabsProps from 'antd-mobile/lib/tabs/PropsType'

import 'antd-mobile/lib/tabs/style/css'
import './Swiper.scss'

export type swiperItemProps = {
  type?: 'img'
  src: string
}

type Props = {
  swiperList: swiperItemProps[]
}

type State = {
  index: number
  _timer: null|number
}

export class Swiper extends React.PureComponent<Partial<TabsProps> & Props> {
  readonly state: State = {
    index: 0,
    _timer: null
  }

  public componentDidMount () {
    const _timer = setInterval(() => {
      this.setState(function (prevState: State, prevProps: Props): Partial<State> {
        return {
          index: prevState.index + 1 === prevProps.swiperList.length ? 0 : prevState.index + 1
        }
      })
    }, 2000)
    this.setState(function () {
      return {
        _timer: _timer
      }
    })
  }

  public componentWillUnmount () {
    this.state._timer && clearInterval(this.state._timer)
    this.setState(function () {
      return {
        _timer: null
      }
    })
  }

  public render () {
    let tabs = this.props.swiperList.map((item, index) => {
      return {
        title: index + ''
      }
    })
    return (
      <Tabs { ...this.props }
        tabs = { tabs }
        page = {this.state.index}
        tabBarPosition={`bottom`}
        renderTabBar={(props) => {
          return (
            <div className={`swiper_pagination_container`}>
              { props.tabs.map((item, index) => <div key={index} className={`tab-pagination ${props.activeTab === index ? 'active' : 'inactive'}`}></div>) }
            </div>
          )
        }}
      >
        { this.props.swiperList.map((item, index) => {
          if (!item.type || (item.type && item.type === 'img')) {
            return (
              <div key={ index } className={`swiper_item`} style={{ backgroundImage: `url("${item.src}")` }}>
                <img src={`${item.src}`} alt=""/>
              </div>
            )
          } else {
            return false
          }
        }) }
      </Tabs>
    )
  }
}
export default Swiper
