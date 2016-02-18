import React from 'react';

import Actions from './ChannelsActions';

import {SnackbarNotificationMixin} from '../../mixins';

import {MenuItem} from 'syncano-material-ui';
import {Color, ColumnList, Clipboard} from 'syncano-components';

const Column = ColumnList.Column;

export default React.createClass({
  displayName: 'ChannelsListItem',

  mixins: [SnackbarNotificationMixin],

  render() {
    const {item, onIconClick, showDeleteDialog} = this.props;

    return (
      <ColumnList.Item
        checked={item.checked}
        key={item.name}>
        <Column.CheckIcon
          className="col-xs-12"
          id={item.name}
          icon={'bullhorn'}
          keyName="name"
          background={Color.getColorByName('blue', 'xlight')}
          checked={item.checked}
          handleIconClick={onIconClick}
          primaryText={item.name}
          secondaryText={
            <Clipboard
              copyText={item.links.poll}
              onCopy={() => this.setSnackbarNotification({
                message: 'Channel Socket url copied!'
              })}
              tooltip="Copy Channel Socket url"
              type="link" />
          }/>
        <Column.Desc className="col-flex-1">
          <div>
            <div>group: {item.group_permissions}</div>
            <div>other: {item.other_permissions}</div>
          </div>
        </Column.Desc>
        <Column.Desc className="col-flex-1">
          {item.type}
        </Column.Desc>
        <Column.Desc className="col-flex-1">
          {item.custom_publish ? 'Yes' : 'No'}
        </Column.Desc>
        <Column.Desc className="col-flex-1"/>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={() => Actions.showDialog(item)}
            primaryText="Edit a Channel Socket"/>
          <MenuItem
            className="dropdown-item-delete"
            onTouchTap={showDeleteDialog}
            primaryText="Delete a Channel Socket"/>
        </Column.Menu>
      </ColumnList.Item>
    );
  }
});
