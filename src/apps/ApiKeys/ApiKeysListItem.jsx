import React from 'react';

import Mixins from '../../mixins/';

// Components
import Common from '../../common';
import MenuItem from 'syncano-material-ui/lib/menus/menu-item';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'ApiKeysListItem',

  mixins: [
    Mixins.Dialogs
  ],

  render() {
    let item = this.props.item;
    let ignore_acl = null;
    let allow_user_create = null;

    if (item.ignore_acl) {
      ignore_acl = <div>Ignore ACL</div>;
    }
    if (item.allow_user_create) {
      allow_user_create = <div>Allow user creation</div>;
    }

    return (
      <Common.ColumnList.Item
        checked={item.checked}
        key={item.id}>
        <Column.CheckIcon
          id={item.id.toString()}
          icon='key'
          background={Common.Color.getColorByName('blue', 'xlight')}
          checked={item.checked}
          handleIconClick={this.props.onIconClick}>
          {item.description}
        </Column.CheckIcon>
        <Column.ID>{item.id}</Column.ID>
        <Column.Key color="black">{item.api_key}</Column.Key>
        <Column.Text>
          {ignore_acl}
          {allow_user_create}
        </Column.Text>
        <Column.Date date={item.created_at}/>
        <Column.Menu>
          <MenuItem
            onTouchTap={this.props.showDeleteDialog}
            className="dropdown-item-delete-apikey"
            primaryText="Delete an API Key" />
          <MenuItem
            onTouchTap={this.props.showResetDialog}
            className="dropdown-item-reset-apikey"
            primaryText="Reset an API Key" />
        </Column.Menu>
      </Common.ColumnList.Item>
    );
  }
});

