var React               = require('react');

//var ViewActions         = require('../actions/ViewActions');

var Dropdown            = require('./Dropdown/Dropdown.react');
var DropdownWithButtons = require('./Dropdown/DropdownWithButtons.react');

module.exports = React.createClass({

  displayName: 'ContentHeader',

  getInitialState: function () {
      return {
          headerNameWidth: 11,  
      };
  },

  toggleDropdownMenu: function() {
    ViewActions.showDropdown(this.props.list.uuid);
  },

  componentDidMount: function () {
    this.setState({
      headerNameWidth: this.props.initialHeaderWidth,
    }, function() {
      var updatedHeaderNameWidth = this.state.headerNameWidth;
      this.props.headerColumns.forEach(function(column) {
        updatedHeaderNameWidth -= column.width;
      });
      this.setState({
        headerNameWidth: updatedHeaderNameWidth,
      }, function() {
        this.refs.title.getDOMNode().style.flex = this.state.headerNameWidth;
      });
    });
  },

  render: function() {
    var dropdownVisible = this.props.dropdown === this.props.list.uuid;
    var dropdown;
    var columns = this.props.headerColumns.map(function(column) {
      return <div className={column.className} ref={column.ref}>{column.text}</div>
    });
    return (
      <div className="list-header">
        {columns}
      </div>
    )
  }

});