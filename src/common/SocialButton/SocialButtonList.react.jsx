var React = require('react');

var Icon = require('../Icon/Icon.react');
var ButtonSocialAuth = require('./ButtonSocialAuth.react');

require('./SocialButtonList.css');


module.exports = React.createClass({

  displayName: 'ButtonSocialAuthList',

  getDefaultProps: function () {

    return {
      buttons: [{
        type: 'github',
        text: 'Log in with Github',
      }, {
        type: 'google',
        text: 'Log in with Google',
      }, {
        type: 'facebook',
        text: 'Log in with Facebook',
      }]
    }
  },

  render: function () {
    var buttons = this.props.buttons.map(function (button, i) {
      return <ButtonSocialAuth {...this.props} key={i} type={button.type} text={button.text}/>;
    }.bind(this));
    return (
      <ul className="button-social-auth-list">
        {buttons}
      </ul>
    );
  }
});