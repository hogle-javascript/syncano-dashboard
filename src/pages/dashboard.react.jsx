import React from 'react';
import Router from 'react-router';

// Stores and Action
import SessionStore from '../apps/Session/SessionStore';
import AuthConstants from '../apps/Account/AuthConstants';

// Components
import Header from '../apps/Header/Header.react';
import MagneticPixel from '../common/MagneticPixel';

/* eslint-disable no-process-env */

let ENV = process.env.NODE_ENV || 'development';

/* eslint-enable */

export default React.createClass({

  displayName: 'Dashboard',

  contextTypes: {
    router: React.PropTypes.func
  },

  mixins: [
    Router.State,
    Router.Navigation
  ],

  statics: {
    willTransitionTo(transition) {
      if (!SessionStore.isAuthenticated()) {
        transition.redirect(AuthConstants.LOGIN_URL, {}, {next: transition.path});
      }
    }
  },

  renderMagneticConversionPixel() {
    if (SessionStore.getSignUpMode() && ENV === 'production') {
      SessionStore.removeSignUpMode();

      return (
        <MagneticPixel />
      )
    }
  },

  render() {
    return (
      <div>
        <Header />
        <Router.RouteHandler />
        {this.renderMagneticConversionPixel()}
      </div>
    );
  }

});
