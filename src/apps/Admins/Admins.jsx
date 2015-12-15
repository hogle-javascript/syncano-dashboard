import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import Actions from './AdminsActions';
import Store from './AdminsStore';
import AdminsInvitationsActions from './AdminsInvitationsActions';
import AdminsInvitationsStore from './AdminsInvitationsStore';

// Components
import Common from '../../common';
import Container from '../../common/Container';

// Local components
import AdminsList from './AdminsList';
import AdminsInvitationsList from './AdminsInvitationsList';
import AdminDialog from './AdminDialog';

export default React.createClass({

  displayName: 'Admins',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(Store, 'admins'),
    Reflux.connect(AdminsInvitationsStore, 'invitations'),
    Mixins.Dialogs,
    Mixins.InstanceTabs,
    HeaderMixin
  ],

  componentDidMount() {
    console.info('Admins::componentDidMount');
    Actions.fetch();
  },

  checkAdminItem(id, state) {
    AdminsInvitationsActions.uncheckAll();
    Actions.checkItem(id, state);
  },

  checkInvitationItem(id, state) {
    Actions.uncheckAll();
    AdminsInvitationsActions.checkItem(id, state);
  },

  showAdminDialog() {
    Actions.showDialog();
  },

  render() {
    return (
      <Container>
        <AdminDialog />

        <Common.InnerToolbar title="Administrators">
          <Common.Socket
            tooltip="Click here to invite Admin"
            onTouchTap={this.showAdminDialog}/>
        </Common.InnerToolbar>

        <AdminsList
          name="Administrators"
          checkItem={this.checkAdminItem}
          isLoading={this.state.admins.isLoading}
          hideDialogs={this.state.admins.hideDialogs}
          items={this.state.admins.items}/>

        <AdminsInvitationsList
          name="Invitations"
          emptyItemHandleClick={this.showAdminDialog}
          emptyItemContent="Invite administrator"
          checkItem={this.checkInvitationItem}
          isLoading={this.state.invitations.isLoading}
          hideDialogs={this.state.invitations.hideDialogs}
          items={AdminsInvitationsStore.getPendingInvitations()}/>
      </Container>
    );
  }
});
