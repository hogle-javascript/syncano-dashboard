import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

import Actions from './UsersActions';
import Store from './UsersStore';
import GroupsActions from './GroupsActions';
import GroupsStore from './GroupsStore';

// Components
import Common from '../../common';
import Container from '../../common/Container/Container';

// Local components
import UsersList from './UsersList';
import GroupsList from './GroupsList';
import UserDialog from './UserDialog';
import GroupDialog from './GroupDialog';

export default React.createClass({

  displayName: 'Users',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(Store, 'users'),
    Reflux.connect(GroupsStore, 'groups'),
    Mixins.Dialog,
    Mixins.InstanceTabs,
    HeaderMixin
  ],

  componentDidMount() {
    console.info('Users::componentDidMount');
    Actions.fetch();
    GroupsActions.fetch();
  },

  handleGroupClick(group) {
    GroupsActions.setActiveGroup(group);
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
    /* eslint-disable */
    Actions.showDialog(undefined, group);
    /* eslint-enable */
  },

  showGroupDialog() {
    GroupsActions.showDialog();
  },

  showGroupEditDialog(group) {
    GroupsActions.showDialog(group || GroupsStore.getCheckedItem());
  },

  render() {
    let activeGroup = GroupsStore.getActiveGroup();

    return (
      <Container>
        <UserDialog />
        <GroupDialog />

        <Common.InnerToolbar title="Users & Groups">
          <Common.Socket.Users
            iconClassName="synicon-socket-user"
            onTouchTap={this.showUserDialog.bind(null, null)}/>
          <Common.Socket.User
            tooltipPosition="bottom-left"
            onTouchTap={this.showGroupDialog}/>
        </Common.InnerToolbar>

        <Common.Lists.Container className="row">
          <div className="col-lg-8">
            <GroupsList
              activeGroup={activeGroup}
              handleItemClick={this.handleGroupClick}
              handleGroupAddUser={this.showUserDialog}
              handleGroupEdit={this.showGroupEditDialog}
              handleGroupDelete={this.showGroupDeleteDialog}
              name="Groups"
              checkItem={this.checkGroup}
              isLoading={this.state.groups.isLoading}
              items={this.state.groups.items}
              hideDialogs={this.state.groups.hideDialogs}
              emptyItemHandleClick={this.showGroupDialog}
              emptyItemContent="Create a Group"/>
          </div>
          <div className="col-lg-27">
            <UsersList
              name="Users"
              checkItem={this.checkUser}
              isLoading={this.state.users.isLoading}
              items={this.state.users.items}
              hideDialogs={this.state.users.hideDialogs}
              emptyItemHandleClick={this.showUserDialog}
              emptyItemContent="Create a User"/>
          </div>
        </Common.Lists.Container>
      </Container>
    );
  }
});
