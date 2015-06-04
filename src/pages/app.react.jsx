var React        = require('react'),
    Router       = require('react-router'),
    RouteHandler = Router.RouteHandler,

    AuthActions  = require('../apps/Main/MainActions'),

    ThemeManager = require('material-ui/lib/styles/theme-manager')();


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
    MainActions.registerRouter(this.context.router);
  },

  render: function () {
    return (<RouteHandler/>)
  }

});



