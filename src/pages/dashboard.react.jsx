import React from 'react';
import Router from 'react-router';

// Stores and Action
import SessionStore from '../apps/Session/SessionStore';
import AuthConstants from '../apps/Account/AuthConstants';

// Components
import Header from '../apps/Header/Header.react';

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
    if (SessionStore.getSignUpMode()) {
      SessionStore.removeSignUpMode();

      return (
        <div
          dangerouslySetInnerHTML={{__html: `
            <script type="text/javascript" src="//magnetic.t.domdex.com/23447/pix.js?t=c&for=syncano"></script>
            <noscript>
            <img src="//magnetic.t.domdex.com/23447/pix.gif?t=c&for=syncano" width="1" height="1" style="display:none;">
            </noscript>`}}>
        </div>
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
