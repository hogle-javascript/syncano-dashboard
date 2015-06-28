var React       = require('react'),
    classNames  = require('classnames'),

    mui         = require('material-ui'),
    Avatar      = mui.Avatar,
    Paper       = mui.Paper,
    Colors      = mui.Styles.Colors;


module.exports = React.createClass({

  displayName: 'ColumnAvatarCheck',

  propTypes: {
    id              : React.PropTypes.string,
    color           : React.PropTypes.string,
    hoverColor      : React.PropTypes.string,
    handleIconClick : React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      color      : 'black',
      hoverColor : Colors.blue600
    }
  },

  getInitialState: function () {
    return {
      checked : this.props.checked,
    }
  },

  getStyles: function() {
    return {
      icon: {
        margin: 0
      },
    };
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({checked: newProps.checked});
  },

  handleIconClick: function (event) {
    console.info('ColumnAvatarCheck:handleClick');
    this.props.handleIconClick(this.props.id, !this.state.checked)
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
      return {icon: 'checkbox-marked-outline', color: GREY};
    }

    // If icon is hovered background is grey and icon is 'check_box_outline_blank'
    if (this.state.hovered ) {
      return {icon: 'checkbox-blank-outline', color: GREY};
    }

    // Otherwise we have original colorful icon
    return {icon: this.props.icon, color: this.props.background};
  },

  render: function () {

    var styles = this.getStyles();

    // Which icon to show?
    var iconState = this.getIconState(),
        icon = <FontIcon className={"synicon-" + iconState.icon} style={styles.icon}/>;

    return <Avatar
        icon            = {icon}
        style           = {this.props.style}
        backgroundColor = {iconState.color}
        onClick         = {this.handleIconClick}
        onMouseOver     = {this.handleMouseOver}
        onMouseOut      = {this.handleMouseLeave}
        />;
  }
});
