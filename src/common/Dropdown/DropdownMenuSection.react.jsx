var React       = require('react');

module.exports = React.createClass({

  displayName: 'DropdownMenuSection',

  render: function() {
    return (
      <div className="dropdown-menu-section">
        {items}
      </div>
    );
  }

});