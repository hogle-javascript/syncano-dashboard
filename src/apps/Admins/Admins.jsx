import React from 'react';
import Reflux from 'reflux';
import {State, Navigation} from 'react-router';

// Utils
import {DialogsMixin} from '../../mixins';

// Stores and Actions
import Actions from './AdminsActions';
import Store from './AdminsStore';
import AdminsInvitationsActions from './AdminsInvitationsActions';
import AdminsInvitationsStore from './AdminsInvitationsStore';

// Components
import {RaisedButton} from 'syncano-material-ui';
import {Container} from 'syncano-components';
import {InnerToolbar} from '../../common';

// Local components
import AdminsList from './AdminsList';
import AdminsInvitationsList from './AdminsInvitationsList';
import AdminDialog from './AdminDialog';

export default React.createClass({
  displayName: 'Admins',

  mixins: [
    State,
    Navigation,

    Reflux.connect(Store, 'admins'),
    Reflux.connect(AdminsInvitationsStore, 'invitations'),
    DialogsMixin
  ],

  componentDidMount() {
    console.info('Admins::componentDidMount');
    Actions.fetch();
    AdminsInvitationsActions.fetch();
  },

  render() {
    const {admins, invitations} = this.state;

    return (
      <div>
        <AdminDialog />

        <InnerToolbar title="Administrators">
          <RaisedButton
            label="Invite"
            primary={true}
            style={{marginRight: 0}}
            onTouchTap={AdminsInvitationsActions.showDialog} />
        </InnerToolbar>

        <Container>
          <AdminsList
            isLoading={admins.isLoading}
            hideDialogs={admins.hideDialogs}
            items={admins.items}/>

          <AdminsInvitationsList
            isLoading={invitations.isLoading}
            hideDialogs={invitations.hideDialogs}
            items={AdminsInvitationsStore.getPendingInvitations()}/>
        </Container>
      </div>
    );
  }
});
