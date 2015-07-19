import React from 'react';
import Radium from 'radium';
import MUI from 'material-ui';

module.exports = Radium(React.createClass({

  displayName: 'Slider',

  propTypes: {
    legendItems: React.PropTypes.array,
    defaultSliderValue: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      defaultSliderValue: 0
    }
  },

  getInitialState() {
    return {
      selectedItem: this.props.defaultSliderValue
    }
  },

  getStyles() {
    let styles = {
      container: {
        position: 'relative'
      },
      legendItems: {
        position  : 'absolute',
        minWidth  : '100px',
        textAlign : 'center',
        transform : 'translate(-50%, 0%)'
      },
      lastLegendItem: {
        transform : 'translate(-100%, 0%) !important',
        textAlign : 'right !important'
      },
      selectedItem: {
        color : MUI.Styles.Colors.lightBlueA700
      }
    };
    return styles;
  },

  renderLegend() {
    var styles = this.getStyles().container;
    return (
        <div style={styles}>{this.renderLegendItems()}</div>
    )
  },

  renderLegendItems() {
    var styles = this.getStyles();
    return this.props.legendItems.map(function(item, i) {
      let position = i / (this.props.legendItems.length - 1) * 100 + '%';
      let isLastItem = i === this.props.legendItems.length - 1;
      let isSelected = i === this.state.selectedItem;

      return (
        <div style={[
          styles.legendItems,
          {left: position},
          isLastItem && styles.lastLegendItem,
          isSelected && styles.selectedItem
          ]}>
          {item}
        </div>
      );
    }.bind(this));
  },

  setSelectedItem(event, value) {
    this.setState({
      selectedItem: value
    })
  },

  render() {
    return (
      <div>
        <MUI.Slider
          style        = {{margin: '0 auto'}}
          name         = 'slider'
          ref          = 'slider'
          step         = {1}
          min          = {0}
          max          = {this.props.legendItems.length - 1}
          defaultValue = {this.props.defaultSliderValue}
          onChange     = {this.setSelectedItem}
          value        = {this.state.selectedItem}
        />
        {this.renderLegend()}
      </div>
    )
  }

}));