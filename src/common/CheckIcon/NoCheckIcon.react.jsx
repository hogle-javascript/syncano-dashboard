var React      = require('react'),
    Radium     = require('radium'),

    ColorStore = require('../Color/ColorStore'),

    mui        = require('material-ui'),
    Colors     = mui.Styles.Colors,
    FontIcon   = mui.FontIcon,
    Paper      = mui.Paper;


module.exports = Radium(React.createClass({

  displayName: 'CheckIcon',

  propTypes: {
    id          : React.PropTypes.string,
    icon        : React.PropTypes.string,
    background  : React.PropTypes.string
  },

  getStyles: function() {
    return {
      icon: {
        color      : '#fff',
        display    : 'flex',
        fontSize   : 22,
        lineHeight : 1
      },
      background: {
        margin         : '0 16px 0 8px',
        height         : 40,
        minWidth       : 40,
        display        : 'flex',
        justifyContent : 'center',
        alignItems     : 'center'
      }
    }
  },

  render: function () {

    // Styles for icon and it's background
    var styles          = this.getStyles(),
        backgroundStyle = styles.background,
        iconStyle       = styles.icon;

    // Background color based on current state
    backgroundStyle.backgroundColor = this.props.background;

    return (
        <Paper
            zDepth = {0}
            circle = {true}
            style  = {backgroundStyle} >
          <FontIcon
            className = {"synicon-" + this.props.icon}
            style     = {iconStyle} />
        </Paper>
    )
  }
}));
