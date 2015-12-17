import React from 'react';
import Router from 'react-router';

import Actions from './AdminsActions';
import Store from './AdminsStore';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import Mixins from '../../mixins';

// Components
import {FlatButton} from 'syncano-material-ui';
import ListItem from './AdminsListItem';
import Common from '../../common';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'AdminsList',

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
    console.info('Admins::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  handleDeleteAdmin() {
    console.info('Admins::handleDelete');
    Actions.removeAdmins(Store.getCheckedItems());
  },

  handleItemIconClick(id, state) {
    Actions.checkItem(id, state);
  },

  initDialogs() {
    let checkedAdmins = Store.getCheckedItems();

    return [
      {
        dialog: Common.Dialog,
        params: {
          key: 'deleteAdminDialog',
          ref: 'deleteAdminDialog',
          title: 'Remove an Administrator',
          actions: [
            <FlatButton
              label="Cancel"
              secondary={true}
              onTouchTap={this.handleCancel.bind(null, 'deleteAdminDialog')}/>,
            <FlatButton
              label="Confirm"
              primary={true}
              keyboardFocused={true}
              onTouchTap={this.handleDeleteAdmin}/>
          ],
          modal: true,
          avoidResetState: true,
          children: [
            `Do you really want to delete ${Store.getDeleteItemsPhrase('Administrator')}?`,
            this.getDialogList(checkedAdmins, 'email'),
            <Common.Loading
              type="linear"
              position="bottom"
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
        showDeleteDialog={this.showMenuDialog.bind(null, item.email, Actions.removeAdmins.bind(null, [item]))}/>
    );
  },

  render() {
    let checkedItems = Store.getNumberOfChecked();

    return (
      <Common.Lists.Container className="admins-list">
        {this.getDialogs()}
        <Column.MenuDialog ref="menuDialog"/>
        <Common.ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON"
            className="col-xs-25 col-md-20">
            {this.props.name}
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="DESC">Role</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Created</Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Common.Lists.Menu
              checkedItemsCount={checkedItems}
              actions={Actions}>
              <Common.Lists.MenuItem
                singleItemText="Delete an Admin"
                multipleItemsText="Delete Admins"
                onTouchTap={this.showDialog.bind(null, 'deleteAdminDialog')}/>
            </Common.Lists.Menu>
          </Column.ColumnHeader>
        </Common.ColumnList.Header>
        <Common.Lists.List
          {...this.props}
          renderItem={this.renderItem}/>
      </Common.Lists.Container>
    );
  }
});

