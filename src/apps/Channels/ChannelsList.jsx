import React from 'react';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import {DialogsMixin} from '../../mixins';

// Stores and Actions
import Actions from './ChannelsActions';
import Store from './ChannelsStore';

// Components
import ListItem from './ChannelsListItem';
import {ColumnList} from 'syncano-components';
import {Dialog, Lists} from '../../common';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'ChannelsList',

  mixins: [
    HeaderMixin,
    Router.State,
    Router.Navigation,
    DialogsMixin
  ],

  componentWillUpdate(nextProps) {
    console.info('Channels::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  initDialogs() {
    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'deleteChannelDialog',
        ref: 'deleteChannelDialog',
        title: 'Delete a Channel Socket',
        handleConfirm: Actions.removeChannels,
        isLoading: this.props.isLoading,
        items: Store.getCheckedItems(),
        groupName: 'Channel Socket'
      }
    }];
  },

  renderItem(item) {
    return (
      <ListItem
        key={`channels-list-item-${item.name}`}
        onIconClick={Actions.checkItem}
        item={item}
        showDeleteDialog={() => this.showDialog('deleteChannelDialog', item)} />
    );
  },

  render() {
    let checkedItems = Store.getNumberOfChecked();

    return (
      <Lists.Container>
        {this.getDialogs()}
        <ColumnList.Header>
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
            className="col-flex-1">
            Permissions
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-flex-1">
            Type
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-flex-1">
            Custom publish
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={checkedItems}
              actions={Actions}>
              <Lists.MenuItem
                singleItemText="Delete a Channel Socket"
                multipleItemsText="Delete Channel Sockets"
                onTouchTap={() => this.showDialog('deleteChannelDialog')} />
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...this.props}
          key="channels-list"
          renderItem={this.renderItem}/>
      </Lists.Container>
    );
  }
});
