import React from 'react';
import Router from 'react-router-old';
import _ from 'lodash';

import SessionActions from '../apps/Session/SessionActions';
import SessionStore from '../apps/Session/SessionStore';
import {Styles} from 'material-ui';
import {SyncanoTheme, SnackbarNotification} from './../common';

export default React.createClass({

  displayName: 'App',

  contextTypes: {
    router: React.PropTypes.func,
    location: React.PropTypes.object
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  mixins: [
    Router.State
  ],

  getChildContext() {
    return {
      muiTheme: Styles.ThemeManager.getMuiTheme(SyncanoTheme)
    };
  },

  componentWillMount() {
    SessionActions.setRouter(this.context.router);
    // SessionActions.setTheme(ThemeManager);
    console.error(this);
  },

  componentWillUpdate() {
    if (_.isUndefined(this.getParams().instanceName)) {
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
