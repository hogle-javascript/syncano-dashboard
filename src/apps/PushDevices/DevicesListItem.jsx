import React from 'react';
import {State} from 'react-router';

// Components
import {MenuItem} from 'syncano-material-ui';
import {Color, ColumnList} from 'syncano-components';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'DeviceListItem',

  mixins: [State],

  render() {
    const {item, icon, onIconClick, showEditDialog, showDeleteDialog} = this.props;
    let user = item.user_id ? item.user_id : 'no user';

    return (
      <ColumnList.Item
        key={item.device_id}
        checked={item.checked}>
        <Column.CheckIcon
          id={item.registration_id}
          icon={icon}
          checked={item.checked}
          keyName="registration_id"
          background={Color.getColorByName('blue')}
          handleIconClick={onIconClick}
          primaryText={item.label}>
          <ColumnList.Link
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
          date={item.created_at}/>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={() => showEditDialog(item)}
            primaryText="Edit a Device"/>
          <MenuItem
            className="dropdown-item-delete"
            onTouchTap={showDeleteDialog}
            primaryText="Delete a Device"/>
        </Column.Menu>
      </ColumnList.Item>
    );
  }
});

