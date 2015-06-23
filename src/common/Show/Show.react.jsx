var React         = require('react');

module.exports = React.createClass({

  displayName: 'Show',

  render: function() {
    if (this.props.if === true) {
      return this.props.children;
    }
    return null;
  }
});
