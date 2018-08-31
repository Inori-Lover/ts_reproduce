import * as React from 'react'
import Grid from 'antd-mobile/lib/grid'
import Carousel from 'antd-mobile/lib/carousel'

import SearchBar from '../components/SearchBar/SearchBar'
// import Swiper, { swiperItemProps as SwiperProps } from '../components/Swiper'

import 'antd-mobile/lib/grid/style/css'
import 'antd-mobile/lib/carousel/style/css'

const initialState = { time: Date.now() }

const tabs: string[] = [
  'https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png',
  'http://eskipaper.com/images/guilty-crown-7.jpg',
  'https://zos.alipayobjects.com/rmsportal/IJOtIlfsYdTyaDTRVrLI.png'
]

const gridData = Array.from(new Array(7)).map((_val, i) => ({
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
  text: `name${i}`,
}))

type State = Readonly<typeof initialState>

export default class Page extends React.PureComponent {
  readonly state: State = initialState

  public componentDidMount () {
    return null
  }

  public render () {
    return (
      <>
        {/* <Swiper swiperList={tabs}></Swiper> */}
        <Carousel
          autoplay={true}
          infinite
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
        >
          {tabs.map(val => (
            <a
              key={val}
              href="http://www.alipay.com"
            >
              <img
                src={`${val}`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
        <form action="https://www.baidu.com/s" method="get">
          <SearchBar name="wd" />
        </form>
        <Grid hasLine={false} data={gridData} activeStyle={false} columnNum={ 4 } />
      </>
    )
  }
}
