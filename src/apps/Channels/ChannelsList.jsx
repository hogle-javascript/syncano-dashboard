import React from 'react';
import Router from 'react-router';

// Utils
import {DialogsMixin} from '../../mixins';

// Stores and Actions
import Actions from './ChannelsActions';
import Store from './ChannelsStore';

// Components
import ListItem from './ChannelsListItem';
import {ColumnList} from 'syncano-components';
import {Dialog, Lists} from '../../common';

const Column = ColumnList.Column;

export default React.createClass({
  displayName: 'ChannelsList',

  mixins: [
    Router.State,
    Router.Navigation,
    DialogsMixin
  ],

  componentWillUpdate(nextProps) {
    console.info('Channels::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  handleTitleClick() {
    const instanceName = this.getParams().instanceName;

    if (this.props.handleTitleClick) {
      this.props.handleTitleClick();
      return;
    }

    this.transitionTo('channels', {instanceName});
  },

  initDialogs() {
    const {checkedItems} = this.props;
    const checkedChannels = checkedItems ? checkedItems : Store.getCheckedItems();

    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'deleteChannelDialog',
        ref: 'deleteChannelDialog',
        title: 'Delete a Channel Socket',
        handleConfirm: Actions.removeChannels,
        isLoading: this.props.isLoading,
        items: checkedChannels,
        groupName: 'Channel Socket'
      }
    }];
  },

  renderItem(item) {
    return (
      <ListItem
        key={`channels-list-item-${item.name}`}
        onIconClick={this.props.checkItem ? this.props.checkItem : Actions.checkItem}
        item={item}
        showDeleteDialog={() => this.showDialog('deleteChannelDialog', item)} />
    );
  },

  render() {
    const {handleSelectAll, handleUnselectAll, checkedItems} = this.props;
    const checkedItemsCount = checkedItems ? checkedItems.length : Store.getNumberOfChecked();

    return (
      <Lists.Container>
        {this.getDialogs()}
        <ColumnList.Header>
          <Column.ColumnHeader
            className="col-xs-12"
            primary={true}
            columnName="CHECK_ICON"
            handleClick={this.handleTitleClick}>
            Channel Sockets
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
            History
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-flex-1">
            Custom publish
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={checkedItemsCount}
              handleSelectAll={handleSelectAll ? handleSelectAll : Actions.selectAll}
              handleUnselectAll={handleUnselectAll ? handleUnselectAll : Actions.uncheckAll}>
              <Lists.MenuItem
                singleItemText="Delete a Channel Socket"
                multipleItemsText="Delete Channel Sockets"
                onTouchTap={() => this.showDialog('deleteChannelDialog')} />
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...this.props}
          emptyItemHandleClick={Actions.showDialog}
          emptyItemContent="Create a Channel Socket"
          key="channels-list"
          renderItem={this.renderItem}/>
      </Lists.Container>
    );
  }
});
