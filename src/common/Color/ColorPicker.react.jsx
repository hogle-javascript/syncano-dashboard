var React = require('react');
var ColorStore = require('./store');

var ColorPickerListItem = require('./ColorPickerItem.react');

module.exports = React.createClass({

  displayName: 'ColorPicker',

  propTypes: {
    selectedColor: React.PropTypes.string,
    handleClick: React.PropTypes.func,
  },

  render: function () {
    var items = ColorStore.getColorPickerPalette().map(function (color) {
      var selected = color === this.props.selectedColor;
      return <ColorPickerListItem key={color} color={color} selected={selected} handleClick={this.props.handleClick} />;
    }.bind(this));
    return (
      <div className="color-picker">
        {items}
      </div>
    );
  }
});