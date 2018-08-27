import * as React from 'react'

import SearchBar from '../components/SearchBar/SearchBar'

const initialState = { time: Date.now() }
type State = Readonly<typeof initialState>

export default class Page extends React.PureComponent {
  readonly state: State = initialState

  public componentDidMount () {
    return null
  }

  private consoleLog = (evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`from main: ${evt.currentTarget.value}`)
  }

  public render () {
    return (
      <>
        <div>i am main.</div>
        <form action="https://www.baidu.com/s" method="get">
          <SearchBar name="wd" onChange={this.consoleLog} />
        </form>
      </>
    )
  }
}
