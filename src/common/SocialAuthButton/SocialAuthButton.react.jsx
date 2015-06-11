var React           = require('react'),
    mui             = require('material-ui'),
    StylePropable   = mui.Mixins.StylePropable,
    FlatButton      = mui.FlatButton,
    FontIcon        = mui.FontIcon;

require('./SocialAuthButton.sass');


module.exports = React.createClass({

  displayName: 'SocialAuthButton',

  mixins: [StylePropable],

  propTypes: {
    icon: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    handleClick: React.PropTypes.func.isRequired
  },

  getButtonStyles: function() {
    var style = {
      width: '100%',
      borderRadius: '0'
    };
    return this.mergeStyles(style, this.props.style);
  },

  getIconStyles: function() {
    var style = {
      display: 'flex'
    };
    return this.mergeStyles(style, this.props.style);
  },

  render: function () {

    var buttonStyles = this.getButtonStyles();
    var iconStyles = this.getIconStyles();

    return (
      <FlatButton className='social-auth-button' hoverColor="#1e88e5" style={buttonStyles} linkButton={true} onClick={this.props.handleClick} label={this.props.label}>
        <FontIcon style={iconStyles} className={this.props.icon} />
      </FlatButton>
    )
  }
});