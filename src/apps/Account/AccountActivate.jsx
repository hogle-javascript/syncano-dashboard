import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

import Store from './AuthStore';
import Actions from './AuthActions';

import AccountContainer from './AccountContainer';

export default React.createClass({
  displayName: 'AccountActivate',

  contextTypes: {
    router: React.PropTypes.func
  },

  mixins: [
    Reflux.connect(Store),
    Router.State
  ],

  componentDidMount() {
    let params = this.getParams();

    Actions.activate({
      uid: params.uid,
      token: params.token
    });
  },

  render() {
    return (
      <AccountContainer ref="loginPage">
        <div className="account-container__content__header">
          <p className="vm-0-b">{this.state.status}</p>
        </div>
      </AccountContainer>
    );
  }
});
