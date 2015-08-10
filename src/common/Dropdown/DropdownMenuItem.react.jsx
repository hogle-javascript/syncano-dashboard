let React = require('react');
let classNames = require('classnames');

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

  render() {
    return (
      <div className="dropdown-menu-item clickable" onClick={this.handleItemClick}>{this.props.action.content}</div>
    );
  }
});
