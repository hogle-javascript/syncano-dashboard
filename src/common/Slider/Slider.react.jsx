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

  componentWillReceiveProps(nextProps) {
    this.setState({
      value : nextProps.value
    })
  },

  getStyles() {
    return {
      container: {
        position  : 'relative'
      },
      legendItems: {
        position   : 'absolute',
        minWidth   : '100px',
        textAlign  : 'center',
        Transform  : 'translateX(-50%)',
        userSelect : 'none',
        cursor     : 'pointer'
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

  handleOptionsClick(i, type) {
    this.props.optionClick(i, type);
  },

  renderLegendItems() {
    var styles = this.getStyles();

    return this.props.legendItems.map(function(item, i) {
      let position = i / (this.props.legendItems.length - 1) * 100 + '%';
      //let isLastItem = i === this.props.legendItems.length - 1;
      let isLastItem = false;
      let isSelected = i === this.state.value;

      return (
        <div
          key   = {i}
          style = {[
            styles.legendItems,
            {left: position},
            isLastItem && styles.lastLegendItem,
            isSelected && styles.selectedItem
          ]}
          onClick = {this.handleOptionsClick.bind(this, i, this.props.type)}
        >
          {item}
        </div>
      );
    }.bind(this));
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
          onChange     = {this.props.onChange}
          value        = {this.props.value}
        />
        {this.renderLegend()}
      </div>
    )
  }

}));
