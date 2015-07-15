var React           = require('react'),
    Radium          = require('radium'),

    mui             = require('material-ui'),
    StylePropable   = mui.Mixins.StylePropable,
    FlatButton      = mui.FlatButton,
    FontIcon        = mui.FontIcon,

    Colors          = mui.Styles.Colors;


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
        fontWeight: 400,
        ':hover': {
          color: '#fff'
        }
      },
      icon: {
        display: 'flex',
        fontSize: '18px',
        lineHeight: '1',
        padding: '14px 16px',
        color: 'inherit',
        transition: 'none'
      }
    }
  },

  render: function () {
    var styles = this.getStyles();

    return (
      <FlatButton
        key = {0}
        className  = "social-auth-button"
        hoverColor = "#1e88e5"
        style      = {styles.button}
        linkButton = {true}
        onClick    = {this.props.handleClick}
        label      = {this.props.label}>

        <FontIcon
          key = {1}
          style     = {styles.icon}
          className = {this.props.icon} />
      </FlatButton>
    )
  }
}));
