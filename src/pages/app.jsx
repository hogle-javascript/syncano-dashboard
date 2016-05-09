import React from 'react';
import {State, RouteHandler} from 'react-router';
import _ from 'lodash';
import Helmet from 'react-helmet';

import SessionActions from '../apps/Session/SessionActions';
import SessionStore from '../apps/Session/SessionStore';
import {Styles} from 'syncano-material-ui';
import {SnackbarNotification} from './../apps';
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
    State
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
      <div style={{display: 'flex', flexDirection: 'column', flex: 1, maxWidth: '100%'}}>
        <Helmet
          titleTemplate="%s - Syncano Dashboard"
          link={[{rel: 'icon', type: 'image/png', href: 'img/favicon-32x32.png', sizes: '32x32'}]} />
        <RouteHandler/>
        <SnackbarNotification />
      </div>
    );
  }
});
