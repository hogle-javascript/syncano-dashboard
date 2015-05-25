var React = require('react');
var ColorStore = require('./store');

var ColorPickerListItem = require('./ColorPickerListItem.react');

module.exports = React.createClass({

  displayName: 'ColorPicker',

  render: function () {
    var items = ColorStore.getColorPickerPalette().map(function (color) {
      var selected = color === this.props.selectedColor;
      return <ColorPickerListItem key={color} color={color} selected={selected}/>;
    }.bind(this));
    return (
      <div className="color-picker">
        {items}
      </div>
    );
  }
});