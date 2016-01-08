import React from 'react';
import Reflux from 'reflux';

// Utils
import {DialogsMixin} from '../../mixins';

// Stores and Actions
import Actions from './ProfileInvitationsActions';
import Store from './ProfileInvitationsStore';

// Components
import ProfileInvitationsList from './ProfileInvitationsList';
import {Container, Loading, Show, InnerToolbar} from '../../common';

export default React.createClass({

  displayName: 'ProfileInvitations',

  mixins: [
    Reflux.connect(Store),
    DialogsMixin
  ],

  componentDidMount() {
    console.info('ProfileInvitations::componentDidMount');
    Actions.fetch();
  },

  render() {
    return (
      <div>
        <InnerToolbar title="Invitations"/>
        <Container>
          <Loading show={this.state.isLoading}>
            <Show if={this.state.items.length < 1}>
              <Container.Empty
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
      </div>
    );
  }
});
