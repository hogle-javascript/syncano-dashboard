import React from 'react';
import {withRouter} from 'react-router';
import _ from 'lodash';
import Helmet from 'react-helmet';

import SessionStore from '../apps/Session/SessionStore';
import {Styles} from 'syncano-material-ui';
import {SnackbarNotification} from './../apps';
import {SyncanoTheme} from '../common/';

const App = React.createClass({
  displayName: 'App',

  childContextTypes: {
    location: React.PropTypes.object,
    params: React.PropTypes.object,
    routes: React.PropTypes.array,
    muiTheme: React.PropTypes.object
  },

  getInitialState() {
    return {
      muiTheme: Styles.ThemeManager.getMuiTheme(SyncanoTheme)
    };
  },

  getChildContext() {
    return {
      location: this.props.location,
      params: this.props.params,
      routes: this.props.routes,
      muiTheme: this.state.muiTheme
    };
  },

  componentWillMount() {
    let palette = this.state.muiTheme.rawTheme.palette;
    let newMuiTheme = _.merge(this.state.muiTheme, SyncanoTheme.getComponentThemes(palette));

    this.handleRouterSetup();
    this.setState({muiTheme: newMuiTheme});
  },

  componentWillUpdate() {
    if (_.isUndefined(this.props.params.instanceName)) {
      SessionStore.removeInstance();
    }
  },

  componentDidUpdate() {
    this.handleRouterSetup();
  },

  handleRouterSetup() {
    SessionStore.setRouter(this.props.router);
    SessionStore.setLocation(this.props.location);
    SessionStore.setParams(this.props.params);
    SessionStore.setRoutes(this.props.routes);
  },

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', flex: 1, maxWidth: '100%'}}>
        <Helmet
          titleTemplate="%s - Syncano Dashboard"
          link={[{rel: 'icon', type: 'image/png', href: 'img/favicon-32x32.png', sizes: '32x32'}]} />
        {this.props.children}
        <SnackbarNotification />
      </div>
    );
  }
});

export default withRouter(App);
