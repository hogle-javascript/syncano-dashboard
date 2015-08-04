import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

import Store from './AuthStore';
import Actions from './AuthActions';

import MUI from 'material-ui';
import Container from '../../common/Container/AccountContainer.react';

export default React.createClass({

  displayName: 'AccountActivate',

  mixins: [
    Reflux.connect(Store),
    Router.State
  ],

  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount() {
    let params = this.getParams();

    Actions.activate({
      uid: params.uid,
      token: params.token
    });
  },

  render() {
    return (
      <Container ref="loginPage">
        <div className="account-container__content__header">
          <p className="vm-0-b">{this.state.status}</p>
        </div>
      </Container>
    )
  }
});
