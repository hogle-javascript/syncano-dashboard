import React from 'react';
import Reflux from 'reflux';

// Utils
import Mixins from '../../mixins';

// Stores and Actions
import Actions from './ProfileInvitationsActions';
import Store from './ProfileInvitationsStore';

// Components
import ProfileInvitationsList from './ProfileInvitationsList';
import {Loading, Show, InnerToolbar} from '../../common';
import Container from '../../common/Container/Container';
import EmptyContainer from '../../common/Container/EmptyContainer';

export default React.createClass({

  displayName: 'ProfileInvitations',

  mixins: [
    Reflux.connect(Store),
    Mixins.Dialog,
    Mixins.Dialogs
  ],

  componentDidMount() {
    console.info('ProfileInvitations::componentDidMount');
    Actions.fetch();
  },

  render() {
    return (
      <Container>
        <InnerToolbar title="Invitations"/>
        <Loading show={this.state.isLoading}>
          <Show if={this.state.items.length < 1}>
            <EmptyContainer
              icon='synicon-email-outline'
              text='You have no invitations'/>
          </Show>

          <Show if={this.state.items.length > 0}>
            <ProfileInvitationsList
              name="Profile Invitations"
              isLoading={this.state.isLoading}
              items={this.state.items}
              hideDialogs={this.state.hideDialogs}/>
          </Show>
        </Loading>
      </Container>
    );
  }
});
