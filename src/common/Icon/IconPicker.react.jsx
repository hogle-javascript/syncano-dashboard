var React = require('react');

var IconStore = require('./store');

var IconPickerListItem = require('./IconPickerItem.react');


module.exports = React.createClass({

  displayName: 'IconPicker',

  propTypes: {
    selectedIcon: React.PropTypes.string,
  },

  render: function () {
    var items = IconStore.getIconPickerIcons().map(function (icon) {
      var selected = icon === this.props.selectedIcon;
      return <IconPickerListItem key={icon} icon={icon} selected={selected}/>;
    }.bind(this));
    return (
      <div className="icon-picker">
        {items}
      </div>
    );
  }
});