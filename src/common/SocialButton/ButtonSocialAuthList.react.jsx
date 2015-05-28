var React = require('react');
var ButtonSocialAuth = require('./ButtonSocialAuth.react');

require('./ButtonSocialAuthList.css');

module.exports = React.createClass({

  displayName: 'ButtonSocialAuthList',

  propTypes: {
    buttons: React.PropTypes.shape({
      icon: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired
    }),
  },

  render: function () {
    var buttons = this.props.buttons.map(function(button, i) {
      return <ButtonSocialAuth key={i} icon={button.icon} text={button.text}/>;
    }.bind(this));
    return (
      <div className="button-social-auth-list">
        {buttons}
      </div>
    );
  }
});