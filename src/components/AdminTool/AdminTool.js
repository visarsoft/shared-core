/* eslint-disable react/jsx-no-bind */
// @flow
import React from 'react';
import Styled from './Styled';
import Sync from './Sync';
import Reset from './Reset';
import SignOut from './SignOut';

type Props = {
  onSync: Function,
  onReset: Function
};

class AdminTool extends React.PureComponent<Props> {
  static onLogout(e) {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/logout';
    }
  }
  onSync(e) {
    e.preventDefault();
    this.props.onSync();
  }
  onReset(e) {
    e.preventDefault();
    this.props.onReset();
  }
  render() {
    return (
      <Styled className='admin-tool'>
        {this.props.onSync ? <Sync onClick={this.onSync.bind(this)} /> : null}
        {this.props.onReset ? <Reset onClick={this.onReset.bind(this)} /> : null}
        <SignOut onClick={AdminTool.onLogout} />
      </Styled>
    );
  }
}

export default AdminTool;
