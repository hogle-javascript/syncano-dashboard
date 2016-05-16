import React from 'react';
import {State, Navigation, RouteHandler} from 'react-router';
import {Grid, Breakpoint} from 'react-responsive-grid';

import SessionStore from '../apps/Session/SessionStore';
import AuthConstants from '../apps/Account/AuthConstants';

import {Header, ConversionPixel, Sidebar, NoMobileInfo} from '../common/';

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
        </div>
      );
    }
  },

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
        <Grid style={{display: 'flex', flexDirection: 'column', flex: 1}}>
          <Breakpoint
            minWidth={768}
            widthMethod="componentWidth"
            style={{display: 'flex', flexDirection: 'column', flex: 1}}>
            <Header/>
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
