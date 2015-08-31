import React from 'react';
import Router from 'react-router';
import SessionActions from '../apps/Session/SessionActions';
import SessionStore from '../apps/Session/SessionStore';
import MUI from 'material-ui';
import {SyncanoTheme, SnackbarNotification} from './../common';

let ThemeManager = new MUI.Styles.ThemeManager();

export default React.createClass({

  displayName: 'App',

  contextTypes: {
    router: React.PropTypes.func
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  mixins: [
    Router.State
  ],

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  componentWillMount() {
    SessionActions.setRouter(this.context.router);
    SessionActions.setTheme(ThemeManager);
    ThemeManager.setTheme(SyncanoTheme);
  },

  componentWillUpdate() {
    if (typeof this.getParams().instanceName === 'undefined') {
      SessionStore.removeInstance();
    }
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
