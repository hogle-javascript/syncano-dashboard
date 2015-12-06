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
import MUI from 'syncano-material-ui';
import Common from '../../common';
import Container from '../../common/Container/Container.react';

// Local components
import WebhooksList from './WebhooksList.react';
import WebhookDialog from './WebhookDialog.react';


export default React.createClass({

  displayName: 'Data',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(Store),

    Mixins.Dialogs,
    Mixins.InstanceTabs,
    HeaderMixin
  ],

  componentDidMount() {
    console.info('Data::componentDidMount');
    this.fetch();
  },

  componentWillUpdate(nextProps, nextState) {
    console.info('Data::componentWillUpdate');
    this.hideDialogs(nextState.hideDialogs);
  },

  showWebhookDialog() {
    Actions.showDialog();
  },

  checkWebhook(id, state) {
    console.info('Data::checkWebhook');
    Actions.checkItem(id, state);
  },

  fetch() {
    Actions.fetch();
  },

  render() {
    return (
      <Container>
        <WebhookDialog />

        <Common.InnerToolbar title="CodeBox Sockets">
          <MUI.IconButton
            iconClassName="synicon-socket-codebox"
            iconStyle={{color: MUI.Styles.Colors.red300, fontSize: 35}}
            tooltip="Create CodeBox Socket"
            onTouchTap={this.showWebhookDialog}/>
        </Common.InnerToolbar>

        <WebhooksList
          name="CodeBox Sockets"
          checkItem={this.checkWebhook}
          isLoading={this.state.isLoading}
          items={this.state.items}
          emptyItemHandleClick={this.showWebhookDialog}
          emptyItemContent="Create a CodeBox Socket"/>
      </Container>
    );
  }
});
