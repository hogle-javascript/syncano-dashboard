import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import Actions from './ChannelsActions';
import Store from './ChannelsStore';

// Components
import {IconButton} from 'syncano-material-ui';
import Common from '../../common';
import Container from '../../common/Container/Container.react';

// Local components
import ChannelsList from './ChannelsList.react';
import ChannelDialog from './ChannelDialog.react';

export default React.createClass({

  displayName: 'Channels',

  mixins: [
    Router.State,
    Router.Navigation,

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
      <Container>
        <ChannelDialog />

        <Common.InnerToolbar title="Channels">
          <IconButton
            iconClassName="synicon-plus"
            tooltip="Click here to add a Channel"
            onTouchTap={this.showChannelDialog}/>
        </Common.InnerToolbar>

        <ChannelsList
          name="Channels"
          isLoading={this.state.isLoading}
          items={this.state.items}
          emptyItemHandleClick={this.showChannelDialog}
          emptyItemContent="Create a Channel"/>
      </Container>
    );
  }
});
