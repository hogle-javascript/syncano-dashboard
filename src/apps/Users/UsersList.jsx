import React from 'react';
import Router from 'react-router';

import Actions from './UsersActions';
import Store from './UsersStore';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import Mixins from '../../mixins';

// Components
import ListItem from './UsersListItem';
import {ColumnList, Dialog, Lists} from '../../common';

let Column = ColumnList.Column;

export default React.createClass({

  displayName: 'UsersList',

  mixins: [
    Router.State,
    Router.Navigation,
    HeaderMixin,
    Mixins.Dialog,
    Mixins.Dialogs
  ],

  getInitialState() {
    return {};
  },

  componentWillUpdate(nextProps) {
    console.info('Users::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  handleItemIconClick(id, state) {
    Actions.checkItem(id, state);
  },

  uncheckAllUsers() {
    console.info('Users::uncheckAllUsers');
    Actions.uncheckAll();
  },

  initDialogs() {
    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'removeUserDialog',
        ref: 'removeUserDialog',
        title: 'Delete a User',
        handleConfirm: Actions.removeUsers,
        isLoading: this.props.isLoading,
        items: Store.getCheckedItems(),
        itemLabelName: 'username',
        groupName: 'User'
      }
    }];
  },

  renderItem(item) {
    return (
      <ListItem
        onIconClick={this.handleItemIconClick}
        item={item}
        showDeleteDialog={this.showDialog.bind(null, 'removeUserDialog', item)}/>
    );
  },

  render() {
    let checkedItems = Store.getNumberOfChecked();

    return (
      <Lists.Container className="users-list">
        {this.getDialogs()}
        <ColumnList.Header>
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
            <Lists.Menu
              checkedItemsCount={checkedItems}
              actions={Actions}>
              <Lists.MenuItem
                singleItemText="Delete an User"
                multipleItemsText="Delete Users"
                onTouchTap={this.showDialog.bind(null, 'removeUserDialog')}/>
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...this.props}
          renderItem={this.renderItem}/>
      </Lists.Container>
    );
  }
});

