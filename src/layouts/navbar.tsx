import React, { PureComponent } from 'react'

const initialState = {  }

type State = Readonly<typeof initialState>
// type Props = Partial<{
//   children:
// }

export default class Page extends PureComponent {

  readonly state: State = initialState

  public render () {
    return (
      <div>
        { this.props.children }
        <div>i am navbar.</div>
      </div>
    )
  }
}
