import React from 'react';

import {DialogsMixin, SnackbarNotificationMixin} from '../../mixins/';

import Actions from './ApiKeysActions';

import {MenuItem} from 'syncano-material-ui';
import {ColumnList, Color, Truncate} from 'syncano-components';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'ApiKeysListItem',

  mixins: [
    DialogsMixin,
    SnackbarNotificationMixin
  ],

  render() {
    const {item} = this.props;

    return (
      <ColumnList.Item
        checked={item.checked}
        key={item.id}>
        <Column.CheckIcon
          id={item.id.toString()}
          icon='key'
          background={Color.getColorByName('blue', 'xlight')}
          checked={item.checked}
          handleIconClick={this.props.onIconClick}>
          <Truncate text={item.description}/>
        </Column.CheckIcon>
        <Column.ID>{item.id}</Column.ID>
        <Column.Key
          color="black"
          onCopy={() => this.setSnackbarNotification({message: 'API key copied to the clipboard'})}>
          {item.api_key}
        </Column.Key>
        <Column.Text>
          {item.ignore_acl ? <div>Ignore ACL</div> : null}
          {item.allow_user_create ? <div>Allow user creation</div> : null}
          {item.allow_anonymous_read ? <div>Allow anonymous read</div> : null}
        </Column.Text>
        <Column.Date date={item.created_at}/>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={Actions.showDialog.bind(null, item)}
            primaryText="Edit an API Key" />
          <MenuItem
            onTouchTap={this.props.showResetDialog}
            className="dropdown-item-reset-apikey"
            primaryText="Reset an API Key" />
          <MenuItem
            onTouchTap={this.props.showDeleteDialog}
            className="dropdown-item-delete-apikey"
            primaryText="Delete an API Key" />
        </Column.Menu>
      </ColumnList.Item>
    );
  }
});

