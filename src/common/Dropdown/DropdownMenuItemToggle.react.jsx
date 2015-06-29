var React    = require('react'),
    mui      = require('material-ui'),

//var ViewActions = require('../actions/ViewActions');

    FontIcon = mui.FontIcon;

module.exports = React.createClass({

  displayName: 'DropdownMenuItemToggle',

  handleClick: function(e) {
    e.stopPropagation();
    this.props.handleClick(this.props.action.name);
  },

  render: function() {
    var type = this.props.action.selected ? "synicon-checkbox-marked" : "synicon-checkbox-blank";
    return (
      <div className="dropdown-menu-item dropdown-menu-item-toggle" onClick={this.handleClick}>
        <FontIcon className={type} />
        <span>{this.props.action.displayName}</span>
      </div>
    );
  }

});