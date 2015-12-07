import React from 'react';
import Router from 'react-router';

import Actions from './AdminsActions';
import Store from './AdminsStore';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import Mixins from '../../mixins';

// Components
import ListItem from './AdminsListItem';
import {IconMenu} from 'syncano-material-ui';
import MenuItem from 'syncano-material-ui/lib/menus/menu-item';
import Common from '../../common';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'AdminsList',

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
    console.info('Admins::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  handleDeleteAdmin() {
    console.info('Admins::handleDelete');
    Actions.removeAdmins(Store.getCheckedItems());
  },

  handleItemIconClick(id, state) {
    this.props.checkItem(id, state);
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
            {text: 'Cancel', onClick: this.handleCancel.bind(null, 'deleteAdminDialog')},
            {text: 'Confirm', onClick: this.handleDeleteAdmin}
          ],
          modal: true,
          avoidResetState: true,
          children: [
            'Do you really want to delete ' + this.getDialogListLength(checkedAdmins) + ' Administrator(s)?',
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
            <IconMenu iconButtonElement={this.renderListIconMenuButton()}>
              <MenuItem
                primaryText="Delete Admin(s)"
                disabled={!checkedItems}
                onTouchTap={this.showDialog.bind(null, 'removeWebhookDialog')}/>
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

