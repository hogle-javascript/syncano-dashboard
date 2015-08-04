let React = require('react'),
  classNames = require('classnames'),
  mui = require('material-ui'),

  FontIcon = mui.FontIcon,
  DropdownMenuItem = require('./Dropdown.react').DropdownMenuItem,
  DropdownMenuButton = require('./Dropdown.react').DropdownMenuButton,
  DropdownMenuItemToggle = require('./DropdownMenuItemToggle.react');


module.exports = React.createClass({

  displayName: 'DropdownWithButtons',

  toggleDropdownMenu: function(e) {
    e.stopPropagation();
    this.props.toggleDropdownMenu();
  },

  render: function() {
    let cssClasses = classNames({
      'dropdown-menu': true,
      'dropdown-menu-visible': this.props.visible,
    });

    let items = this.props.actions.filter(function(action) {
      return !action.hasOwnProperty('iconType')
    }).map(function(action, i) {
      return <DropdownMenuItem
        {...this.props}
        key={i}
        action={action}/>
    }.bind(this));

    let buttons = this.props.actions.filter(function(action) {
      return action.hasOwnProperty('iconType')
    }).map(function(action, i) {
      return <DropdownMenuButton
        {...this.props}
        key={i}
        action={action}/>
    }.bind(this));

    return (
      <div className="dropdown">
        <div
          className="dropdown-button clickable"
          onClick={this.toggleDropdownMenu}>
          <FontIcon className={this.props.icon}/>
        </div>
        <div className={cssClasses}>
          <div className="dropdown-menu-section">
            {items}
          </div>
          <div className="dropdown-menu-section dropdown-menu-section-buttons">
            {buttons}
          </div>
        </div>
      </div>
    );
  }

});
