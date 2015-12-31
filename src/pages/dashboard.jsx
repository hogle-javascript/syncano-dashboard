import React from 'react';
import Router from 'react-router';

// Stores and Action
import SessionStore from '../apps/Session/SessionStore';
import AuthConstants from '../apps/Account/AuthConstants';

// Components
import {ConversionPixel} from '../common';


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

  renderConversionPixels() {
    if (SessionStore.getSignUpMode() && ENV === 'production') {
      SessionStore.removeSignUpMode();

      return (
        <div>
          <ConversionPixel.Adroll />
          <ConversionPixel.Magnetic />
        </div>
      );
    }
  },

  render() {
    return (
      <div>
        <Router.RouteHandler />
        {this.renderConversionPixels()}
      </div>
    );
  }
});
