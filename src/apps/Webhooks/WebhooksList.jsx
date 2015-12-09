import React from 'react';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import Mixins from '../../mixins';

import Actions from './WebhooksActions';
import Store from './WebhooksStore';

// Components
import ListItem from './WebhooksListItem';
import Common from '../../common';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'WebhooksList',

  mixins: [
    Router.State,
    Router.Navigation,
    HeaderMixin,
    Mixins.Dialog,
    Mixins.Dialogs
  ],

  getInitialState() {
    return {};
  },

  componentWillUpdate(nextProps) {
    console.info('Admins::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  handleItemIconClick(id, state) {
    Actions.checkItem(id, state);
  },

  handleRemoveWebhooks() {
    console.info('Data::handleDelete');
    Actions.removeWebhooks(Store.getCheckedItems());
  },

  initDialogs() {
    let checkedItems = Store.getCheckedItems();

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
              onClick: this.handleCancel.bind(null, 'removeWebhookDialog')
            },
            {
              text: 'Confirm',
              onClick: this.handleRemoveWebhooks
            }
          ],
          modal: true,
          avoidResetState: true,
          children: [
            `Do you really want to delete ${this.getDialogListLength(checkedItems)} Webhooks?`,
            this.getDialogList(checkedItems, 'name')
          ]
        }
      }
    ];
  },

  renderItem(item, index) {
    return (
      <ListItem
        key={`webhookslist-${index}`}
        onIconClick={this.handleItemIconClick}
        item={item}
        showDeleteDialog={this.showMenuDialog.bind(null, item.name, Actions.removeWebhooks.bind(null, [item]))}/>
    );
  },

  render() {
    let checkedItems = Store.getNumberOfChecked();

    return (
      <Common.Lists.Container>
        {this.getDialogs()}
        <Common.ColumnList.Column.MenuDialog ref="menuDialog"/>
        <Common.ColumnList.Header>
          <Column.ColumnHeader
            className="col-xs-12"
            primary={true}
            columnName="CHECK_ICON"
            handleClick={this.props.handleTitleClick}>
            {this.props.name}
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-flex-1">
            Description
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-xs-4">
            Traces
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-xs-4">
            Snippet ID
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="KEY"
            className="col-xs-3">
            Public
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Common.Lists.Menu
              checkedItemsCount={checkedItems}
              actions={Actions}>
              <Common.Lists.MenuItem
                primaryText="Delete Webhook"
                onTouchTap={this.showDialog.bind(null, 'removeWebhookDialog')}/>
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

