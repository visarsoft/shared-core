// @flow

import * as React from 'react';
import type { Dispatch } from 'react-redux';
import { getFetcher, getCurrentRoute } from '../utils';

type Props = {
  location: {
    pathname: string,
  },
  dispatch: Dispatch,
  content: any
};

function withFetching(WrappedComponent: any, routes: any) {
  return class extends React.Component<Props, any> {
    componentDidMount() {
      this.fetchData();
    }
    fetchData() {
      if (!this.props.content && this.props.location) {
        const { pathname } = this.props.location;
        const route = getCurrentRoute(pathname, routes);
        if (route) {
          this.props.dispatch(getFetcher(route));
        }
      }
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default withFetching;
