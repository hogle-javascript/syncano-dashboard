let React = require('react');
//let ViewActions = require('../actions/ViewActions');

let Dropdown = require('../Dropdown/Dropdown.react');
let TableHeaderData = require('./TableHeaderData.react');


module.exports = React.createClass({

  displayName: 'TableHeader',

  toggleDropdownMenu: function() {
    ViewActions.showDropdown("dataObjectBrowserOptions");
  },

  handleDropdownMenuItemClick: function(columnName) {
    ViewActions.toggleDataBrowserColumn(columnName);
  },

  render: function() {
    let columns = this.props.columns.filter(function(column, i) {
      return column.selected;
    }.bind(this)).map(function(column, i) {
      let data = "displayName" in column ? column.displayName : column.name;
      return <TableHeaderData {...this.props} key={i} data={data} column={column}/>;
    }.bind(this));
    let dropdown = this.props.dropdown;
    let dropdownVisible = this.props.dropdown === "dataObjectBrowserOptions";
    let optionsColumn = this.props.readOnly ? null : (
      <TableHeaderData {...this.props} key="options" column={{"name":"options", "type":"options"}}>
        <Dropdown actions={this.props.columns} visible={dropdownVisible} toggleDropdownMenu={this.toggleDropdownMenu}
                  handleClick={this.handleDropdownMenuItemClick}/>
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