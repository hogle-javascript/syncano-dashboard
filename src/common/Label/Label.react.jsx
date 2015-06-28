var React = require('react');

require('./Label.css');

module.exports = React.createClass({

  displayName: 'Label',

  propTypes: {
    text: React.PropTypes.string.isRequired
  },

  render: function() {
    return (
      <div className="label"><span>{this.props.text}</span></div>
    );
  }
});