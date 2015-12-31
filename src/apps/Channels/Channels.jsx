import React from 'react';
import Reflux from 'reflux';
import {State, Navigation} from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import Actions from './ChannelsActions';
import Store from './ChannelsStore';

// Components
import {InnerToolbar, Socket, Container} from '../../common';

// Local components
import ChannelsList from './ChannelsList';
import ChannelDialog from './ChannelDialog';

export default React.createClass({

  displayName: 'Channels',

  mixins: [
    State,
    Navigation,

    Reflux.connect(Store),
    Mixins.Dialog,
    Mixins.Dialogs,
    Mixins.InstanceTabs,
    HeaderMixin
  ],

  componentDidMount() {
    console.info('Channels::componentDidMount');
    Actions.fetch();
    if (this.getParams().action === 'add') {
      // Show Add modal
      this.showChannelDialog();
    }
    Actions.fetch();
  },

  showChannelDialog() {
    Actions.showDialog();
  },

  render() {
    return (
      <div>
        <ChannelDialog />

        <InnerToolbar title="Channel Sockets">
          <Socket.Channel
            tooltipPosition="bottom-left"
            onTouchTap={this.showChannelDialog}/>
        </InnerToolbar>

        <Container>
          <ChannelsList
            name="Channels"
            isLoading={this.state.isLoading}
            items={this.state.items}
            emptyItemHandleClick={this.showChannelDialog}
            emptyItemContent="Create a Channel Socket"/>
        </Container>
      </div>
    );
  }
});