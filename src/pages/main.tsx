import * as React from 'react'

const initialState = { time: Date.now() }
type State = Readonly<typeof initialState>

export default class Page extends React.PureComponent {
  readonly state: State = initialState

  public render () {
    return (
      <>
        <div>i am main.</div>
      </>
    )
  }
}
