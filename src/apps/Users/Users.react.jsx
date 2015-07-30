import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import Moment from 'moment';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

import Actions from './UsersActions';
import Store from './UsersStore';
import GroupsActions from './GroupsActions';
import GroupsStore from './GroupsStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';
import Container from '../../common/Container/Container.react';

// Local components
import UsersList from './UsersList.react';
import GroupsList from './GroupsList.react';
import UserDialog from './UserDialog.react';
import GroupDialog from './GroupDialog.react';

export default React.createClass({

  displayName: 'Users',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(Store, 'users'),
    Reflux.connect(GroupsStore, 'groups'),
    Mixins.Dialogs,
    Mixins.InstanceTabs,
    HeaderMixin
  ],

  componentWillUpdate(nextProps, nextState) {
    console.info('Users::componentWillUpdate');
    this.hideDialogs(nextState.users.hideDialogs || nextState.groups.hideDialogs);
  },

  componentDidMount() {
    console.info('Users::componentDidMount');
    Actions.fetch();
    GroupsActions.fetch();
  },

  handleRemoveGroups() {
    console.info('Users::handleDeleteGroups');
    GroupsActions.removeGroups(GroupsStore.getCheckedItems());
  },

  handleRemoveUsers() {
    console.info('Users::handleRemoveUsers');
    Actions.removeUsers(Store.getCheckedItems());
  },

  uncheckAllUsers() {
    console.info('Users::uncheckAllUsers');
    Actions.uncheckAll();
  },

  uncheckAllGroups() {
    console.info('Users::uncheckAllGroups');
    GroupsActions.uncheckAll();
  },

  selectAllUsers() {
    console.info('Users::selectAllUsers');
    Actions.selectAll();
  },

  selectAllGroups() {
    console.info('Users::selectAllGroups');
    GroupsActions.selectAll();
  },

  checkUser(id, state) {
    console.info('User::checkUser');
    Actions.checkItem(id, state);
  },

  checkGroup(id, state) {
    console.info('User::checkGroup');
    Actions.uncheckAll();
    GroupsActions.checkItem(id, state);
  },

  showUserDialog(group) {
    Actions.showDialog(undefined, group);
  },

  showUserEditDialog() {
    Actions.showDialog(Store.getCheckedItem());
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
    let checkedUsers  = Store.getCheckedItems();

    return [
      // Groups
      {
        dialog: Common.Dialog,
        params: {
          ref:    'removeGroupDialog',
          title:  'Delete a Group',
          actions: [
            {
              text    : 'Cancel',
              onClick : this.handleCancelGroupsDialog
            },
            {
              text    : 'Confirm',
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
        dialog: Common.Dialog,
        params: {
          ref:    'removeUserDialog',
          title:  'Delete a User',
          actions: [
            {text: 'Cancel', onClick: this.handleCancel},
            {text: 'Confirm', onClick: this.handleRemoveUsers}
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
    let checkedUsers      = Store.getNumberOfChecked(),
        isAnyUserSelected = checkedUsers >= 1 && checkedUsers < (this.state.users.items.length),
        activeGroup       = GroupsStore.getActiveGroup(),
        markedIcon        = 'synicon-checkbox-multiple-marked-outline',
        blankIcon         = 'synicon-checkbox-multiple-blank-outline';

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
              iconClassName = {isAnyUserSelected ? markedIcon : blankIcon} />
            <Common.Fab.Item
              label         = "Click here to delete Users"
              mini          = {true}
              onClick       = {this.showDialog.bind(null, 'removeUserDialog')}
              iconClassName = "synicon-delete" />
            <Common.Fab.Item
              label         = "Click here to edit a User"
              mini          = {true}
              disabled      = {checkedUsers > 1}
              onClick       = {this.showUserEditDialog}
              iconClassName = "synicon-pencil" />
          </Common.Fab>
        </Common.Show>
        <Common.Fab>
          <Common.Fab.Item
            label         = "Click here to create a User account"
            onClick       = {this.showUserDialog.bind(null, null)}
            iconClassName = "synicon-account-plus" />
          <Common.Fab.Item
            label         = "Click here to create a Group"
            onClick       = {this.showGroupDialog}
            iconClassName = "synicon-account-multiple-plus" />
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
              emptyItemContent     = "Create a Group" />
          </div>
          <div className="col-lg-27">
            <UsersList
              name                 = "Users"
              checkItem            = {this.checkUser}
              isLoading            = {this.state.users.isLoading}
              items                = {this.state.users.items}
              emptyItemHandleClick = {this.showUserDialog}
              emptyItemContent     = "Create a User" />
          </div>
        </Common.Lists.Container>
      </Container>
    );
  }
});
