var React           = require('react'),
    Router          = require('react-router'),
    RouteHandler    = Router.RouteHandler,

    SessionActions  = require('../apps/Session/SessionActions'),

    mui             = require('material-ui'),
    ThemeManager    = new mui.Styles.ThemeManager(),
    SyncanoTheme    = require('./../common/SyncanoTheme');

module.exports = React.createClass({

  displayName: 'App',

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  componentWillMount: function() {
    SessionActions.setRouter(this.context.router);
    SessionActions.setTheme(ThemeManager);
    ThemeManager.setTheme(SyncanoTheme);
  },

  render: function() {
    return <RouteHandler/>
  }

});