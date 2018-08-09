import * as React from 'react';
import * as Loadable from "react-loadable";

import './Loading.scss'

/**
 * @class Loading
 * @url https://joshblog.net/2018/react-loadable-and-typescript-error-property-render-is-missing-in-type-loader-promise/
 */
class Loading extends React.Component<Loadable.LoadingComponentProps> {
  public render() {
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
    );
  }
}

export default Loading;
