import * as React from 'react'
import Toast, { State as ToastState} from "../components/Toast";

const initialState = { time: Date.now() }
type State = Readonly<typeof initialState>

export default class Page extends React.PureComponent {
  readonly state: State = initialState

  public componentDidMount () {
    const _Toast = Toast as React.Component
    _Toast.setState((prevState, props): ToastState => {
      console.log(prevState, props)
      return {
        content: 'test',
      }
    })
    return null
  }

  public render () {
    return (
      <>
        <div>i am main.</div>
      </>
    )
  }
}
