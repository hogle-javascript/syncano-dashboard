var React     = require('react'),
    Radium    = require('radium'),

    MUI       = require('material-ui');

module.exports = Radium(React.createClass({

  displayName: 'Slider',

  propTypes: {
    legendItems: React.PropTypes.array,
    defaultSliderValue: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      defaultSliderValue: 0
    }
  },

  getInitialState: function() {
    return {
      selectedItem: this.props.defaultSliderValue
    }
  },

  getStyles: function() {
    var styles = {
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

  renderLegend: function() {
    var styles = this.getStyles().container;
    return (
        <div style={styles}>{this.renderLegendItems()}</div>
    )
  },

  renderLegendItems: function() {
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

  setSelectedItem: function(e, value) {
    this.setState({
      selectedItem: value
    })
  },

  render: function() {
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