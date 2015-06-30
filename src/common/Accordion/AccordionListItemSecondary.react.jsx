var React       = require('react'),
    classNames  = require('classnames'),

    Dropdown    = require('../Dropdown/Dropdown.react');


module.exports = React.createClass({

  displayName: 'AccordionListItemSecondary',

  onItemClick: function(e) {
    e.stopPropagation();
    ViewActions.setAccordionSelectedItem(this.props.item)
  },

  toggleDropdownMenu: function() {
    ViewActions.showDropdown(this.props.item.uuid);
  },

  handleDropdownMenuItemClick: function(action) {
    if (action === "delete") {
      ViewActions.showModalConfirmDeleteResource(this.props.item);
    } else if (action === "edit") {
      ViewActions.showModalUpdateResource(this.props.item);
    }
  },

  render: function() {
    var cssClasses = classNames({
      'accordion-list-item': true,
      'accordion-list-item-secondary': true,
      'accordion-list-item-active': this.props.selectedItemId === this.props.item.id,
    });
    var styles = {
      backgroundColor: this.props.item.data.color || "#50A5E3"
    };
    var actions = ConfigStore.getConfig()[this.props.item.type].actions;
    var dropdownVisible = this.props.dropdown === this.props.item.uuid;
    return (
      <div
        className = {cssClasses}
        onClick   = {this.onItemClick}>
        <div className="accordion-list-item-content">
          <div
            className = "accordion-list-item-symbol"
            style     = {styles}></div>
          <div className="accordion-list-item-text">{this.props.item.data.name}</div>
        </div>
        <div className="accordion-list-item-icon accordion-list-item-icon-options">
          <Dropdown
            actions            = {actions}
            visible            = {dropdownVisible}
            toggleDropdownMenu = {this.toggleDropdownMenu}
            handleClick        = {this.handleDropdownMenuItemClick} />
        </div>
      </div>
    );
  }
});