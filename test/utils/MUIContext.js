var React        = require('react'),
    ThemeManager = require('material-ui/styles/theme-manager'),
    SyncanoTheme = require('../common/SyncanoTheme');

var MUIContext = function MUIContext(Component, props) {
  return React.createClass({

    childContextTypes: {
      muiTheme: React.PropTypes.object
    },

    getChildContext: function() {
      return {
        muiTheme: ThemeManager.getMuiTheme(SyncanoTheme)
      };
    },

    render: function render() {
      return React.createElement(Component, props);
    }
  });
};

module.exports = MUIContext;
