var React = require('react'),
    classNames = require('classnames');

module.exports = React.createClass({

  displayName: 'DropdownMenuItem',

  propTypes: {
    action: React.PropTypes.object.isRequired,
    handleItemClick: React.PropTypes.func.isRequired,
  },

  handleItemClick: function(e) {
    this.props.handleItemClick(this.props.action);
    e.stopPropagation();
  },

  render: function() {
    return (
      <div className="dropdown-menu-item clickable" onClick={this.handleItemClick}>{this.props.action.content}</div>
    );
  }
});
