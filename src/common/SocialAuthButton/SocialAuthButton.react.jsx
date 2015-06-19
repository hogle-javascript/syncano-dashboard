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

  getButtonStyles: function () {
    var style = {
      width: '100%',
      borderRadius: '0',
      textTransform: 'none',
      color: '#1e88e5',
      fontWeight: 400
    };
    return this.mergeStyles(style, this.props.style);
  },

  getIconStyles: function () {
    var style = {
      display: 'flex',
      fontSize: '18px',
      lineHeight: '1',
      padding: '14px 16px'
    };
    return this.mergeStyles(style, this.props.style);
  },

  render: function () {

    var buttonStyles = this.getButtonStyles();
    var iconStyles = this.getIconStyles();

    return (
      <FlatButton
        className="social-auth-button"
        hoverColor="#1e88e5"
        style={buttonStyles}
        linkButton={true}
        onClick={this.props.handleClick}
        label={this.props.label}>
        <FontIcon style={iconStyles} className={this.props.icon} />
      </FlatButton>
    )
  }
}));
