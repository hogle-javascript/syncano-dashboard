import React from 'react';
import Radium from 'radium';
import MUI from 'material-ui';

export default Radium(React.createClass({

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
    return {
      container: {
        position  : 'relative'
      },
      legendItems: {
        position  : 'absolute',
        minWidth  : '100px',
        textAlign : 'center',
        Transform : 'translateX(-50%)'
      },
      lastLegendItem: {
        Transform : 'translate(-100%) !important',
        textAlign : 'right !important'
      },
      selectedItem: {
        color     : MUI.Styles.Colors.lightBlueA700
      }
    }
  },

  renderLegend() {
    var styles = this.getStyles().container;
    return (
      <div style={styles}>
        {this.renderLegendItems()}
      </div>
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
          ]}
        >
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
          defaultValue = {this.props.defaultSliderValue}
          onChange     = {this.setSelectedItem}
          style        = {{margin: '0 auto'}}
          value        = {this.state.selectedItem}
          step         = {1}
          name         = 'slider'
          ref          = 'slider'
          min          = {0}
          max          = {this.props.legendItems.length - 1}
        />
        {this.renderLegend()}
      </div>
    )
  }

}));
