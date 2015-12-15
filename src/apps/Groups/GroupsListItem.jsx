import React from 'react';

import {Dialogs} from '../../mixins';

import Actions from './GroupsActions';
import UserActions from '../Users/UsersActions';

import MenuItem from 'syncano-material-ui/lib/menus/menu-item';
import Common from '../../common';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'GroupsListItem',

  mixins: [
    Dialogs
  ],

  showUserDialog(group) {
    /* eslint-disable */
    UserActions.showDialog(undefined, group);
    /* eslint-enable */
  },

  render() {
    let item = this.props.item;

    return (
      <Common.ColumnList.Item
        checked={item.checked}
        key={item.id}>
        <Column.CheckIcon
          id={item.id.toString()}
          icon='arrow-up-bold'
          background={Common.Color.getColorByName('blue', 'xlight')}
          checked={item.checked}
          handleIconClick={this.props.onIconClick}
          className="col-flex-1">
          {item.label}
        </Column.CheckIcon>
        <Column.ID className="col-sm-4">{item.id}</Column.ID>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-add"
            onTouchTap={this.showUserDialog.bind(null, item)}
            primaryText="Add a User" />
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={Actions.showDialog.bind(null, item)}
            primaryText="Edit a Group" />
          <MenuItem
            className="dropdown-item-delete"
            onTouchTap={this.props.showDeleteDialog}
            primaryText="Delete a Group" />
        </Column.Menu>
      </Common.ColumnList.Item>
    );
  }
});
