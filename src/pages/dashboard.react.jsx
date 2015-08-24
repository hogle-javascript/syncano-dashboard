import React from 'react';
import Router from 'react-router';

// Stores and Action
import SessionStore from '../apps/Session/SessionStore';
import AuthConstants from '../apps/Account/AuthConstants';

// Components
import Header from '../apps/Header/Header.react';

export default React.createClass({

  displayName: 'Dashboard',

  mixins: [
    Router.State,
    Router.Navigation
  ],

  contextTypes: {
    router: React.PropTypes.func
  },

  statics: {
    willTransitionTo(transition) {
      if (!SessionStore.isAuthenticated()) {
        transition.redirect(AuthConstants.LOGIN_URL, {}, {next: transition.path});
      }
    }
  },

  render() {
    return (
      <div>
        <Header />
        <Router.RouteHandler />
      </div>
    );
  }

});
