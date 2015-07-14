var React              = require('react'),
    Router             = require('react-router'),
    Reflux             = require('reflux'),
    RouteHandler       = Router.RouteHandler,

    SessionActions     = require('../apps/Session/SessionActions'),
    SessionStore       = require('../apps/Session/SessionStore'),
    RequestStore       = require('../common/Request/RequestStore'),

    mui                = require('material-ui'),
    ThemeManager       = new mui.Styles.ThemeManager(),
    Snackbar           = mui.Snackbar,
    SyncanoTheme       = require('./../common/SyncanoTheme');

import * as common from '../common';


module.exports = React.createClass({

  displayName: 'App',

  mixins: [
    Reflux.connect(RequestStore),
    Router.State
  ],

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  getChildContext: function(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  getInitialState: function() {
    return {
      showErrorSnackbar: false
    };
  },

  componentWillUpdate: function(nextProps, nextState) {
    if (this.getParams().instanceName === undefined) {
      SessionStore.removeInstance();
    }

    if (this.state.showErrorSnackbar !== nextState.showErrorSnackbar) {
      if (nextState.showErrorSnackbar === true) {
        this.refs.errorSnackbar.show();
      } else {
        this.refs.errorSnackbar.dismiss();
      }
    }

  },

  componentWillMount: function() {
    SessionActions.setRouter(this.context.router);
    SessionActions.setTheme(ThemeManager);
    ThemeManager.setTheme(SyncanoTheme);
  },

  handleActionTouchTap: function () {
    // Reloads current page without cache
    location.reload(true);
  },

  render: function(){
    return (
      <div>
        <RouteHandler/>
        <Snackbar
          ref              = "errorSnackbar"
          message          = "Something went wrong"
          action           = "refresh"
          onActionTouchTap = {this.handleActionTouchTap} />
      </div>
    );
  }

});