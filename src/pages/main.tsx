import * as React from 'react'

// import Toast, { State as ToastState} from "../components/Toast";
import SearchBar from '../components/Search'

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
        <div style={{minHeight: '100vh'}}>i am main.</div>
        <SearchBar name="test" form="not_submit" onChange={this.consoleLog} syncbetween={1} />
      </>
    )
  }
}
