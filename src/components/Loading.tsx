import * as React from 'react';
import * as Loadable from "react-loadable";

import './Loading.scss'

/**
 * @class Loading
 * @url https://joshblog.net/2018/react-loadable-and-typescript-error-property-render-is-missing-in-type-loader-promise/
 */
export class Loading extends React.Component<Loadable.LoadingComponentProps> {
  public render() {
    // delay 默认为 300ms
    if (this.props.pastDelay) {
      return (
        <div className="components_loading">
          <div className="loader">
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__ball"></div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default Loading;
