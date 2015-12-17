import React from 'react';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import Mixins from '../../mixins';

// Stores and Actions
import Actions from './ChannelsActions';
import Store from './ChannelsStore';

// Components
import {FlatButton} from 'syncano-material-ui';
import ListItem from './ChannelsListItem';
import Common from '../../common';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'ChannelsList',

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
    console.info('Channels::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  handleItemIconClick(id, state) {
    Actions.checkItem(id, state);
  },

  handleDelete() {
    console.info('Channels::handleDelete');
    Actions.removeChannels(Store.getCheckedItems());
  },

  initDialogs() {
    let checkedChannels = Store.getCheckedItems();

    return [{
      dialog: Common.Dialog,
      params: {
        key: 'deleteChannelDialog',
        ref: 'deleteChannelDialog',
        title: 'Delete a Channel',
        actions: [
          <FlatButton
            label="Cancel"
            secondary={true}
            onTouchTap={this.handleCancel.bind(null, 'deleteChannelDialog')} />,
          <FlatButton
            label="Confirm"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.handleDelete} />
        ],
        modal: true,
        avoidResetState: true,
        children: [
          `Do you really want to delete ${Store.getDeleteItemsPhrase('Channel')}?`,
          this.getDialogList(checkedChannels),
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
        showDeleteDialog={this.showMenuDialog.bind(null, item.name, Actions.removeChannels.bind(null, [item]))}/>
    );
  },

  render() {
    let checkedItems = Store.getNumberOfChecked();

    return (
      <Common.Lists.Container>
        {this.getDialogs()}
        <Column.MenuDialog ref="menuDialog"/>
        <Common.ColumnList.Header>
          <Column.ColumnHeader
            className="col-xs-12"
            primary={true}
            columnName="CHECK_ICON"
            handleClick={this.props.handleTitleClick}>
            {this.props.name}
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="DESC">Description</Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-xs-4">
            Permissions
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-xs-4">
            Type
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-xs-3">
            Custom publish
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Common.Lists.Menu
              checkedItemsCount={checkedItems}
              actions={Actions}>
              <Common.Lists.MenuItem
                singleItemText="Delete a Channel Socket"
                multipleItemsText="Delete Channel Sockets"
                onTouchTap={this.showDialog.bind(null, 'deleteChannelDialog')}/>
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
