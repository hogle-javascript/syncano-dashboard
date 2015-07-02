var React        = require('react'),
    mui          = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager();


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
