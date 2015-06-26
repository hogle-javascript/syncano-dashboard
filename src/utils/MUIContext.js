var React        = require('react'),
    ThemeManager = require('material-ui/lib/styles/theme-manager'),
    Colors       = require('material-ui/lib/styles/colors');

// More info
// https://github.com/rackt/react-router/blob/master/docs/guides/testing.md

var MUIContext = function MUIContext(Component, props) {
  return React.createClass({

    childContextTypes: {
      muiTheme: React.PropTypes.object
    },

    getChildContext: function() {
      return {
        muiTheme: ThemeManager.getCurrentTheme()
      };
    },
    
    render: function render() {
      return React.createElement(Component, props);
    }
  });
};

module.exports = MUIContext;
