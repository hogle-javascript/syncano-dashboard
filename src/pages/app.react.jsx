var React        = require('react'),
    Router       = require('react-router'),
    RouteHandler = Router.RouteHandler

    ThemeManager = require('material-ui/lib/styles/theme-manager')();


module.exports = React.createClass({

  displayName: 'App',

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  render: function () {
    return (<RouteHandler/>)
  }

});



