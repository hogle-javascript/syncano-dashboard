import React from 'react';

import {DialogsMixin} from '../../mixins/';

// Stores and Actions
import Actions from './AdminsActions';
import SessionStore from '../Session/SessionStore';

import Common from '../../common';
import MenuItem from 'syncano-material-ui/lib/menus/menu-item';

export default React.createClass({

  displayName: 'AdminstListItem',

  mixins: [
    DialogsMixin
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

  renderEditAdmin(item, isOwner) {
    if (isOwner) {
      return true;
    }

    return (
      <MenuItem
        className="dropdown-item-edit-admin"
        onTouchTap={Actions.showDialog.bind(null, item)}
        primaryText="Edit an Admin" />
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
            <Common.Truncate text={item.email}/>
            <div style={styles.ownerLabel}>
              {isOwner ? 'Owner (cannot be edited)' : null}
            </div>
          </div>
        </Common.ColumnList.Column.CheckIcon>
        <Common.ColumnList.Column.Desc>{item.role}</Common.ColumnList.Column.Desc>
        <Common.ColumnList.Column.Date date={item.created_at}/>
        <Common.ColumnList.Column.Menu>
          {this.renderEditAdmin(item, isOwner)}
          <MenuItem
            className="dropdown-item-delete-admin"
            onTouchTap={this.props.showDeleteDialog}
            primaryText="Delete an Admin" />
        </Common.ColumnList.Column.Menu>
      </Common.ColumnList.Item>
    );
  }
});
