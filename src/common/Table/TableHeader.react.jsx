var React       = require('react');
//var ViewActions = require('../actions/ViewActions');

var Dropdown    = require('../Dropdown/Dropdown.react');
var TableHeaderData   = require('./TableHeaderData.react');


module.exports = React.createClass({

  displayName: 'TableHeader',

  toggleDropdownMenu: function() {
    ViewActions.showDropdown("dataObjectBrowserOptions");
  },

  handleDropdownMenuItemClick: function(columnName) {
    ViewActions.toggleDataBrowserColumn(columnName);
  },

  render: function() {
    var columns = this.props.columns.filter(function(column, i) {
      return column.selected;
    }.bind(this)).map(function(column, i){
      var data = "displayName" in column ? column.displayName : column.name;
      return <TableHeaderData {...this.props} key={i} data={data} column={column} />;
    }.bind(this));
    var dropdown = this.props.dropdown;
    var dropdownVisible = this.props.dropdown === "dataObjectBrowserOptions";
    var optionsColumn = this.props.readOnly ? null : (
      <TableHeaderData {...this.props} key="options" column={{"name":"options", "type":"options"}}>
        <Dropdown actions={this.props.columns} visible={dropdownVisible} toggleDropdownMenu={this.toggleDropdownMenu} handleClick={this.handleDropdownMenuItemClick} />
      </TableHeaderData>);
    return (
      <div className="table-header">
        <div className="table-row">
          {columns}
          {optionsColumn}
        </div>
      </div>
    );
  }
});