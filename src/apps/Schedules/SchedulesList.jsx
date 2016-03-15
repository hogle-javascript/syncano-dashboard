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

  componentWillUpdate(nextProps) {
    console.info('Schedules::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  handleTitleClick() {
    const instanceName = this.getParams().instanceName;

    if (this.props.handleTitleClick) {
      this.props.handleTitleClick();
      return;
    }

    this.transitionTo('schedules', {instanceName});
  },

  initDialogs() {
    const {checkedItems} = this.props;
    const checkedSchedules = checkedItems ? checkedItems : Store.getCheckedItems();

    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'removeScheduleDialog',
        ref: 'removeScheduleDialog',
        title: 'Delete a Schedule Socket',
        handleConfirm: Actions.removeSchedules,
        isLoading: this.props.isLoading,
        items: checkedSchedules,
        itemLabelName: 'label',
        groupName: 'Schedule'
      }
    }];
  },

  renderItem(item) {
    return (
      <ListItem
        key={`schedules-list-item-${item.id}`}
        onIconClick={this.props.checkItem ? this.props.checkItem : Actions.checkItem}
        item={item}
        showDeleteDialog={() => this.showDialog('removeScheduleDialog', item)} />
    );
  },

  render() {
    const {handleSelectAll, handleUnselectAll, checkedItems} = this.props;
    const checkedItemsCount = checkedItems ? checkedItems.length : Store.getNumberOfChecked();

    return (
      <Lists.Container className="schedules-list">
        {this.getDialogs()}
        <ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON"
            handleClick={this.handleTitleClick}>
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
              checkedItemsCount={checkedItemsCount}
              handleSelectAll={handleSelectAll ? handleSelectAll : Actions.selectAll}
              handleUnselectAll={handleUnselectAll ? handleUnselectAll : Actions.uncheckAll}>
              <Lists.MenuItem
                singleItemText="Delete a Schedule Socket"
                multipleItemsText="Delete Schedule Sockets"
                onTouchTap={() => this.showDialog('removeScheduleDialog')} />
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...this.props}
          emptyItemHandleClick={Actions.showDialog}
          emptyItemContent="Create a Schedule Socket"
          key="schedules-list"
          renderItem={this.renderItem}/>
      </Lists.Container>
    );
  }
});
