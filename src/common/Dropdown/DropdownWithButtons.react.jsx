var React                  = require('react');
var classNames             = require('classnames');

var Icon                   = require('../Icon/Icon.react');

var DropdownMenuItem       = require('./Dropdown.react').DropdownMenuItem;
var DropdownMenuButton       = require('./Dropdown.react').DropdownMenuButton;

var DropdownMenuItemToggle = require('./DropdownMenuItemToggle.react');

require('./Dropdown.css');

module.exports = React.createClass({

  displayName: 'DropdownWithButtons',

  toggleDropdownMenu: function(e) {
    e.stopPropagation();
    this.props.toggleDropdownMenu();
  },

  render: function() {
    var cssClasses = classNames({
      'dropdown-menu': true,
      'dropdown-menu-visible': this.props.visible,
    });

    var items = this.props.actions.filter(function(action){
      return !action.hasOwnProperty('iconType')
    }).map(function(action, i) {
      return <DropdownMenuItem {...this.props} key={i} action={action} />
    }.bind(this));

    var buttons = this.props.actions.filter(function(action){
      return action.hasOwnProperty('iconType')
    }).map(function(action, i){
      return <DropdownMenuButton {...this.props} key={i} action={action} />
    }.bind(this));

    return (
      <div className="dropdown">
        <div className="dropdown-button clickable" onClick={this.toggleDropdownMenu}>
          <Icon icon={this.props.icon} />
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
