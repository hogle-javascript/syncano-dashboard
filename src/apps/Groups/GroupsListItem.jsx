import React from 'react';

import {DialogsMixin} from '../../mixins';

import Actions from './GroupsActions';
import UserActions from '../Users/UsersActions';

import {MenuItem} from 'syncano-material-ui';
import {ColumnList, Color, Truncate} from 'syncano-components';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'GroupsListItem',

  mixins: [
    DialogsMixin
  ],

  showUserDialog(group) {
    /* eslint-disable */
    UserActions.showDialog(undefined, group);
    /* eslint-enable */
  },

  render() {
    let item = this.props.item;

    return (
      <ColumnList.Item
        checked={item.checked}
        key={item.id}>
        <Column.CheckIcon
          id={item.id.toString()}
          icon='arrow-up-bold'
          background={Color.getColorByName('blue', 'xlight')}
          checked={item.checked}
          handleIconClick={this.props.onIconClick}
          className="col-flex-1">
          <Truncate text={item.label}/>
        </Column.CheckIcon>
        <Column.ID className="col-sm-4">{item.id}</Column.ID>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-add"
            onTouchTap={this.showUserDialog.bind(null, item)}
            primaryText="Add a User" />
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={() => Actions.showDialog(item)}
            primaryText="Edit a Group" />
          <MenuItem
            className="dropdown-item-delete"
            onTouchTap={this.props.showDeleteDialog}
            primaryText="Delete a Group" />
        </Column.Menu>
      </ColumnList.Item>
    );
  }
});
