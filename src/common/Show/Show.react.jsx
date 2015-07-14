var React         = require('react');

module.exports = React.createClass({

  displayName: 'Show',

  getInitialState: function() {
    return {};
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState(nextProps);
  },

  render: function() {
    if (this.state.if) {
      return this.state.children;
    }
    return null;
  }
});
