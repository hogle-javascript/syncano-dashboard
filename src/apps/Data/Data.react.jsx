import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import DataViewsActions from './DataViewsActions';
import DataViewsStore from './DataViewsStore';
import WebhooksActions from './WebhooksActions';
import WebhooksStore from './WebhooksStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';
import Container from '../../common/Container/Container.react';

// Local components
import DataViewsList from './DataViewsList.react';
import WebhooksList from './WebhooksList.react';
import DataViewDialog from './DataViewDialog.react';
import WebhookDialog from './WebhookDialog.react';

export default React.createClass({

  displayName: 'Data',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(DataViewsStore, 'dataviews'),
    Reflux.connect(WebhooksStore, 'webhooks'),
    Mixins.Dialogs,
    Mixins.InstanceTabs,
    HeaderMixin
  ],

  fetch() {
    DataViewsActions.fetch();
    WebhooksActions.fetch();
  },

  componentDidMount() {
    console.info('Data::componentDidMount');
    this.fetch();
  },

  componentWillReceiveProps() {
    console.info('Data::componentWillReceiveProps');
    this.fetch();
  },

  componentWillUpdate(nextProps, nextState) {
    console.info('Data::componentWillUpdate');
    this.hideDialogs(nextState.dataviews.hideDialogs || nextState.webhooks.hideDialogs);
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
          modal: true,
          children: 'Do you really want to delete ' + WebhooksStore.getCheckedItems().length + ' Webhooks?'
        }
      },
      {
        dialog: Common.Dialog,
        params: {
          key: 'removeDataViewDialog',
          ref: 'removeDataViewDialog',
          title: 'Delete a DataView',
          actions: [
            {
              text: 'Cancel',
              onClick: this.handleCancel
            },
            {
              text: 'Confrim',
              onClick: this.handleRemoveDataViews
            }
          ],
          modal: true,
          children: 'Do you really want to delete ' + DataViewsStore.getCheckedItems().length + ' Data endpoints?'
        }
      }
    ]
  },

  handleRemoveWebhooks() {
    console.info('Data::handleDelete');
    WebhooksActions.removeWebhooks(WebhooksStore.getCheckedItems());
  },

  handleRemoveDataViews() {
    console.info('Data::handleRemoveDataViews');
    DataViewsActions.removeDataViews(DataViewsStore.getCheckedItems());
  },

  uncheckAll() {
    console.info('Data::uncheckAll');
    DataViewsActions.uncheckAll();
    WebhooksActions.uncheckAll();
  },

  showDataViewDialog() {
    DataViewsActions.showDialog();
  },

  showDataViewEditDialog() {
    DataViewsActions.showDialog(DataViewsStore.getCheckedItem());
  },

  showWebhookDialog() {
    WebhooksActions.showDialog();
  },

  showWebhookEditDialog() {
    WebhooksActions.showDialog(WebhooksStore.getCheckedItem());
  },

  checkDataViewItem(id, state) {
    console.info('Data::checkDataViewItem');
    DataViewsActions.checkItem(id, state);
    WebhooksActions.uncheckAll();
  },

  checkWebhook(id, state) {
    console.info('Data::checkWebhook');
    WebhooksActions.checkItem(id, state);
    DataViewsActions.uncheckAll();
  },

  render() {
    let checkedDataViews = DataViewsStore.getNumberOfChecked();
    let checkedWebhooks = WebhooksStore.getNumberOfChecked();
    let isAnyDataViewSelected = checkedDataViews >= 1 && checkedDataViews < this.state.dataviews.items.length;
    let isAnyWebhookSelected = checkedWebhooks >= 1 && checkedWebhooks < this.state.webhooks.items.length;
    let markedIcon = 'synicon-checkbox-multiple-marked-outline';
    let blankIcon = 'synicon-checkbox-multiple-blank-outline';

    return (
      <Container>
        <WebhookDialog />
        <DataViewDialog />
        {this.getDialogs()}

        <Common.Show if={checkedDataViews > 0}>
          <Common.Fab position="top">
            <Common.Fab.ItemNew
              tooltip={isAnyDataViewSelected ? 'Click here to select all' : 'Click here to unselect all'}
              mini={true}
              onClick={isAnyDataViewSelected ? DataViewsActions.selectAll : DataViewsActions.uncheckAll}
              iconClassName={isAnyDataViewSelected ? markedIcon : blankIcon}/>
            <Common.Fab.ItemNew
              tooltip="Click here to delete a Data Endpoint"
              mini={true}
              onClick={this.showDialog.bind(null, 'removeDataViewDialog')}
              iconClassName="synicon-delete"/>
            <Common.Fab.ItemNew
              tooltip="Click here to edit a Data Endpoint"
              mini={true}
              disabled={checkedDataViews > 1}
              onClick={this.showDataViewEditDialog}
              iconClassName="synicon-pencil"/>
          </Common.Fab>
        </Common.Show>

        <Common.Show if={checkedWebhooks > 0}>
          <Common.Fab position="top">
            <Common.Fab.ItemNew
              tooltip={isAnyWebhookSelected ? 'Click here to select all' : 'Click here to unselect all'}
              mini={true}
              onClick={isAnyWebhookSelected ? WebhooksActions.selectAll : WebhooksActions.uncheckAll}
              iconClassName={isAnyWebhookSelected ? markedIcon : blankIcon}/>
            <Common.Fab.ItemNew
              tooltip="Click here to delete a CodeBox Endpoint"
              mini={true}
              onClick={this.showDialog.bind(null, 'removeWebhookDialog')}
              iconClassName="synicon-delete"/>
            <Common.Fab.ItemNew
              tooltip="Click here to edit a CodeBox Endpoint"
              mini={true}
              disabled={checkedDataViews > 1}
              onClick={this.showWebhookEditDialog}
              iconClassName="synicon-pencil"/>
          </Common.Fab>
        </Common.Show>

        <Common.Fab>
          <Common.Fab.ItemNew
            tooltip="Click here to create a Data Endpoint"
            onClick={this.showDataViewDialog}
            iconClassName="synicon-table"/>
          <Common.Fab.ItemNew
            tooltip="Click here to create a CodeBox Endpoint"
            onClick={this.showWebhookDialog}
            iconClassName="synicon-arrow-up-bold"/>
        </Common.Fab>

        <DataViewsList
          name="Data Endpoints"
          checkItem={this.checkDataViewItem}
          isLoading={this.state.dataviews.isLoading}
          items={this.state.dataviews.items}
          emptyItemHandleClick={this.showDataViewDialog}
          emptyItemContent="Create a DataView"/>

        <WebhooksList
          name="CodeBox Endpoints"
          checkItem={this.checkWebhook}
          isLoading={this.state.webhooks.isLoading}
          items={this.state.webhooks.items}
          emptyItemHandleClick={this.showWebhookDialog}
          emptyItemContent="Create a Webhook"/>
      </Container>
    );
  }
});
