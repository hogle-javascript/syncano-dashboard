var React        = require('react'),
    ThemeManager = require('syncano-material-ui/lib/styles/theme-manager'),
    SyncanoTheme = require('../../src/common/SyncanoTheme');

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
