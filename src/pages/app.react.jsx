var React              = require('react'),
    Router             = require('react-router'),
    RouteHandler       = Router.RouteHandler,

    SessionActions     = require('../apps/Session/SessionActions'),
    SessionStore       = require('../apps/Session/SessionStore'),

    mui                = require('material-ui'),
    ThemeManager       = new mui.Styles.ThemeManager(),
    Snackbar           = mui.Snackbar,
    SyncanoTheme       = require('./../common/SyncanoTheme');

module.exports = React.createClass({

  displayName: 'App',

  mixins: [Router.State],

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

  componentWillUpdate: function() {
    var routes = this.getRoutes();
    var isInInstancesScope = routes.some(function (route) {
      return route.name === "instances";
    });
    if (!isInInstancesScope) {
      SessionStore.removeInstance();
    }
  },

  componentWillMount: function() {
    SessionActions.setRouter(this.context.router);
    SessionActions.setTheme(ThemeManager);
    ThemeManager.setTheme(SyncanoTheme);
  },

  render: function(){
    return (
      <div>
        <RouteHandler/>
        <Snackbar
          ref              = "errorSnackbar"
          message          = "Something went wrong"
          action           = "refresh"
          onActionTouchTap = "" />
      </div>
    );
  }

});