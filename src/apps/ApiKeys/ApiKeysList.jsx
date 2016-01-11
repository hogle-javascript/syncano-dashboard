import React from 'react';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import {DialogsMixin} from '../../mixins';

// Stores and Actions
import Actions from './ApiKeysActions';
import Store from './ApiKeysStore';

// Components
import ListItem from './ApiKeysListItem';
import {ColumnList} from 'syncano-components';
import {Dialog, Lists} from '../../common';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'ApiKeysList',

  mixins: [
    HeaderMixin,
    Router.State,
    Router.Navigation,
    DialogsMixin
  ],

  componentWillUpdate(nextProps) {
    console.info('ApiKeysList::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  initDialogs() {
    return [
      {
        dialog: Dialog.Delete,
        params: {
          key: 'resetApiKeyDialog',
          ref: 'resetApiKeyDialog',
          title: 'Reset an API Key',
          handleConfirm: Actions.resetApiKey,
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
          handleConfirm: Actions.removeApiKeys,
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
        key={`apikeys-list-item-${item.id}`}
        onIconClick={Actions.checkItem}
        item={item}
        showDeleteDialog={this.showDialog.bind(null, 'deleteApiKeyDialog', item)}
        showResetDialog={this.showDialog.bind(null, 'resetApiKeyDialog', item)}/>
    );
  },

  render() {
    let checkedItems = Store.getNumberOfChecked();

    return (
      <Lists.Container className="api-keys-list">
        {this.getDialogs()}
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
          key="apikeys-list"
          renderItem={this.renderItem}/>
      </Lists.Container>
    );
  }
});

