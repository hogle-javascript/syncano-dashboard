import React from 'react';
import {State, Navigation} from 'react-router';

import Actions from './TriggersActions';
import Store from './TriggersStore';

// Utils
import {DialogsMixin} from '../../mixins';

// Components
import ListItem from './TriggersListItem';
import {ColumnList} from 'syncano-components';
import {Dialog, Lists} from '../../common';

const Column = ColumnList.Column;

export default React.createClass({
  displayName: 'TriggersList',

  mixins: [
    State,
    Navigation,
    DialogsMixin
  ],

  getDefaultProps() {
    return {
      getCheckedItems: Store.getCheckedItems,
      checkItem: Actions.checkItem,
      handleSelectAll: Actions.selectAll,
      handleUnselectAll: Actions.uncheckAll
    };
  },

  componentWillUpdate(nextProps) {
    console.info('Triggers::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  initDialogs() {
    const {isLoading, getCheckedItems} = this.props;

    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'removeTriggerDialog',
        ref: 'removeTriggerDialog',
        title: 'Delete a Trigger',
        handleConfirm: Actions.removeTriggers,
        items: getCheckedItems(),
        itemLabelName: 'label',
        groupName: 'Trigger',
        isLoading
      }
    }];
  },

  renderItem(item) {
    const {checkItem} = this.props;

    return (
      <ListItem
        key={`triggers-list-item-${item.id}`}
        onIconClick={checkItem}
        item={item}
        showDeleteDialog={() => this.showDialog('removeTriggerDialog', item)} />
    );
  },

  render() {
    const {handleTitleClick, handleSelectAll, handleUnselectAll, getCheckedItems, ...other} = this.props;

    return (
      <Lists.Container className="triggers-list">
        {this.getDialogs()}
        <ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON"
            handleClick={handleTitleClick}>
            Trigger Sockets
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-flex-1">
            Data Objects
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-flex-1">
            Script
          </Column.ColumnHeader>
          <Column.ColumnHeader
            className="col-flex-1"
            columnName="DESC">
            Traces
          </Column.ColumnHeader>
          <Column.ColumnHeader
            className="col-flex-1"
            columnName="DESC">
            Signal
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={getCheckedItems().length}
              handleSelectAll={handleSelectAll}
              handleUnselectAll={handleUnselectAll}>
              <Lists.MenuItem
                singleItemText="Delete a Trigger Socket"
                multipleItemsText="Delete Trigger Sockets"
                onTouchTap={() => this.showDialog('removeTriggerDialog')} />
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...other}
          emptyItemContent="Create a Trigger Socket"
          emptyItemHandleClick={Actions.showDialog}
          key="triggers-list"
          renderItem={this.renderItem}/>
      </Lists.Container>
    );
  }
});
