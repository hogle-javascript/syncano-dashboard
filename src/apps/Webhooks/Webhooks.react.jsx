/* eslint-disable no-unused-vars, no-inline-comments */

import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import WebhooksActions from './WebhooksActions';
import WebhooksStore from './WebhooksStore';

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

    Reflux.connect(WebhooksStore, 'webhooks'),

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
    this.hideDialogs(nextState.webhooks.hideDialogs);
  },

  handleRemoveWebhooks() {
    console.info('Data::handleDelete');
    WebhooksActions.removeWebhooks(WebhooksStore.getCheckedItems());
  },

  uncheckAll() {
    console.info('Data::uncheckAll');
    WebhooksActions.uncheckAll();
  },

  showWebhookDialog() {
    WebhooksActions.showDialog();
  },

  showWebhookEditDialog() {
    WebhooksActions.showDialog(WebhooksStore.getCheckedItem());
  },

  checkWebhook(id, state) {
    console.info('Data::checkWebhook');
    WebhooksActions.checkItem(id, state);
  },

  fetch() {
    WebhooksActions.fetch();
  },

  // Dialogs config
  initDialogs() {
    return [
      {
        dialog: Common.Dialog,
        params: {
          key: 'removeWebhookDialog',
          ref: 'removeWebhookDialog',
          title: 'Delete a Webhook',
          actions: [
            {
              text: 'Cancel',
              onClick: this.handleCancel
            },
            {
              text: 'Confirm',
              onClick: this.handleRemoveWebhooks
            }
          ],
          children: 'Do you really want to delete ' + WebhooksStore.getCheckedItems().length + ' Webhooks?'
        }
      }
    ];
  },

  render() {
    let checkedWebhooks = WebhooksStore.getNumberOfChecked();
    let isAnyWebhookSelected = checkedWebhooks >= 1 && checkedWebhooks < this.state.webhooks.items.length;
    let markedIcon = 'synicon-checkbox-multiple-marked-outline';
    let blankIcon = 'synicon-checkbox-multiple-blank-outline';

    return (
      <Container>
        <WebhookDialog />
        {this.getDialogs()}

        <Common.Show if={checkedWebhooks > 0}>
          <Common.Fab position="top">
            <Common.Fab.TooltipItem
              tooltip={isAnyWebhookSelected ? 'Click here to select all' : 'Click here to unselect all'}
              mini={true}
              onClick={isAnyWebhookSelected ? WebhooksActions.selectAll : WebhooksActions.uncheckAll}
              iconClassName={isAnyWebhookSelected ? markedIcon : blankIcon}/>
            <Common.Fab.TooltipItem
              tooltip="Click here to delete a Webhook"
              mini={true}
              onClick={this.showDialog.bind(null, 'removeWebhookDialog')}
              iconClassName="synicon-delete"/>
          </Common.Fab>
        </Common.Show>

        <Common.InnerToolbar title="Webhooks">
          <MUI.IconButton
            style={{fontSize: 25, marginTop: 5}}
            iconClassName="synicon-delete"
            tooltip="Delete Data Objects"
          />
        </Common.InnerToolbar>

        <div style={{clear: 'both', height: '100%', marginTop: 130}}>

          <WebhooksList
            name="CodeBox Sockets"
            checkItem={this.checkWebhook}
            isLoading={this.state.webhooks.isLoading}
            items={this.state.webhooks.items}
            emptyItemHandleClick={this.showWebhookDialog}
            emptyItemContent="Create a CodeBox Socket"/>

        </div>

        </Container>
    );
  }
});
