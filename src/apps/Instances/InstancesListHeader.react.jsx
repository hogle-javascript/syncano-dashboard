var React = require('react');

var Dropdown = require('../../common/Dropdown/Dropdown.react');


module.exports = React.createClass({

  displayName: 'InstancesListHeader',

  propTypes: {
    list: React.PropTypes.object.isRequired,
    handleHeaderMenuClick: React.PropTypes.func.isRequired,
  },

  handleHeaderMenuClick: function(action) {
    // We need to add here information about list we are sorting/changing/view etc.
    action['list'] = this.props.list.uuid;
    this.props.handleHeaderMenuClick(action);
  },

  render: function () {
    var dropdown;
    // Dropdown has only sense if there is more than one element on the list
    if (this.props.list.data.length > 0) {
      dropdown = <Dropdown icon="more-horiz" actions={this.props.list.actions} handleItemClick={this.handleHeaderMenuClick}/>
    }
    return (
      <div className="list-header">{this.props.list.heading}
        <div className="list-heading-dropdown">
          {dropdown}
        </div>
      </div>
    )
  }

});