import React from 'react';
import {State} from 'react-router';

// Stores and Actions
import Actions from './DevicesActions';
// import Store from './DevicesStore';

// Components
import Common from '../../common';
import MenuItem from '../../../node_modules/syncano-material-ui/lib/menus/menu-item';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'SchedulesListItem',

  mixins: [
    State
  ],

  render() {
    let item = this.props.item;
    let user = item.user_id ? item.user_id : 'no user';
    let registrationDate = item.created_at;

    return (
      <Common.ColumnList.Item key={item.device_id}>
        <Column.CheckIcon
          id={item.device_id.toString()}
          icon={this.props.icon}
          background={Common.Color.getColorByName('blue')}
          handleIconClick={this.props.onIconClick}
          className="col-xs-14">
          <Common.ColumnList.Link
            name={item.label}
            addBaseUrl={false}
            link={item.device_id}
            snackbar="Device ID copied to the clipboard"
            tooltip="Copy device ID"/>
        </Column.CheckIcon>
        <Column.Desc className="col-xs-13">
          {user}
        </Column.Desc>
        <Column.Desc>
          {item.is_active.toString()}
        </Column.Desc>
        <Column.Date
          date={registrationDate}/>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={Actions.showDialog.bind(null, item)}
            primaryText="Edit a Device"/>
          <MenuItem
            className="dropdown-item-delete"
            onTouchTap={this.props.showDeleteDialog}
            primaryText="Delete a Device"/>
        </Column.Menu>
      </Common.ColumnList.Item>
    );
  }
});

