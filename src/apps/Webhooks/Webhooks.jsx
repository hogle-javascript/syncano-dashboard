import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import Actions from './WebhooksActions';
import Store from './WebhooksStore';

// Components
import Common from '../../common';
import Container from '../../common/Container/Container';

// Local components
import WebhooksList from './WebhooksList';
import WebhookDialog from './WebhookDialog';


export default React.createClass({

  displayName: 'Data',

  mixins: [
    Router.State,
    Router.Navigation,
    Reflux.connect(Store),
    Mixins.InstanceTabs,
    HeaderMixin
  ],

  componentDidMount() {
    console.info('Data::componentDidMount');
    this.fetch();
  },

  showWebhookDialog() {
    Actions.showDialog();
  },

  fetch() {
    Actions.fetch();
  },

  render() {
    return (
      <Container>
        <WebhookDialog />

        <Common.InnerToolbar title="CodeBox Sockets">
          <Common.Socket.Webhook
            tooltipPosition="bottom-left"
            onTouchTap={this.showWebhookDialog}/>
        </Common.InnerToolbar>

        <WebhooksList
          name="CodeBox Sockets"
          isLoading={this.state.isLoading}
          items={this.state.items}
          hideDialogs={this.state.hideDialogs}
          emptyItemHandleClick={this.showWebhookDialog}
          emptyItemContent="Create a CodeBox Socket"/>
      </Container>
    );
  }
});
