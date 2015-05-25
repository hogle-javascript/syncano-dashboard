var React = require('react');

var Icon = require('../Icon/Icon.react');

require('./SocialButtonList.css');


module.exports = React.createClass({

  displayName: 'ButtonSocialAuth',

  handleClick: function () {
    this.props.handleClick(this.props.type);
  },

  render: function () {
    return (
      <li className="button-social-auth" onClick={this.handleClick}>
        <Icon icon={this.props.type}/>

        <div className="button-text">{this.props.text}</div>
      </li>
    );
  }
});