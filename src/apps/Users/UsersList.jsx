import React from 'react';
import Router from 'react-router';

import Actions from './UsersActions';
import Store from './UsersStore';

// Utils
import {DialogsMixin} from '../../mixins';

// Components
import ListItem from './UsersListItem';
import {ColumnList} from 'syncano-components';
import {Dialog, Lists} from '../../common';

const Column = ColumnList.Column;

export default React.createClass({
  displayName: 'UsersList',

  mixins: [
    Router.State,
    Router.Navigation,
    DialogsMixin
  ],

  componentWillUpdate(nextProps) {
    console.info('Users::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
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
        key={`users-list-item-${item.id}`}
        onIconClick={Actions.checkItem}
        item={item}
        showDeleteDialog={() => this.showDialog('removeUserDialog', item)} />
    );
  },

  render() {
    const checkedItems = Store.getNumberOfChecked();

    return (
      <Lists.Container className="users-list">
        {this.getDialogs()}
        <ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON">
            Users
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="DESC">Groups</Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-xs-4">
            User info
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Updated</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Created</Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={checkedItems}
              handleSelectAll={Actions.selectAll}
              handleUnselectAll={Actions.uncheckAll}>
              <Lists.MenuItem onTouchTap={() => this.showDialog('removeUserDialog')} />
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...this.props}
          emptyItemContent="Add a User"
          emptyItemHandleClick={Actions.showDialog}
          key="users-list"
          renderItem={this.renderItem}/>
      </Lists.Container>
    );
  }
});
