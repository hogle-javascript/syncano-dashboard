import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import Mixins from '../../mixins';

// Stores and Actions
import Actions from './ApiKeysActions';
import Store from './ApiKeysStore';

// Components
import {FlatButton} from 'syncano-material-ui';
import ListItem from './ApiKeysListItem';
import Common from '../../common';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'ApiKeysList',

  mixins: [
    Reflux.connect(Store),
    HeaderMixin,
    Router.State,
    Router.Navigation,
    Mixins.Dialog,
    Mixins.Dialogs
  ],

  componentWillUpdate(nextProps) {
    console.info('ApiKeysList::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  handleItemIconClick(id, state) {
    Actions.checkItem(id, state);
  },

  handleDelete() {
    console.info('ApiKeys::handleDelete');
    Actions.removeApiKeys(Store.getCheckedItems());
  },

  handleReset() {
    console.info('ApiKeys::handleReset');
    Actions.resetApiKey(Store.getCheckedItems());
  },

  initDialogs() {
    let checkedApiKeys = Store.getCheckedItems();

    return [{
      dialog: Common.Dialog,
      params: {
        title: 'Reset an API Key',
        ref: 'resetApiKeyDialog',
        key: 'resetApiKeyDialog',
        actions: [
          <FlatButton
            label="Cancel"
            secondary={true}
            onTouchTap={this.handleCancel.bind(null, 'resetApiKeyDialog')}/>,
          <FlatButton
            label="Confirm"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.handleReset}/>
        ],
        modal: true,
        avoidResetState: true,
        children: [
          'Do you really want to reset ' + this.getDialogListLength(checkedApiKeys) + ' API keys?',
          <Common.Loading
            type="linear"
            position="bottom"
            show={this.props.isLoading}/>
        ]
      }
    }, {
      dialog: Common.Dialog,
      params: {
        title: 'Delete an API key',
        ref: 'deleteApiKeyDialog',
        key: 'deleteApiKeyDialog',
        actions: [
          <FlatButton
            label="Cancel"
            secondary={true}
            onTouchTap={this.handleCancel.bind(null, 'deleteApiKeyDialog')}/>,
          <FlatButton
            label="Confirm"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.handleDelete}/>
        ],
        modal: true,
        avoidResetState: true,
        children: [
          `Do you really want to delete ${Store.getDeleteItemsPhrase('API Key')}?`,
          this.getDialogList(checkedApiKeys, 'api_key'),
          <Common.Loading
            type="linear"
            position="bottom"
            show={this.props.isLoading}/>
        ]
      }
    }];
  },

  renderItem(item) {
    return (
      <ListItem
        onIconClick={this.handleItemIconClick}
        item={item}
        showDeleteDialog={this.showMenuDialog.bind(null, item.api_key, Actions.removeApiKeys.bind(null, [item]))}
        showResetDialog={this.showMenuDialog.bind(null, item.api_key, Actions.resetApiKey.bind(null, [item]))}/>
    );
  },

  render() {
    let checkedItems = Store.getNumberOfChecked();

    return (
      <Common.Lists.Container className="api-keys-list">
        {this.getDialogs()}
        <Column.MenuDialog ref="menuDialog"/>
        <Common.ColumnList.Header>
          <Column.ColumnHeader
            columnName="CHECK_ICON"
            primary={true}>
            {this.props.name}
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="ID">ID</Column.ColumnHeader>
          <Column.ColumnHeader columnName="KEY">Key</Column.ColumnHeader>
          <Column.ColumnHeader columnName="TEXT">Permissions</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Created</Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Common.Lists.Menu
              checkedItemsCount={checkedItems}
              actions={Actions}>
              <Common.Lists.MenuItem
                singleItemText="Reset an API Key"
                multipleItemsText="Reset API Keys"
                onTouchTap={this.showDialog.bind(null, 'resetApiKeyDialog')}/>
              <Common.Lists.MenuItem
                singleItemText="Delete an API Key"
                multipleItemsText="Delete API Keys"
                onTouchTap={this.showDialog.bind(null, 'deleteApiKeyDialog')}/>
            </Common.Lists.Menu>
          </Column.ColumnHeader>
        </Common.ColumnList.Header>
        <Common.Lists.List
          {...this.props}
          renderItem={this.renderItem}/>
      </Common.Lists.Container>
    );
  }
});

