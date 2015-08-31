import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import Actions from './ApiKeysActions';
import Store from './ApiKeysStore';

// Components
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

  componentDidMount() {
    console.info('ApiKeys::componentWillMount');
    Actions.fetch();
  },

  componentWillUpdate(nextProps, nextState) {
    console.info('ApiKeys::componentWillUpdate');
    this.hideDialogs(nextState.hideDialogs);
  },

  handleDelete() {
    console.info('ApiKeys::handleDelete');
    Actions.removeApiKeys(Store.getCheckedItems());
  },

  handleReset() {
    console.info('ApiKeys::handleReset');
    Actions.resetApiKey(Store.getCheckedItems());
  },

  showApiKeyDialog() {
    Actions.showDialog();
  },

  // Dialogs config
  initDialogs() {
    let checkedApiKeys = Store.getCheckedItems();

    return [{
      dialog: Common.Dialog,
      params: {
        title: 'Reset an API Key',
        ref: 'resetApiKeyDialog',
        actions: [
          {
            text: 'Cancel',
            onClick: this.handleCancel
          },
          {
            text: 'Confirm',
            onClick: this.handleReset
          }
        ],
        modal: true,
        children: [
          'Do you really want to reset ' + this.getDialogListLength(checkedApiKeys) + ' API keys?',
          <Common.Loading
            type="linear"
            position="bottom"
            show={this.state.isLoading}/>
        ]
      }
    }, {
      dialog: Common.Dialog,
      params: {
        title: 'Delete an API key',
        ref: 'deleteApiKeyDialog',
        actions: [
          {
            text: 'Cancel',
            onClick: this.handleCancel
          },
          {
            text: 'Confirm',
            onClick: this.handleDelete
          }
        ],
        modal: true,
        children: [
          'Do you really want to delete ' + this.getDialogListLength(checkedApiKeys) + ' API key(s)?',
          this.getDialogList(checkedApiKeys, 'api_key'),
          <Common.Loading
            type="linear"
            position="bottom"
            show={this.state.isLoading}/>
        ]
      }
    }]
  },

  render() {
    let checkedApiKeys = Store.getNumberOfChecked();
    let isAnyApiKeySelected = checkedApiKeys >= 1 && checkedApiKeys < (this.state.items.length);
    let markedIcon = 'synicon-checkbox-multiple-marked-outline';
    let blankIcon = 'synicon-checkbox-multiple-blank-outline';

    return (
      <Container>
        <ApiKeyDialog />
        {this.getDialogs()}

        <Common.Show if={checkedApiKeys > 0}>
          <Common.Fab position="top">
            <Common.Fab.TooltipItem
              tooltip={isAnyApiKeySelected ? 'Click here to select all' : 'Click here to unselect all'}
              mini={true}
              onClick={isAnyApiKeySelected ? Actions.selectAll : Actions.uncheckAll}
              iconClassName={isAnyApiKeySelected ? markedIcon : blankIcon}
              />
            <Common.Fab.TooltipItem
              tooltip="Click here to delete API Keys"
              mini={true}
              onClick={this.showDialog.bind(null, 'deleteApiKeyDialog')}
              iconClassName="synicon-delete"
              />
            <Common.Fab.TooltipItem
              tooltip="Click here to reset an API Key"
              mini={true}
              onClick={this.showDialog.bind(null, 'resetApiKeyDialog')}
              iconClassName="synicon-backup-restore"
              />
          </Common.Fab>
        </Common.Show>
        <Common.Fab>
          <Common.Fab.TooltipItem
            tooltip="Click here to add an API Key"
            onClick={this.showApiKeyDialog}
            iconClassName="synicon-plus"
            />
        </Common.Fab>
        <ApiKeysList
          name="API Keys"
          items={this.state.items}
          emptyItemHandleClick={this.showApiKeyDialog}
          emptyItemContent="Generate an API Key"
          />
      </Container>
    );
  }
});
