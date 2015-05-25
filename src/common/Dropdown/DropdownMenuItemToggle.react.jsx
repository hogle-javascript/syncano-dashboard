var React       = require('react');

//var ViewActions = require('../actions/ViewActions');

var Icon        = require('../Icon/Icon.react');

module.exports = React.createClass({

  displayName: 'DropdownMenuItemToggle',

  handleClick: function(e) {
    e.stopPropagation();
    this.props.handleClick(this.props.action.name);
  },

  render: function() {
    var type = this.props.action.selected ? "checkbox-marked" : "checkbox-blank";
    return (
      <div className="dropdown-menu-item dropdown-menu-item-toggle" onClick={this.handleClick}>
        <Icon icon={type} />
        <span>{this.props.action.displayName}</span>
      </div>
    );
  }

});