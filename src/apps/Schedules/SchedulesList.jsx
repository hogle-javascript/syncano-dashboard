import React from 'react';
import Router from 'react-router';

import Actions from './SchedulesActions';
import Store from './SchedulesStore';

// Utils
import {DialogsMixin} from '../../mixins';

// Components
import ListItem from './SchedulesListItem';
import {ColumnList} from 'syncano-components';
import {Dialog, Lists} from '../../common';

const Column = ColumnList.Column;

export default React.createClass({
  displayName: 'SchedulesList',

  mixins: [
    Router.State,
    Router.Navigation,
    DialogsMixin
  ],

  getDefaultProps() {
    return {
      emptyItemContent: 'Create a Schedule Socket',
      emptyItemHandleClick: Actions.showDialog,
      checkedItems: Store.getCheckedItems(),
      checkItem: Actions.checkItem,
      handleSelectAll: Actions.selectAll,
      handleUnselectAll: Actions.uncheckAll
    };
  },

  componentWillUpdate(nextProps) {
    console.info('Schedules::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  initDialogs() {
    const {isLoading, checkedItems} = this.props;

    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'removeScheduleDialog',
        ref: 'removeScheduleDialog',
        title: 'Delete a Schedule Socket',
        handleConfirm: Actions.removeSchedules,
        items: checkedItems,
        itemLabelName: 'label',
        groupName: 'Schedule',
        isLoading
      }
    }];
  },

  renderItem(item) {
    const {checkItem} = this.props;

    return (
      <ListItem
        key={`schedules-list-item-${item.id}`}
        onIconClick={checkItem}
        item={item}
        showDeleteDialog={() => this.showDialog('removeScheduleDialog', item)} />
    );
  },

  render() {
    const {handleTitleClick, handleSelectAll, handleUnselectAll, checkedItems, ...other} = this.props;

    return (
      <Lists.Container className="schedules-list">
        {this.getDialogs()}
        <ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON"
            handleClick={handleTitleClick}>
            Schedule Sockets
          </Column.ColumnHeader>
          <Column.ColumnHeader
            className="col-flex-1"
            columnName="DATE">
            Next run
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
            Crontab
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={checkedItems.length}
              handleSelectAll={handleSelectAll}
              handleUnselectAll={handleUnselectAll}>
              <Lists.MenuItem
                singleItemText="Delete a Schedule Socket"
                multipleItemsText="Delete Schedule Sockets"
                onTouchTap={() => this.showDialog('removeScheduleDialog')} />
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...other}
          key="schedules-list"
          renderItem={this.renderItem}/>
      </Lists.Container>
    );
  }
});
