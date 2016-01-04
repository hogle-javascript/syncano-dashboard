import React from 'react';
import Router from 'react-router';

import Actions from './SchedulesActions';
import Store from './SchedulesStore';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import Mixins from '../../mixins';

// Components
import ListItem from './SchedulesListItem';
import {Dialog, ColumnList, Lists} from '../../common';

let Column = ColumnList.Column;

export default React.createClass({

  displayName: 'SchedulesList',

  mixins: [
    Router.State,
    Router.Navigation,
    HeaderMixin,
    Mixins.Dialogs
  ],

  componentWillUpdate(nextProps) {
    console.info('Schedules::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  initDialogs() {
    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'removeScheduleDialog',
        ref: 'removeScheduleDialog',
        title: 'Delete a Schedule Socket',
        handleConfirm: Actions.removeSchedules,
        isLoading: this.props.isLoading,
        items: Store.getCheckedItems(),
        itemLabelName: 'label',
        groupName: 'Schedule'
      }
    }];
  },

  renderItem(item) {
    return (
      <ListItem
        key={`schedules-list-item-${item.id}`}
        onIconClick={Actions.checkItem}
        item={item}
        showDeleteDialog={this.showDialog.bind(null, 'removeScheduleDialog', item)}/>
    );
  },

  render() {
    let checkedItems = Store.getNumberOfChecked();

    return (
      <Lists.Container className="schedules-list">
        {this.getDialogs()}
        <ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON"
            handleClick={this.props.handleTitleClick}>
            {this.props.name}
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="ID">ID</Column.ColumnHeader>
          <Column.ColumnHeader className="col-flex-1" columnName="DESC">Crontab</Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-md-4">
            Snippet
          </Column.ColumnHeader>
          <Column.ColumnHeader className="col-sm-4"columnName="DESC">Traces</Column.ColumnHeader>
          <Column.ColumnHeader className="col-sm-3" columnName="DATE">Next run</Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={checkedItems}
              actions={Actions}>
              <Lists.MenuItem
                singleItemText="Delete a Schedule Socket"
                multipleItemsText="Delete Schedule Sockets"
                onTouchTap={this.showDialog.bind(null, 'removeScheduleDialog')}/>
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...this.props}
          key="schedules-list"
          renderItem={this.renderItem}/>
      </Lists.Container>
    );
  }
});

