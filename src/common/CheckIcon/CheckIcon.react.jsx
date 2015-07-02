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
    checked     : React.PropTypes.bool,
    checkable   : React.PropTypes.bool,
    handleClick : React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      checkable: true
    }
  },

  getInitialState: function () {
    return {
      hovered    : false,
      checked    : this.props.checked,
      background : this.props.background
    }
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({checked: newProps.checked})
  },

  handleClick: function (event) {
    event.stopPropagation();
    if (this.props.handleClick) {
      this.props.handleClick(this.props.id, !this.state.checked);
    }

    this.setState({
      checked: !this.state.checked
    });
  },

  handleMouseOver: function () {
    this.setState({
      hovered: true
    });
  },
  handleMouseLeave: function () {
    this.setState({
      hovered: false
    });
  },

  getIconState: function () {

    var GREY = 'rgba(0,0,0,0.2)';

    // If icon is checked - background is grey and icon is 'check'
    if (this.state.checked) {
      return {
        icon  : 'checkbox-marked-outline',
        color : Colors.lightBlue500
      };
    }

    // If icon is hovered background is grey and icon is 'check_box_outline_blank'
    if (this.state.hovered ) {
      return {
        icon  : 'checkbox-blank-outline',
        color : GREY
      };
    }

    // Otherwise we have original colorful icon
    return {icon: this.props.icon, color: this.props.background};
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
      },
      cursor : {
        cursor: 'pointer'
      }
    }
  },

  renderIcon: function() {
    // Styles for icon and it's background
    var styles          = this.getStyles(),
        backgroundStyle = styles.background,
        iconStyle       = styles.icon;

    // State
    var iconState = this.getIconState();
    // Background color based on current state
    backgroundStyle.backgroundColor = iconState.color;

    // Which icon to show?
    var iconClass = iconState.icon;

    return (
        <Paper
            zDepth       = {0}
            circle       = {true}
            style        = {[backgroundStyle, this.props.checkable && styles.cursor]}
            onMouseOver  = {this.props.checkable ? this.handleMouseOver : null}
            onMouseLeave = {this.props.checkable ? this.handleMouseLeave : null}
            onClick      = {this.props.checkable ? this.handleClick : null}>
          <FontIcon className={"synicon-" + iconClass} style={iconStyle} />
        </Paper>
    )
  },

  render: function () {
    return (
      <div>
        {this.renderIcon()}
      </div>
    )
  }
}));
