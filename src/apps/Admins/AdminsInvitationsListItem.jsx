import React from 'react';

import Mixins from '../../mixins';

import Common from '../../common';
import MenuItem from 'syncano-material-ui/lib/menus/menu-item';

export default React.createClass({

  displayName: 'AdminsInvitationsListItem',

  mixins: [
    Mixins.Dialogs
  ],

  render() {
    let item = this.props.item;

    return (
      <Common.ColumnList.Item
        checked={item.checked}
        key={item.id}>
        <Common.ColumnList.Column.CheckIcon
          className="col-xs-25 col-md-20"
          id={item.id.toString()}
          icon='account'
          background={Common.Color.getColorByName('blue', 'xlight')}
          checked={item.checked}
          handleIconClick={this.props.onIconClick}>
          <div>{item.email}</div>
        </Common.ColumnList.Column.CheckIcon>
        <Common.ColumnList.Column.Desc>{item.role}</Common.ColumnList.Column.Desc>
        <Common.ColumnList.Column.Date date={item.created_at}/>
        <Common.ColumnList.Column.Menu>
          <MenuItem
            onTouchTap={this.props.showResendDialog}
            className="dropdown-item-resend-invitation"
            primaryText="Resend" />
          <MenuItem
            onTouchTap={this.props.showDeleteDialog}
            className="dropdown-item-remove-invitation"
            primaryText="Delete" />
        </Common.ColumnList.Column.Menu>
      </Common.ColumnList.Item>
    );
  }
});
