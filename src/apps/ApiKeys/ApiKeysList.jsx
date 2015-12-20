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
import ListItem from './ApiKeysListItem';
import {Dialog, ColumnList, Lists} from '../../common';

let Column = ColumnList.Column;

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
    return [
      {
        dialog: Dialog.Delete,
        params: {
          key: 'resetApiKeyDialog',
          ref: 'resetApiKeyDialog',
          title: 'Reset an API Key',
          handleConfirm: this.handleReset,
          isLoading: this.props.isLoading,
          items: Store.getCheckedItems(),
          itemLabelName: 'api_key',
          actionName: 'reset',
          groupName: 'API Key'
        }
      },
      {
        dialog: Dialog.Delete,
        params: {
          key: 'deleteApiKeyDialog',
          ref: 'deleteApiKeyDialog',
          title: 'Delete an API key',
          handleConfirm: this.handleDelete,
          isLoading: this.props.isLoading,
          items: Store.getCheckedItems(),
          itemLabelName: 'api_key',
          groupName: 'Channel'
        }
      }
    ];
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
      <Lists.Container className="api-keys-list">
        {this.getDialogs()}
        <Column.MenuDialog ref="menuDialog"/>
        <ColumnList.Header>
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
            <Lists.Menu
              checkedItemsCount={checkedItems}
              actions={Actions}>
              <Lists.MenuItem
                singleItemText="Reset an API Key"
                multipleItemsText="Reset API Keys"
                onTouchTap={this.showDialog.bind(null, 'resetApiKeyDialog')}/>
              <Lists.MenuItem
                singleItemText="Delete an API Key"
                multipleItemsText="Delete API Keys"
                onTouchTap={this.showDialog.bind(null, 'deleteApiKeyDialog')}/>
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...this.props}
          renderItem={this.renderItem}/>
      </Lists.Container>
    );
  }
});

