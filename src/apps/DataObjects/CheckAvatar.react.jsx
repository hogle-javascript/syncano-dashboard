import React       from 'react';
import classNames  from 'classnames';

import MUI         from 'material-ui';

export default React.createClass({

  displayName: 'ColumnAvatarCheck',

  propTypes: {
    id              : React.PropTypes.string,
    color           : React.PropTypes.string,
    hoverColor      : React.PropTypes.string,
    handleIconClick : React.PropTypes.func
  },

  getDefaultProps() {
    return {
      color      : 'black',
      hoverColor : MUI.Styles.Colors.blue600
    }
  },

  getInitialState() {
    return {
      checked : this.props.checked
    }
  },

  getStyles() {
    return {
      icon: {
        margin: 0
      }
    };
  },

  componentWillReceiveProps(newProps) {
    this.setState({checked: newProps.checked});
  },

  handleIconClick(event) {
    console.info('ColumnAvatarCheck:handleClick');
    this.props.handleIconClick(this.props.id, !this.state.checked)
  },

  handleMouseOver() {
    this.setState({
      hovered: true
    });
  },
  handleMouseLeave() {
    this.setState({
      hovered: false
    });
  },

  getIconState() {
    let GREY = 'rgba(0,0,0,0.2)';

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

  render() {
    let styles = this.getStyles();

    // Which icon to show?
    let iconState = this.getIconState(),
        icon = <MUI.FontIcon className={"synicon-" + iconState.icon} style={styles.icon} />;

    return(
      <MUI.Avatar
        icon            = {icon}
        style           = {this.props.style}
        backgroundColor = {iconState.color}
        onClick         = {this.handleIconClick}
        onMouseOver     = {this.handleMouseOver}
        onMouseOut      = {this.handleMouseLeave} />
    )
  }
});
