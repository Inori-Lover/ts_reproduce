import * as React from 'react';
import * as Loadable from "react-loadable";

/**
 * @class Loading
 * @url https://joshblog.net/2018/react-loadable-and-typescript-error-property-render-is-missing-in-type-loader-promise/
 */
class Loading extends React.Component<Loadable.LoadingComponentProps> {
  public render() {
    return (
      <div className="loading">
        loading
      </div>
    );
  }
}

export default Loading;
