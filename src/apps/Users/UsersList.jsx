import React from 'react';
import Router from 'react-router';

import Actions from './UsersActions';
import Store from './UsersStore';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import Mixins from '../../mixins';

// Components
import ListItem from './UsersListItem';
import {IconMenu} from 'syncano-material-ui';
import MenuItem from 'syncano-material-ui/lib/menus/menu-item';
import Common from '../../common';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'UsersList',

  mixins: [
    Router.State,
    Router.Navigation,
    HeaderMixin,
    Mixins.Dialog,
    Mixins.Dialogs,
    Mixins.List
  ],

  getInitialState() {
    return {};
  },

  componentWillUpdate(nextProps) {
    console.info('Users::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  handleRemoveUsers() {
    console.info('Users::handleRemoveUsers');
    Actions.removeUsers(Store.getCheckedItems());
  },

  handleItemIconClick(id, state) {
    this.props.checkItem(id, state);
  },

  uncheckAllUsers() {
    console.info('Users::uncheckAllUsers');
    Actions.uncheckAll();
  },

  initDialogs() {
    let checkedUsers = Store.getCheckedItems();

    return [
      {
        dialog: Common.Dialog,
        params: {
          key: 'removeUserDialog',
          ref: 'removeUserDialog',
          title: 'Delete a User',
          actions: [
            {text: 'Cancel', onClick: this.handleCancel.bind(null, 'removeUserDialog')},
            {text: 'Confirm', onClick: this.handleRemoveUsers}
          ],
          modal: true,
          children: [
            'Do you really want to delete ' + this.getDialogListLength(checkedUsers) + ' User(s)?',
            this.getDialogList(checkedUsers, 'username'),
            <Common.Loading
              type='linear'
              position='bottom'
              show={this.props.isLoading}/>
          ]
        }
      }
    ];
  },

  renderItem(item) {
    return (
      <ListItem
        onIconClick={this.handleItemIconClick}
        item={item}
        showDeleteDialog={this.showMenuDialog.bind(null, item.username, Actions.removeUsers.bind(null, [item]))}/>
    );
  },

  render() {
    let checkedItems = Store.getNumberOfChecked();

    return (
      <Common.Lists.Container className="users-list">
        {this.getDialogs()}
        <Column.MenuDialog ref="menuDialog"/>
        <Common.ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON">
            {this.props.name}
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="ID">ID</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DESC">Groups</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Updated</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Created</Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <IconMenu iconButtonElement={this.renderListIconMenuButton()}>
              <MenuItem
                primaryText="Delete User(s)"
                disabled={!checkedItems}
                onTouchTap={this.showDialog.bind(null, 'removeUserDialog')}/>
              <MenuItem
                primaryText="Unselect All"
                onTouchTap={Actions.uncheckAll}/>
              <MenuItem
                primaryText="Select All"
                onTouchTap={Actions.selectAll}/>
            </IconMenu>
          </Column.ColumnHeader>
        </Common.ColumnList.Header>
        <Common.Lists.List>
          <Common.Loading show={this.props.isLoading}>
            {this.renderList()}
          </Common.Loading>
        </Common.Lists.List>
      </Common.Lists.Container>
    );
  }
});

