import * as React from 'react'
import Grid from 'antd-mobile/lib/grid'
import Carousel from 'antd-mobile/lib/carousel'
import Flex from 'antd-mobile/lib/flex'

import SearchBar from '../components/SearchBar/SearchBar'
// import Swiper, { swiperItemProps as SwiperProps } from '../components/Swiper'

import 'antd-mobile/lib/grid/style/css'
import 'antd-mobile/lib/carousel/style/css'
import 'antd-mobile/lib/flex/style/css'
import './main.scss'

const initialState = { time: Date.now() }

const gridData = Array.from(new Array(7)).map((_val, i) => ({
  icon: 'https://gw.alicdn.com/tps/TB1d30fPVXXXXbGXXXXXXXXXXXX-183-144.png_.webp',
  text: ['天猫', '聚划算', '天猫国际', '外卖', '天猫超时', '充值中心', '肥猪旅行', '领金币', '拍卖'][i],
}))


type State = Readonly<typeof initialState>

/**
 * 幻灯片
 */
class Swiper extends React.PureComponent {

  readonly state = {
    height: '0px'
  }

  private swiperItem: string[] = [
    'https://img.alicdn.com/imgextra/i4/57/TB2MztfuHArBKNjSZFLXXc_dVXa_!!57-0-luban.jpg',
    'http://eskipaper.com/images/guilty-crown-7.jpg',
    'https://gw.alicdn.com/imgextra/i3/65/TB2o3wnvXooBKNjSZFPXXXa2XXa_!!65-0-lubanu.jpg'
  ]

  public render () {
    return (
        <Carousel
          autoplay
          infinite
        >
          {this.swiperItem.map(val => (
            <a
              key={val}
              href="http://www.alipay.com"
            >
              <img
                src={`${val}`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top', height: `${this.state.height}` }}
                onLoad={() => {
                  window.dispatchEvent(new Event('resize'))
                  this.setState(function () {
                    return {
                      height: 'auto'
                    }
                  })
                }}
              />
            </a>
          ))}
        </Carousel>
    )
  }
}

/**
 * 滚动条目
 *
 * @desc 滚动区域划分为n等分
 */
class Marquee extends React.PureComponent {
  private marqueeData = [
    {
      tag: ['最新', '火热'],
      text: ['趁主人不再这只猫娘居然在偷偷干这档事情', '趁主人不再这只猫娘居然在偷偷干这档事情'],
      image: 'https://ossgw.alicdn.com/tbheadline/g0/24hHn3c/m/989cef22e66e48c79c877afdaa35351d.jpeg',
    },
    {
      tag: ['最新', '火热'],
      text: ['趁主人不再这只猫娘居然在偷偷干这档事情', '趁主人不再这只猫娘居然在偷偷干这档事情'],
      image: 'https://ossgw.alicdn.com/tbheadline/g0/24hHn3c/m/989cef22e66e48c79c877afdaa35351d.jpeg',
    },
    {
      tag: ['火热'],
      text: ['趁主人不再这只猫娘居然在偷偷干这档事情'],
      image: 'https://ossgw.alicdn.com/tbheadline/g0/24hHn3c/m/989cef22e66e48c79c877afdaa35351d.jpeg',
    },
  ]

  public render () {
    return (
      <Carousel vertical
        infinite
        autoplay
        dots={false}
      >
          {
            this.marqueeData.map(item => {
              return (
                <div className="Marquee_items">
                  <div className="shop_name">
                    好运快讯
                  </div>
                  <div className="vertical_flex_box">
                    {
                      item.tag.map((_item, _index) => {
                        return(
                          <div className="Marquee_item">
                            { item.tag[_index] && <div className="tag">{item.tag[_index].substr(0, 2)}</div> }
                            <div className="content">{item.text[_index]}</div>
                          </div>
                        )
                      })
                    }
                  </div>
                  <div className="image">
                    <img src={item.image} alt=""/>
                    {/* 半透明渐变png */}
                    <img className="image_fixed" src={'https://gw.alicdn.com/mt/TB1tzxrrTtYBeNjy1XdXXXXyVXa-390-255.png'} alt=""/>
                  </div>
                </div>
              )
            })
          }
        </Carousel>
    )
  }
}

export default class Page extends React.PureComponent {
  readonly state: State = initialState

  public componentDidMount () {
    window.dispatchEvent(new Event('resize'));
  }

  public render () {
    return (
      <>
        <Swiper />
        <form action="https://www.baidu.com/s" method="get">
          <SearchBar name="wd" />
        </form>
        <Grid className={`am-grid-round`} hasLine={false} data={gridData} activeStyle={false} columnNum={5} square={false}/>
        {/* 滚动显示 */}
        <Marquee />
        {/* 特殊栏目 */}
        <Flex justify='center'>
          <Flex.Item>test</Flex.Item>
          <Flex.Item>test</Flex.Item>
        </Flex>
      </>
    )
  }
}
