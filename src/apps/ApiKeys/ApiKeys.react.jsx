import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import Actions from './ApiKeysActions';
import Store from './ApiKeysStore';

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

    Reflux.connect(Store),
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
    Actions.fetch();
  },

  // Dialogs config
  initDialogs() {
    let checkedApiKeys = Store.getCheckedItems();

    return [{
      dialog: Common.Dialog,
      params: {
        title : 'Reset an API Key',
        ref   : 'resetApiKeyDialog',
        actions: [
          {
            text    : 'Cancel',
            onClick : this.handleCancel
          },
          {
            text    : 'Confirm',
            onClick : this.handleReset
          }
        ],
        modal: true,
        children: [
          'Do you really want to reset this API key?',
          <Common.Loading
            type     = "linear"
            position = "bottom"
            show     = {this.state.isLoading} />
        ]
      }
    }, {
      dialog: Common.Dialog,
      params: {
        title : 'Delete an API key',
        ref   : 'deleteApiKeyDialog',
        actions: [
          {
            text    : 'Cancel',
            onClick : this.handleCancel
          },
          {
            text    : 'Confirm',
            onClick : this.handleDelete
          }
        ],
        modal: true,
        children: [
          'Do you really want to delete ' + this.getDialogListLength(checkedApiKeys) + ' API key(s)?',
          this.getDialogList(checkedApiKeys, 'description'),
          <Common.Loading
            type     = "linear"
            position = "bottom"
            show     = {this.state.isLoading} />
        ]
      }
    }]
  },

  handleDelete() {
    console.info('ApiKeys::handleDelete');
    Actions.removeApiKeys(Store.getCheckedItems());
  },

  handleReset() {
    console.info('ApiKeys::handleReset');
    Actions.resetApiKey(Store.getCheckedItem().id);
  },

  showApiKeyDialog() {
    Actions.showDialog();
  },

  render() {
    let checkedApiKeys      = Store.getNumberOfChecked(),
        isAnyApiKeySelected = checkedApiKeys >= 1 && checkedApiKeys < (this.state.items.length);

    return (
      <Container>
        <ApiKeyDialog />
        {this.getDialogs()}

        <Common.Show if={checkedApiKeys > 0}>
          <Common.Fab position="top">
            <Common.Fab.Item
              label         = {isAnyApiKeySelected ? 'Click here to select all' : 'Click here to unselect all'}
              mini          = {true}
              onClick       = {isAnyApiKeySelected ? Actions.selectAll : Actions.uncheckAll}
              iconClassName = {isAnyApiKeySelected ? 'synicon-checkbox-multiple-marked-outline' : 'synicon-checkbox-multiple-blank-outline'}
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
