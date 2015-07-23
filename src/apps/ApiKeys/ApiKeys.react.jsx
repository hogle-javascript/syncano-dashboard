import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import ApiKeysActions from './ApiKeysActions';
import ApiKeysStore from './ApiKeysStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';
import Container from '../../common/Container/Container.react';

// Local components
import ApiKeysList from './ApiKeysList.react';
import ApiKeyDialog from './ApiKeyDialog.react';

export default React.createClass({

  displayName: 'ApiKeys',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(ApiKeysStore),
    Mixins.Dialogs,
    Mixins.InstanceTabs,
    HeaderMixin
  ],

  componentWillUpdate(nextProps, nextState) {
    console.info('ApiKeys::componentWillUpdate');
    this.hideDialogs(nextState.hideDialogs);
  },

  componentDidMount() {
    console.info('ApiKeys::componentWillMount');
    ApiKeysActions.fetch();
  },

  // Dialogs config
  initDialogs() {
    let checkedApiKeys = ApiKeysStore.getCheckedItems();

    return [{
      dialog: Common.Dialog,
      params: {
        title:  "Reset an API Key",
        ref  : "resetApiKeyDialog",
        actions: [
          {
            text    : 'Cancel',
            onClick : this.handleCancel
          },
          {
            text    : "Confirm",
            onClick : this.handleReset
          }
        ],
        modal: true,
        children: [
          'Do you really want to reset this API key?',
          <Common.Loading
            type     = "linear"
            position = "bottom"
            show     = {this.state.isLoading}
          />
        ]
      }
    }, {
      dialog: Common.Dialog,
      params: {
        ref: "deleteApiKeyDialog",
        title: "Delete an API key",
        actions: [
          {
            text    : 'Cancel',
            onClick : this.handleCancel
          },
          {
            text    : "Confirm",
            onClick : this.handleDelete
          }
        ],
        modal: true,
        children: [
          'Do you really want to delete ' + this.getDialogListLength(checkedApiKeys) + ' API key(s)?',
          this.getDialogList(checkedApiKeys),
          <Common.Loading
            type     = "linear"
            position = "bottom"
            show     = {this.state.isLoading}
          />
        ]
      }
    }]
  },

  handleDelete() {
    console.info('ApiKeys::handleDelete');
    ApiKeysActions.removeApiKeys(ApiKeysStore.getCheckedItems());
  },

  handleReset() {
    console.info('ApiKeys::handleReset');
    ApiKeysActions.resetApiKey(ApiKeysStore.getCheckedItem().id);
  },

  showApiKeyDialog() {
    ApiKeysActions.showDialog();
  },

  render() {
    let checkedApiKeys      = ApiKeysStore.getNumberOfChecked(),
        isAnyApiKeySelected = checkedApiKeys >= 1 && checkedApiKeys < (this.state.items.length);

    return (
      <Container>
        <ApiKeyDialog />
        {this.getDialogs()}
        <Common.Show if={checkedApiKeys > 0}>
          <Common.Fab position="top">
            <Common.Fab.Item
              label         = {isAnyApiKeySelected ? "Click here to select all" : "Click here to unselect all"}
              mini          = {true}
              onClick       = {isAnyApiKeySelected ? ApiKeysActions.selectAll : ApiKeysActions.uncheckAll}
              iconClassName = {isAnyApiKeySelected ? "synicon-checkbox-multiple-marked-outline" : "synicon-checkbox-multiple-blank-outline"}
            />
            <Common.Fab.Item
              label         = "Click here to delete API Keys"
              mini          = {true}
              onClick       = {this.showDialog.bind(null, 'deleteApiKeyDialog')}
              iconClassName = "synicon-delete"
            />
            <Common.Fab.Item
              label         = "Click here to edit an API Key"
              mini          = {true}
              disabled      = {checkedApiKeys > 1}
              onClick       = {this.showDialog.bind(null, 'resetApiKeyDialog')}
              iconClassName = "synicon-backup-restore"
            />
          </Common.Fab>
        </Common.Show>
        <Common.Fab>
          <Common.Fab.Item
            label         = "Click here to add an API Key"
            onClick       = {this.showApiKeyDialog}
            iconClassName = "synicon-plus"
          />
        </Common.Fab>
        <ApiKeysList
          name                 = "API Keys"
          items                = {this.state.items}
          emptyItemHandleClick = {this.showApiKeyDialog}
          emptyItemContent     = "Generate an API Key"
        />
      </Container>
    );
  }
});
