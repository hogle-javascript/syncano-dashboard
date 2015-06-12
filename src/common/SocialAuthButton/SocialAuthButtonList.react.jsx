var React            = require('react'),
    SocialAuthButton = require('./SocialAuthButton.react.jsx');


module.exports = React.createClass({

  displayName: 'SocialAuthButtonList',

  propTypes: {
    children: React.PropTypes.any.isRequired
  },

  render: function () {
    return (
      <ul className="social-auth-button-list">{this.props.children}</ul>
    );
  }
});