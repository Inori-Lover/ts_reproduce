import * as React from 'react'

const initialState = { time: Date.now() }
type State = Readonly<typeof initialState>

export default class Page extends React.PureComponent {
  readonly state: State = initialState

  private changeTime = () => {
    this.setState({
      time: Date.now()
    })
  }

  public render () {
    return (
      <>
        <div>i am main. { Date.now() }</div>
        <button onClick={ this.changeTime }>修改时间 { Date.now() }</button>
      </>
    )
  }
}
