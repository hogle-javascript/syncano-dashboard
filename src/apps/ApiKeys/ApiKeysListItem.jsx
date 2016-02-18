import React from 'react';

import {SnackbarNotificationMixin} from '../../mixins/';

import Actions from './ApiKeysActions';

import {MenuItem} from 'syncano-material-ui';
import {Clipboard, ColumnList, Color} from 'syncano-components';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'ApiKeysListItem',

  mixins: [SnackbarNotificationMixin],

  render() {
    const {item, showResetDialog, showDeleteDialog, onIconClick} = this.props;

    return (
      <ColumnList.Item
        checked={item.checked}
        key={item.id}>
        <Column.CheckIcon
          id={item.id.toString()}
          icon='key'
          background={Color.getColorByName('blue', 'xlight')}
          checked={item.checked}
          handleIconClick={onIconClick}
          primaryText={item.description}
          secondaryText={
            <Clipboard
              text={item.api_key}
              onCopy={() => this.setSnackbarNotification({
                message: 'API key copied to the clipboard'
              })}
              tooltip="Copy API key"
              type="link" />
          }/>
        <Column.ID className="col-flex-1">{item.id}</Column.ID>
        <Column.Text className="col-flex-1">
          {item.ignore_acl ? <div>Ignore ACL</div> : null}
          {item.allow_user_create ? <div>Allow user creation</div> : null}
          {item.allow_anonymous_read ? <div>Allow anonymous read</div> : null}
        </Column.Text>
        <Column.Date date={item.created_at}/>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={() => Actions.showDialog(item)}
            primaryText="Edit an API Key" />
          <MenuItem
            onTouchTap={showResetDialog}
            className="dropdown-item-reset-apikey"
            primaryText="Reset an API Key" />
          <MenuItem
            onTouchTap={showDeleteDialog}
            className="dropdown-item-delete-apikey"
            primaryText="Delete an API Key" />
        </Column.Menu>
      </ColumnList.Item>
    );
  }
});

