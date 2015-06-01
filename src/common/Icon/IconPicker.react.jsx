var React = require('react');

var IconStore = require('./store');

var IconPickerListItem = require('./IconPickerItem.react');

require('./Icon.css');

module.exports = React.createClass({

  displayName: 'IconPicker',

  propTypes: {
    selectedIcon: React.PropTypes.string,
    handleClickListItem: React.PropTypes.func,
  },

  getInitialState: function() {
    return {
      selectedIcon: this.props.selectedIcon,    
    };
  },

  getIcons: function() {
    var items = IconStore.getIconPickerIcons().map(function (icon) {
      var selected = icon === this.state.selectedIcon;
      return <IconPickerListItem 
               key={icon} 
               ref={icon} 
               icon={icon} 
               selected={selected} 
               handleClick={this.setSelectedIcon.bind(this, icon)} />;
    }.bind(this));
    return items;
  },

  setSelectedIcon: function(iconName) {
    this.setState({
      selectedIcon: iconName,
    });
    if(this.props.handleClickListItem) {
      this.props.handleClickListItem();
    }
  },

  render: function() {
    return (
      <div className="icon-picker">
        {this.getIcons()}
      </div>
    );
  }

});