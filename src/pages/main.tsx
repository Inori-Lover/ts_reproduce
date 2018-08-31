import * as React from 'react'

import SearchBar from '../components/SearchBar/SearchBar'
import Swiper, { swiperItemProps as SwiperProps } from '../components/Swiper'
import { Grid } from "../components/Grid/Grid";

const initialState = { time: Date.now() }

const tabs: SwiperProps[] = [
  {
    type: 'img',
    src: 'http://eskipaper.com/images/guilty-crown-7.jpg'
  },
  {
    type: 'img',
    src: 'http://eskipaper.com/images/guilty-crown-7.jpg'
  },
  {
    type: 'img',
    src: 'http://eskipaper.com/images/guilty-crown-7.jpg'
  },
]

type State = Readonly<typeof initialState>

export default class Page extends React.PureComponent {
  readonly state: State = initialState

  public componentDidMount () {
    return null
  }

  public render () {
    return (
      <>
        <Swiper swiperList={tabs}></Swiper>
        <form action="https://www.baidu.com/s" method="get">
          <SearchBar name="wd" />
        </form>
        <Grid peerLine={ 5 }>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <Grid peerLine={ 2 }>
            <div>test1</div>
            <div>test1</div>
            <div>test1</div>
          </Grid>
        </Grid>
      </>
    )
  }
}
