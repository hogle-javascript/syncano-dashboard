import React from 'react';
import Reflux from 'reflux';
import {State, Navigation} from 'react-router';

// Utils
import {InstanceTabsMixin} from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

import Actions from './UsersActions';
import Store from './UsersStore';
import {GroupsActions, GroupsStore, GroupsList, GroupDialog} from './../Groups';

// Components
import {Container, Socket} from 'syncano-components';
import {InnerToolbar, Lists} from '../../common';

// Local components
import UsersList from './UsersList';
import UserDialog from './UserDialog';

export default React.createClass({

  displayName: 'Users',

  mixins: [
    State,
    Navigation,

    Reflux.connect(Store, 'users'),
    Reflux.connect(GroupsStore, 'groups'),
    InstanceTabsMixin,
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
      <div>
        <UserDialog />
        <GroupDialog />

        <InnerToolbar title="Users & Groups">
          <Socket.Users
            iconClassName="synicon-socket-user"
            onTouchTap={this.showGroupDialog}/>
          <Socket.User
            tooltipPosition="bottom-left"
            onTouchTap={this.showUserDialog.bind(null, null)}/>
        </InnerToolbar>

        <Container>
          <Lists.Container className="row">
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
          </Lists.Container>
        </Container>
      </div>
    );
  }
});
