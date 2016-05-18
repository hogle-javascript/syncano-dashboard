import React from 'react';
import Radium from 'radium';

import {IconButton, Styles, Utils} from 'syncano-material-ui';

export default Radium(React.createClass({

  displayName: 'CheckIcon',

  propTypes: {
    iconClassName: React.PropTypes.string,
    iconColor: React.PropTypes.string,
    circleColor: React.PropTypes.string,
    checked: React.PropTypes.bool,
    checkable: React.PropTypes.bool,
    id: React.PropTypes.string,
    handleClick: React.PropTypes.func
  },

  mixins: [Utils.Styles],

  getDefaultProps() {
    return {
      checkedIcon: {
        className: 'checkbox-marked-outline',
        color: '#FFF',
        circleColor: Styles.Colors.lightBlue500
      },
      hoveredIcon: {
        className: 'checkbox-blank-outline',
        color: '#FFF',
        circleColor: 'rgba(0,0,0,0.2)'
      },
      icon: {
        className: 'cloud',
        color: '#FFF',
        circleColor: Styles.Colors.indigo700
      },
      checkable: true
    };
  },

  getInitialState() {
    return {
      hovered: false,
      checked: false
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      checked: nextProps.checked
    });
  },

  getStyles() {
    return {
      icon: {
        color: this.props.icon.color,
        display: 'block',
        fontSize: 24,
        lineHeight: '16px'
      },
      iconButton: {
        backgroundColor: this.props.icon.circleColor,
        padding: 0,
        margin: '0 16px 0 8px',
        height: 40,
        width: 40,
        display: 'block',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%'
      }
    };
  },

  getIconState() {
    // If icon is checked - background is grey and icon is 'check'
    if (this.state.checked) {
      return this.props.checkedIcon;
    }

    // If icon is hovered background is grey and icon is 'check_box_outline_blank'
    if (this.state.hovered) {
      return this.props.hoveredIcon;
    }

    // Otherwise we have original colorful icon
    return this.props.icon;
  },

  handleClick(event) {
    event.stopPropagation();
    if (this.props.handleClick) {
      this.props.handleClick(this.props.id, !this.props.checked, this.props.keyName);
    }

    this.setState({
      checked: !this.state.checked
    });
  },

  toggleHover() {
    this.setState({
      hovered: !this.state.hovered
    });
  },

  render() {
    const styles = this.getStyles();
    const icon = this.getIconState();

    styles.iconButton.backgroundColor = icon.circleColor;
    styles.icon.color = icon.color;

    return (
      <IconButton
        iconClassName={`synicon-${icon.className}`}
        iconStyle={this.mergeStyles(styles.icon, this.props.iconStyle)}
        style={this.mergeStyles(styles.iconButton, this.props.style)}
        onMouseEnter={this.props.checkable ? this.toggleHover : null}
        onMouseLeave={this.props.checkable ? this.toggleHover : null}
        onTouchTap={this.props.checkable ? this.handleClick : null}/>
    );
  }
}));
