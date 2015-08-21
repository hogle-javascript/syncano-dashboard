import React from 'react';
import Router from 'react-router';
import SessionActions from '../apps/Session/SessionActions';
import SessionStore from '../apps/Session/SessionStore';
import MUI from 'material-ui';
import {SyncanoTheme, SnackbarNotification}  from './../common';

let ThemeManager = new MUI.Styles.ThemeManager();

export default React.createClass({

  displayName: 'App',

  mixins: [
    Router.State
  ],

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  componentWillUpdate() {
    if (typeof this.getParams().instanceName === 'undefined') {
      SessionStore.removeInstance();
    }
  },

  componentWillMount() {
    SessionActions.setRouter(this.context.router);
    SessionActions.setTheme(ThemeManager);
    ThemeManager.setTheme(SyncanoTheme);
  },

  render() {
    return (
      <div>
        <Router.RouteHandler/>
        <SnackbarNotification />
      </div>
    );
  }
});
