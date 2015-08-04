import React                                 from 'react';
import Router                                from 'react-router';
import SessionActions                        from '../apps/Session/SessionActions';
import SessionStore                          from '../apps/Session/SessionStore';
import mui                                   from 'material-ui';
import {SyncanoTheme, SnackbarNotification}  from './../common';

let ThemeManager = new mui.Styles.ThemeManager();

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

  getChildContext(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  componentWillUpdate(nextProps, nextState) {
    if (this.getParams().instanceName === undefined) {
      SessionStore.removeInstance();
    }
  },

  componentWillMount() {
    // TODO: MUI should deal with that, but for some reason it's not using contentFontFamily
    ThemeManager.contentFontFamily = SyncanoTheme.contentFontFamily;
    SessionActions.setRouter(this.context.router);
    SessionActions.setTheme(ThemeManager);
    ThemeManager.setTheme(SyncanoTheme);
  },

  render(){
    return (
      <div>
        <Router.RouteHandler/>
        <SnackbarNotification />
      </div>
    );
  }
});
