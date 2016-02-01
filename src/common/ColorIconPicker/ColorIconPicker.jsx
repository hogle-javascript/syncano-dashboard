import React from 'react';
import Radium from 'radium';

import {Utils, Paper, FontIcon} from 'syncano-material-ui';
import {Color} from 'syncano-components';
import IconStore from '../Icon/IconStore';

export default Radium(React.createClass({

  displayName: 'ColorIconPicker',

  propTypes: {
    selectedColor: React.PropTypes.string,
    selectedIcon: React.PropTypes.string,
    pickerType: React.PropTypes.oneOf(['color', 'icon']),
    handleChange: React.PropTypes.func
  },

  mixins: [
    Utils.Styles
  ],

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
      },
      colorItem: {
        margin: 18
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
      styles.background = Color.getColorByName(this.state.selectedColor);
      iconColor = '#fff';
    }

    return (
      <Paper
        zDepth={zDepth}
        key={icon}
        circle={true}
        style={styles}>
        <FontIcon
          id={icon}
          className={`synicon-${icon}`}
          style={{color: iconColor}}
          onClick={this.handleSetIcon}/>
      </Paper>
    );
  },

  genColorItem(color) {
    let icon = null;
    let styles = this.getStyles();
    let zDepth = 0;

    styles.item.background = Color.getColorByName(color);

    if (color === this.state.selectedColor) {
      zDepth = 3;
      icon = (
        <FontIcon
          className={`synicon-${this.state.selectedIcon}`}
          style={{color: 'white'}}/>
      );
    }

    return (
      <Paper
        id={color}
        zDepth={zDepth}
        key={color}
        circle={true}
        style={this.mergeStyles(styles.item, styles.colorItem)}
        onClick={this.handleSetColor}>
        {icon}
      </Paper>
    );
  },

  render() {
    let items = null;
    let styles = this.getStyles();

    if (this.props.pickerType === 'color') {
      items = Color.getColorPickerPalette().map((color) => this.genColorItem(color));
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
