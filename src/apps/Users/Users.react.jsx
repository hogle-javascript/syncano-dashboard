import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import Moment from 'moment';
import MUI from 'material-ui';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import ButtonActionMixin from '../../mixins/ButtonActionMixin';
import InstanceTabsMixin from '../../mixins/InstanceTabsMixin';
import DialogsMixin from '../../mixins/DialogsMixin';

import UsersActions from './UsersActions';
import UsersStore from './UsersStore';
import GroupsActions from './GroupsActions';
import GroupsStore from './GroupsStore';

// Components
import Common from '../../common';
import Container from '../../common/Container/Container.react';

// Local components
import UsersList from './UsersList.react';
import GroupsList from './GroupsList.react';
import UserDialog from './UserDialog.react';
import GroupDialog from './GroupDialog.react';

module.exports = React.createClass({

  displayName: 'Users',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(UsersStore, 'users'),
    Reflux.connect(GroupsStore, 'groups'),
    HeaderMixin,
    InstanceTabsMixin,
    DialogsMixin
  ],

  componentWillUpdate(nextProps, nextState) {
    console.info('Users::componentWillUpdate');
    this.hideDialogs(nextState.users.hideDialogs || nextState.groups.hideDialogs);
  },

  componentDidMount() {
    console.info('Users::componentDidMount');
    UsersActions.fetch();
    GroupsActions.fetch();
  },

  handleRemoveGroups() {
    console.info('Users::handleDeleteGroups');
    GroupsActions.removeGroups(GroupsStore.getCheckedItems());
  },

  handleRemoveUsers() {
    console.info('Users::handleRemoveUsers');
    UsersActions.removeUsers(UsersStore.getCheckedItems());
  },

  uncheckAllUsers() {
    console.info('Users::uncheckAllUsers');
    UsersActions.uncheckAll();
  },

  uncheckAllGroups() {
    console.info('Users::uncheckAllGroups');
    GroupsActions.uncheckAll();
  },

  selectAllUsers() {
    console.info('Users::selectAllUsers');
    UsersActions.selectAll();
  },

  selectAllGroups() {
    console.info('Users::selectAllGroups');
    GroupsActions.selectAll();
  },

  checkUser(id, state) {
    console.info('User::checkUser');
    UsersActions.checkItem(id, state);
  },

  checkGroup(id, state) {
    console.info('User::checkGroup');
    UsersActions.uncheckAll();
    GroupsActions.checkItem(id, state);
  },

  showUserDialog(group) {
    UsersActions.showDialog(undefined, group);
  },

  showUserEditDialog() {
    UsersActions.showDialog(UsersStore.getCheckedItem());
  },

  showGroupDialog() {
    GroupsActions.showDialog();
  },

  showGroupEditDialog(group) {
    GroupsActions.showDialog(group || GroupsStore.getCheckedItem());
  },

  showGroupDeleteDialog(group) {
    group.checked = true;
    this.showDialog('removeGroupDialog');
  },

  handleGroupClick(group) {
    GroupsActions.setActiveGroup(group);
  },

  handleCancelGroupsDialog() {
    this.uncheckAllGroups();
    this.refs.removeGroupDialog.dismiss();
  },

  initDialogs() {
    let checkedUsers  = UsersStore.getCheckedItems();

    return [
      // Groups
      {
        dialog: MUI.Dialog,
        params: {
          ref:    'removeGroupDialog',
          title:  'Delete Group',
          actions: [
            {
              text    : 'Cancel',
              onClick : this.handleCancelGroupsDialog
            },
            {
              text    : 'Yes, I\'m sure',
              onClick : this.handleRemoveGroups
            }
          ],
          modal: true,
          children: [
            'Do you really want to delete this Group?',
            <Common.Loading
              type     = 'linear'
              position = 'bottom'
              show     = {this.state.groups.isLoading} />
          ]
        }
      },

      // Users
      {
        dialog: MUI.Dialog,
        params: {
          ref:    'removeUserDialog',
          title:  'Delete User',
          actions: [
            {text: 'Cancel', onClick: this.handleCancel},
            {text: 'Yes, I\'m sure', onClick: this.handleRemoveUsers}
          ],
          modal: true,
          children: [
            'Do you really want to delete ' + this.getDialogListLength(checkedUsers) + ' User(s)?',
            this.getDialogList(checkedUsers, 'username'),
            <Common.Loading
              type     = 'linear'
              position = 'bottom'
              show     = {this.state.users.isLoading} />
          ]
        }
      }
    ]
  },

  render() {
    let checkedUsers      = UsersStore.getNumberOfChecked(),
        isAnyUserSelected = checkedUsers >= 1 && checkedUsers < (this.state.users.items.length),
        activeGroup       = GroupsStore.getActiveGroup();


    return (
      <Container>
        {this.getDialogs()}
        <UserDialog />
        <GroupDialog />

        <Common.Show if={checkedUsers > 0}>
          <Common.Fab position="top">

            <Common.Fab.Item
              label         = {isAnyUserSelected ? "Click here to select all" : "Click here to unselect all"}
              mini          = {true}
              onClick       = {isAnyUserSelected ? this.selectAllUsers : this.uncheckAllUsers}
              iconClassName = {isAnyUserSelected ? "synicon-checkbox-multiple-marked-outline" : "synicon-checkbox-multiple-blank-outline"}
            />

            <Common.Fab.Item
              label         = "Click here to delete Users"
              mini          = {true}
              onClick       = {this.showDialog.bind(null, 'removeUserDialog')}
              iconClassName = "synicon-delete"
            />

            <Common.Fab.Item
              label         = "Click here to edit User"
              mini          = {true}
              disabled      = {checkedUsers > 1}
              onClick       = {this.showUserEditDialog}
              iconClassName = "synicon-pencil"
            />

          </Common.Fab>
        </Common.Show>

        <Common.Fab>

          <Common.Fab.Item
            label         = "Click here to create User account"
            onClick       = {this.showUserDialog}
            iconClassName = "synicon-account-plus"
          />

          <Common.Fab.Item
            label         = "Click here to create Group"
            onClick       = {this.showGroupDialog}
            iconClassName = "synicon-account-multiple-plus"
          />

        </Common.Fab>

        <Common.Lists.Container className="row">

          <div className="col-lg-8">
            <GroupsList
              activeGroup          = {activeGroup}
              handleItemClick      = {this.handleGroupClick}
              handleGroupAddUser   = {this.showUserDialog}
              handleGroupEdit      = {this.showGroupEditDialog}
              handleGroupDelete    = {this.showGroupDeleteDialog}
              name                 = "Groups"
              checkItem            = {this.checkGroup}
              isLoading            = {this.state.groups.isLoading}
              items                = {this.state.groups.items}
              emptyItemHandleClick = {this.showGroupDialog}
              emptyItemContent     = "Create a Group"
            />
          </div>

          <div className="col-lg-27">
            <UsersList
              name                 = "Users"
              checkItem            = {this.checkUser}
              isLoading            = {this.state.users.isLoading}
              items                = {this.state.users.items}
              emptyItemHandleClick = {this.showUserDialog}
              emptyItemContent     = "Create a User"
            />
          </div>

        </Common.Lists.Container>

      </Container>
    );
  }

});
