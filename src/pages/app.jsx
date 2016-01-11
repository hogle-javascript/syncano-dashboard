import React from 'react';
import Router from 'react-router';
import _ from 'lodash';

import SessionActions from '../apps/Session/SessionActions';
import SessionStore from '../apps/Session/SessionStore';
import {Styles} from 'syncano-material-ui';
import {SnackbarNotification} from './../common';
import {SyncanoTheme} from 'syncano-components';

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

  getInitialState() {
    return {
      muiTheme: Styles.ThemeManager.getMuiTheme(SyncanoTheme)
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  },

  componentWillMount() {
    let palette = this.state.muiTheme.rawTheme.palette;
    let newMuiTheme = _.merge(this.state.muiTheme, SyncanoTheme.getComponentThemes(palette));

    SessionActions.setRouter(this.context.router);
    this.setState({muiTheme: newMuiTheme});
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
