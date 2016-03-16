import React from 'react';
import Router from 'react-router';

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
    Router.State,
    Router.Navigation,
    DialogsMixin
  ],

  getDefaultProps() {
    return {
      checkedItems: Store.getCheckedItems()
    };
  },

  componentWillUpdate(nextProps) {
    console.info('Triggers::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  handleItemClick(itemId) {
    this.transitionTo('trigger-traces', {
      instanceName: this.getParams().instanceName,
      triggerId: itemId
    });
  },

  initDialogs() {
    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'removeTriggerDialog',
        ref: 'removeTriggerDialog',
        title: 'Delete a Trigger',
        handleConfirm: Actions.removeTriggers,
        isLoading: this.props.isLoading,
        items: this.props.checkedItems,
        itemLabelName: 'label',
        groupName: 'Trigger'
      }
    }];
  },

  renderItem(item) {
    return (
      <ListItem
        key={`triggers-list-item-${item.id}`}
        onIconClick={this.props.checkItem ? this.props.checkItem : Actions.checkItem}
        item={item}
        showDeleteDialog={() => this.showDialog('removeTriggerDialog', item)} />
    );
  },

  render() {
    const {handleTitleClick, handleSelectAll, handleUnselectAll, checkedItems, ...other} = this.props;

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
            Class
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
              checkedItemsCount={checkedItems.length}
              handleSelectAll={handleSelectAll ? handleSelectAll : Actions.selectAll}
              handleUnselectAll={handleUnselectAll ? handleUnselectAll : Actions.uncheckAll}>
              <Lists.MenuItem
                singleItemText="Delete a Trigger Socket"
                multipleItemsText="Delete Trigger Sockets"
                onTouchTap={() => this.showDialog('removeTriggerDialog')} />
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...other}
          emptyItemHandleClick={Actions.showDialog}
          emptyItemContent="Create a Trigger Socket"
          key="triggers-list"
          renderItem={this.renderItem}/>
      </Lists.Container>
    );
  }
});
