var React         = require('react'),
    Router        = require('react-router'),
    RouteHandler  = Router.RouteHandler,

    SessionActions = require('../apps/Session/SessionActions'),

    ThemeManager   = require('material-ui/lib/styles/theme-manager')();


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

  componentWillMount: function () {
    SessionActions.registerRouter(this.context.router);
  },

  render: function () {
    return <RouteHandler/>
  }

});



