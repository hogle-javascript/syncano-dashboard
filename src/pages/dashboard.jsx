import React from 'react';
import {State, Navigation, RouteHandler} from 'react-router';
import {Grid, Breakpoint} from 'react-responsive-grid';

import SessionStore from '../apps/Session/SessionStore';
import AuthConstants from '../apps/Account/AuthConstants';

import {ConversionPixel, Sidebar, NoMobileInfo} from '../common';

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
        <Grid>
          <Breakpoint minWidth={768} widthMethod="componentWidth">
            <RouteHandler />
          </Breakpoint>
          <Breakpoint maxWidth={767} widthMethod="componentWidth">
            <div className="row">
              <Sidebar
                logoCentered="true"
                style={{width: '100%'}}>
                <NoMobileInfo/>
              </Sidebar>
            </div>
          </Breakpoint>
        </Grid>
        {this.renderConversionPixels()}
      </div>
    );
  }
});
