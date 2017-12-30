// @flow

import React from 'react';
import { getFetcher, getCurrentRoute } from '../utils';

function withFetching(WrappedComponent: any, routes: any) {
  return class extends React.Component {
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
    props: any;
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default withFetching;
