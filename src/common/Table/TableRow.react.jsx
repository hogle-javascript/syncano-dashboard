import React from 'react';
import Moment from 'moment';

import Dropdown from '../Dropdown/Dropdown.react';
import TableData from './TableData.react';

export default React.createClass({

  displayName: 'TableRow',

  toggleDropdownMenu: function() {
    ViewActions.showDropdown(this.props.item.uuid);
  },

  handleDropdownMenuItemClick: function(action) {
    if (action === "delete") {
      ViewActions.showModalConfirmDeleteResource(this.props.item);
    } else if (action === "edit") {
      ViewActions.showModalUpdateResource(this.props.item);
    }
  },

  render: function() {
    var dropdown = this.props.dropdown;
    var dropdownVisible = this.props.dropdown === this.props.item.uuid;
    var optionsColumn = null;
    var columns = this.props.columns.filter(function(column, i) {
      return column.selected;
    }.bind(this)).map(function(column, i) {
      var data = this.props.item[column.name];
      if (column.name === "created_at" || column.name === "updated_at") {
        data = Moment(this.props.item[column.name]).format('DD-MM-YYYY, h:mm:ss a');
      }
      if (column.type === "currency") {
        data = parseFloat(Math.round(this.props.item[column.name] * 100) / 100).toFixed(2);
      }
      if (column.type === "datetime") {
        data = Moment(this.props.item[column.name].value).format('DD-MM-YYYY, h:mm:ss a');
      }
      if (column.type === "boolean") {
        data = this.props.item[column.name].toString();
      }
      return <TableData
               {...this.props}
               key={i} data={data}
               column={column}/>
    }.bind(this));

    if (!this.props.readOnly) {
      var actions = ConfigStore.getConfig()[this.props.item.type].actions;
      optionsColumn = (
        <TableData
          {...this.props}
          key="options"
          column={{"name":"options", "type":"options"}}>
          <Dropdown
            actions            = {actions}
            visible            = {dropdownVisible}
            toggleDropdownMenu = {this.toggleDropdownMenu}
            handleClick        = {this.handleDropdownMenuItemClick}/>
        </TableData>);
    }
    return (
      <div className="table-row">
        {columns}
        {optionsColumn}
      </div>
    );
  }
});