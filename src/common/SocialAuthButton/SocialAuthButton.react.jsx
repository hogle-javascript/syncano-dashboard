var React           = require('react'),
    Radium          = require('radium'),

    mui             = require('material-ui'),
    StylePropable   = mui.Mixins.StylePropable,
    FlatButton      = mui.FlatButton,
    FontIcon        = mui.FontIcon;


module.exports = Radium(React.createClass({

  displayName: 'SocialAuthButton',

  mixins: [StylePropable],

  propTypes: {
    icon: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    handleClick: React.PropTypes.func.isRequired
  },

  getStyles: function () {
    return {
      button: {
        width: '100%',
        borderRadius: '0',
        textTransform: 'none',
        color: '#1e88e5',
        fontWeight: 400
      },
      icon: {
        display: 'flex',
        fontSize: '18px',
        lineHeight: '1',
        padding: '14px 16px'
      }
    }
  }

  getButtonStyles: function () {
    var styles = this.getStyles();

    return this.mergeStyles(styles.button, this.props.style);
  },

  getIconStyles: function () {
    var styles = this.getStyles();

    return this.mergeStyles(styles.icon, this.props.style);
  },

  render: function () {

    var buttonStyles = this.getButtonStyles(),
        iconStyles   = this.getIconStyles();

    return (
      <FlatButton
        className  = "social-auth-button"
        hoverColor = "#1e88e5"
        style      = {buttonStyles}
        linkButton = {true}
        onClick    = {this.props.handleClick}
        label      = {this.props.label}>

        <FontIcon
          style     = {iconStyles}
          className = {this.props.icon} />
      </FlatButton>
    )
  }
}));
