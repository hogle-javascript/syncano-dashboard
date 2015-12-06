import React from 'react';
import _ from 'lodash';

import Mixins from '../../mixins/';

// Stores and Actions
import AdminsInvitationsActions from './AdminsInvitationsActions';
import AdminsActions from './AdminsActions';
import SessionStore from '../Session/SessionStore';

import Common from '../../common';
import MenuItem from 'syncano-material-ui/lib/menus/menu-item';

export default React.createClass({

  displayName: 'AdminstListItem',

  mixins: [
    Mixins.Dialogs
  ],

  getStyles() {
    return {
      ownerLabel: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: 14,
        marginTop: 4
      }
    };
  },

  getDropdownMenu(item) {
    let isInvitation = _.has(item, 'key');

    if (isInvitation) {
      return this.getAdminInvitationDropdown(item);
    }

    return this.getAdminDropdown(item);
  },

  getAdminInvitationDropdown(item) {
    let removeInvitation = AdminsInvitationsActions.removeInvitation.bind(null, [item]);
    let resendInvitation = AdminsInvitationsActions.resendInvitation.bind(null, [item]);

    return (
      <Common.ColumnList.Column.Menu>
        <MenuItem
          onTouchTap={this.showMenuDialog.bind(null, item.email, removeInvitation)}
          className="dropdown-item-remove-invitation"
          primaryText="Remove Invitation" />
        <MenuItem
          onTouchTap={this.showMenuDialog.bind(null, item.email, resendInvitation)}
          className="dropdown-item-resend-invitation"
          primaryText="Resend Invitation" />
      </Common.ColumnList.Column.Menu>
    );
  },

  getAdminDropdown(item) {
    let removeAdmin = AdminsActions.removeAdmins.bind(null, [item]);

    return (
      <Common.ColumnList.Column.Menu>
        <MenuItem
          className="dropdown-item-delete-admin"
          onTouchTap={this.showMenuDialog.bind(null, item.email, removeAdmin)}
          primaryText="Delete Admin" />
        <MenuItem
          className="dropdown-item-edit-admin"
          onTouchTap={AdminsActions.showDialog.bind(null, item)}
          primaryText="Edit Admin" />
      </Common.ColumnList.Column.Menu>
    );
  },

  render() {
    let item = this.props.item;
    let styles = this.getStyles();
    let isOwner = item.id === SessionStore.getInstance().owner.id;

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
          handleIconClick={this.props.onIconClick}
          checkable={!isOwner}>
          <div>
            <div>{item.email}</div>
            <div style={styles.ownerLabel}>
              {isOwner ? 'Owner (cannot be edited)' : null}
            </div>
          </div>
        </Common.ColumnList.Column.CheckIcon>
        <Common.ColumnList.Column.Desc>{item.role}</Common.ColumnList.Column.Desc>
        <Common.ColumnList.Column.Date date={item.created_at}/>
        {this.getDropdownMenu(item)}
      </Common.ColumnList.Item>
    );
  }
});
