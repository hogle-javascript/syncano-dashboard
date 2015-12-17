import React from 'react';
import Router from 'react-router';

import Actions from './SchedulesActions';
import Store from './SchedulesStore';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import Mixins from '../../mixins';

// Components
import {FlatButton} from 'syncano-material-ui';
import ListItem from './SchedulesListItem';
import Common from '../../common';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'SchedulesList',

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
    console.info('Schedules::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  handleItemIconClick(id, state) {
    Actions.checkItem(id, state);
  },

  handleRemoveSchedules() {
    console.info('Schedules::handleRemoveSchedules');
    Actions.removeSchedules(Store.getCheckedItems());
  },

  initDialogs() {
    let checkedSchedules = Store.getCheckedItems();

    return [
      {
        dialog: Common.Dialog,
        params: {
          key: 'removeScheduleDialog',
          ref: 'removeScheduleDialog',
          title: 'Delete a Schedule Socket',
          actions: [
            <FlatButton
              label="Cancel"
              secondary={true}
              onTouchTap={this.handleCancel.bind(null, 'removeScheduleDialog')}/>,
            <FlatButton
              label="Confirm"
              primary={true}
              keyboardFocused={true}
              onTouchTap={this.handleRemoveSchedules}/>
          ],
          modal: true,
          children: [
            `Do you really want to delete ${Store.getDeleteItemsPhrase('Schedule')}?`,
            this.getDialogList(checkedSchedules, 'label'),
            <Common.Loading
              type='linear'
              position='bottom'
              show={this.props.items.isLoading}/>
          ]
        }
      }
    ];
  },

  renderItem(item) {
    return (
      <ListItem
        onIconClick={this.handleItemIconClick}
        item={item}
        showDeleteDialog={this.showMenuDialog.bind(null, item.label, Actions.removeSchedules.bind(null, [item]))}/>
    );
  },

  render() {
    let checkedItems = Store.getNumberOfChecked();

    return (
      <Common.Lists.Container className="schedules-list">
        {this.getDialogs()}
        <Column.MenuDialog ref="menuDialog"/>
        <Common.ColumnList.Header>
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
            <Common.Lists.Menu
              checkedItemsCount={checkedItems}
              actions={Actions}>
              <Common.Lists.MenuItem
                singleItemText="Delete a Schedule Socket"
                multipleItemsText="Delete Schedule Sockets"
                onTouchTap={this.showDialog.bind(null, 'removeScheduleDialog')}/>
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

