import React                                 from 'react';
import Router                                from 'react-router';
import SessionActions                        from '../apps/Session/SessionActions';
import SessionStore                          from '../apps/Session/SessionStore';
import mui                                   from 'material-ui';
import {SyncanoTheme, SnackbarNotifications} from './../common';

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
    SessionActions.setRouter(this.context.router);
    SessionActions.setTheme(ThemeManager);
    ThemeManager.setTheme(SyncanoTheme);
  },

  render(){
    return (
      <div>
        <Router.RouteHandler/>
        <SnackbarNotifications />
      </div>
    );
  }
});
