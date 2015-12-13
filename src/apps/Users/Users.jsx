import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

import Actions from './UsersActions';
import Store from './UsersStore';
import {GroupsActions, GroupsStore, GroupsList, GroupDialog} from './../Groups';

// Components
import Common from '../../common';
import Container from '../../common/Container/Container';

// Local components
import UsersList from './UsersList';
import UserDialog from './UserDialog';

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

  showUserDialog(group) {
    /* eslint-disable */
    Actions.showDialog(undefined, group);
    /* eslint-enable */
  },

  showGroupDialog() {
    GroupsActions.showDialog();
  },

  render() {
    return (
      <Container>
        <UserDialog />
        <GroupDialog />

        <Common.InnerToolbar title="Users & Groups">
          <Common.Socket.Users
            iconClassName="synicon-socket-user"
            onTouchTap={this.showGroupDialog}/>
          <Common.Socket.User
            tooltipPosition="bottom-left"
            onTouchTap={this.showUserDialog.bind(null, null)}/>
        </Common.InnerToolbar>

        <Common.Lists.Container className="row">
          <div className="col-lg-8">
            <GroupsList
              name="Groups"
              isLoading={this.state.groups.isLoading}
              items={this.state.groups.items}
              hideDialogs={this.state.groups.hideDialogs}
              emptyItemHandleClick={this.showGroupDialog}
              emptyItemContent="Create a Group"/>
          </div>
          <div className="col-lg-27">
            <UsersList
              name="Users"
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
