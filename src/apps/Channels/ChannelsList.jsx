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

  getDefaultProps() {
    return {
      emptyItemContent: 'Create a Channel Socket',
      emptyItemHandleClick: Actions.showDialog,
      getCheckedItems: Store.getCheckedItems,
      checkItem: Actions.checkItem,
      handleSelectAll: Actions.selectAll,
      handleUnselectAll: Actions.uncheckAll
    };
  },

  componentWillUpdate(nextProps) {
    console.info('Channels::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  initDialogs() {
    const {isLoading, getCheckedItems} = this.props;

    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'deleteChannelDialog',
        ref: 'deleteChannelDialog',
        title: 'Delete a Channel Socket',
        handleConfirm: Actions.removeChannels,
        items: getCheckedItems(),
        groupName: 'Channel Socket',
        isLoading
      }
    }];
  },

  renderItem(item) {
    const {checkItem} = this.props;

    return (
      <ListItem
        key={`channels-list-item-${item.name}`}
        onIconClick={checkItem}
        item={item}
        showDeleteDialog={() => this.showDialog('deleteChannelDialog', item)} />
    );
  },

  render() {
    const {handleTitleClick, handleSelectAll, handleUnselectAll, getCheckedItems, ...other} = this.props;

    return (
      <Lists.Container>
        {this.getDialogs()}
        <ColumnList.Header>
          <Column.ColumnHeader
            className="col-xs-12"
            primary={true}
            columnName="CHECK_ICON"
            handleClick={handleTitleClick}>
            Channels
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-flex-1">
            Description
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
              checkedItemsCount={getCheckedItems().length}
              handleSelectAll={handleSelectAll}
              handleUnselectAll={handleUnselectAll}>
              <Lists.MenuItem onTouchTap={() => this.showDialog('deleteChannelDialog')} />
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...other}
          key="channels-list"
          renderItem={this.renderItem}/>
      </Lists.Container>
    );
  }
});
