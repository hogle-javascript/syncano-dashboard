var React = require('react');
var Icon = require('../Icon/Icon.react');

require('./ButtonSocialAuth.css');

module.exports = React.createClass({

  displayName: 'ButtonSocialAuth',

  propTypes: {
    text: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string.isRequired,
    handleClick: React.PropTypes.func.isRequired,
  },

  handleClick: function () {
    this.props.handleClick(this.props.icon);
  },

  render: function () {
    return (
      <div className="button-social-auth" onClick={this.handleClick}>
        <Icon icon={this.props.icon}/>
        <div className="button-text">{this.props.text}</div>
      </div>
    );
  }
});