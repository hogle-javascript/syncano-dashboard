import React from 'react';
import Radium from 'radium';

import ColorStore from '../Color/ColorStore';

import MUI from 'material-ui';

export default Radium(React.createClass({

  displayName: 'CheckIcon',

  propTypes: {
    id: React.PropTypes.string,
    icon: React.PropTypes.string,
    checked: React.PropTypes.bool,
    checkable: React.PropTypes.bool,
    handleClick: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      checkable: true
    }
  },

  getInitialState() {
    return {
      hovered: false,
      checked: this.props.checked,
      background: this.props.background
    }
  },

  componentWillReceiveProps(newProps) {
    this.setState({checked: newProps.checked})
  },

  handleClick(event) {
    event.stopPropagation();
    if (this.props.handleClick) {
      this.props.handleClick(this.props.id, !this.state.checked);
    }

    this.setState({
      checked: !this.state.checked
    });
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
      return {
        icon: 'checkbox-marked-outline',
        color: MUI.Styles.Colors.lightBlue500
      };
    }

    // If icon is hovered background is grey and icon is 'check_box_outline_blank'
    if (this.state.hovered) {
      return {
        icon: 'checkbox-blank-outline',
        color: GREY
      };
    }

    // Otherwise we have original colorful icon
    return {
      icon: this.props.icon,
      color: this.props.background
    };
  },

  getStyles() {
    return {
      icon: {
        color: '#fff',
        display: 'flex',
        fontSize: 22,
        lineHeight: 1
      },
      background: {
        margin: '0 16px 0 8px',
        height: 40,
        minWidth: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      checkable: {
        cursor: 'pointer'
      }
    }
  },

  render() {
    let styles = this.getStyles(),
      iconState = this.getIconState(),
      iconStyle = styles.icon,
      iconClass = iconState.icon,
      backgroundStyle = styles.background;

    // Background color based on current state
    backgroundStyle.backgroundColor = iconState.color;

    return (
      <MUI.Paper
        zDepth={0}
        circle={true}
        style={[styles.background, this.props.checkable && styles.checkable]}
        onMouseOver={this.props.checkable ? this.handleMouseOver : null}
        onMouseLeave={this.props.checkable ? this.handleMouseLeave : null}
        onClick={this.props.checkable ? this.handleClick : null}>
        <MUI.FontIcon
          className={`synicon-${iconClass}`}
          style={iconStyle}/>
      </MUI.Paper>
    )
  }
}));
