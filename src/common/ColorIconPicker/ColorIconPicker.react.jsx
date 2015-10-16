import React from 'react';
import Radium from 'radium';

import MUI from 'material-ui';

import ColorStore from '../Color/ColorStore';
import IconStore from '../Icon/IconStore';

export default Radium(React.createClass({

  displayName: 'ColorIconPicker',

  propTypes: {
    selectedColor: React.PropTypes.string,
    selectedIcon: React.PropTypes.string,
    pickerType: React.PropTypes.oneOf(['color', 'icon']),
    handleChange: React.PropTypes.func
  },

  getInitialState() {
    return {
      selectedColor: this.props.selectedColor,
      selectedIcon: this.props.selectedIcon
    };
  },

  componentWillReceiveProps(nextProps) {
    console.info('ColorIconPicker::componentWillReceiveProps');
    this.setState({
      selectedColor: nextProps.selectedColor,
      selectedIcon: nextProps.selectedIcon
    });
  },

  getStyles() {
    return {
      container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        cursor: 'pointer'
      },
      item: {
        margin: 12,
        height: 50,
        width: 50,
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    };
  },

  handleSetColor(event) {
    console.info('IconPicker::handleSetColor', event.target.id);
    event.preventDefault();
    this.setState({selectedColor: event.target.id});
    this.props.handleChange({color: event.target.id});
  },

  handleSetIcon(event) {
    console.info('IconPicker::handleSetIcon', event.target.id);
    event.preventDefault();
    this.setState({selectedIcon: event.target.id});
    this.props.handleChange({icon: event.target.id});
  },

  genIconItem(icon) {
    let styles = this.getStyles().item;
    let zDepth = 0;
    let iconColor = '#000';

    if (icon === this.state.selectedIcon) {
      zDepth = 3;
      styles.background = ColorStore.getColorByName(this.state.selectedColor);
      iconColor = '#fff';
    }

    return (
      <MUI.Paper
        zDepth={zDepth}
        key={icon}
        circle={true}
        style={styles}>
        <MUI.FontIcon
          id={icon}
          className={`synicon-${icon}`}
          style={{color: iconColor}}
          onClick={this.handleSetIcon}/>
      </MUI.Paper>
    );
  },

  genColorItem(color) {
    let icon = null;
    let styles = this.getStyles().item;
    let zDepth = 0;

    styles.background = ColorStore.getColorByName(color);

    if (color === this.state.selectedColor) {
      zDepth = 3;
      icon = (
        <MUI.FontIcon
          className={`synicon-${this.state.selectedIcon}`}
          style={{color: 'white'}}/>
      );
    }

    return (
      <MUI.Paper
        id={color}
        zDepth={zDepth}
        key={color}
        circle={true}
        style={styles}
        onClick={this.handleSetColor}>
        {icon}
      </MUI.Paper>
    );
  },

  render() {
    let items = null;
    let styles = this.getStyles();

    if (this.props.pickerType === 'color') {
      items = ColorStore.getColorPickerPalette().map((color) => this.genColorItem(color));
    } else {
      items = IconStore.getIconPickerIcons().map((icon) => this.genIconItem(icon));
    }

    return (
      <div style={styles.container}>
        {items}
      </div>
    );
  }
}));
