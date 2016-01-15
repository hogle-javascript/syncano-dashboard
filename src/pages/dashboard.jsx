import React from 'react';
import {State, Navigation, RouteHandler} from 'react-router';

import SessionStore from '../apps/Session/SessionStore';
import AuthConstants from '../apps/Account/AuthConstants';

import {ConversionPixel} from '../common';

export default React.createClass({
  displayName: 'Dashboard',

  contextTypes: {
    router: React.PropTypes.func
  },

  mixins: [
    State,
    Navigation
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
        <RouteHandler />
        {this.renderConversionPixels()}
      </div>
    );
  }
});
