var React = require('react');

module.exports = React.createClass({

  displayName: 'Show',

  render: function() {
    return (this.props.if) ? this.props.children: null;
  }
});
