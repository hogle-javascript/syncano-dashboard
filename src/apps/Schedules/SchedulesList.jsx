import React from 'react';
import Router from 'react-router';

import Actions from './SchedulesActions';
import Store from './SchedulesStore';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import Mixins from '../../mixins';

// Components
import ListItem from './SchedulesListItem';
import {IconMenu} from 'syncano-material-ui';
import MenuItem from '../../../node_modules/syncano-material-ui/lib/menus/menu-item';
import Common from '../../common';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'SchedulesList',

  mixins: [
    Router.State,
    Router.Navigation,
    HeaderMixin,
    Mixins.Dialog,
    Mixins.Dialogs,
    Mixins.List
  ],

  getInitialState() {
    return {};
  },

  componentWillUpdate(nextProps) {
    console.info('Schedules::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  handleItemIconClick(id, state) {
    this.props.checkItem(id, state);
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
          title: 'Delete a Schedule',
          actions: [
            {text: 'Cancel', onClick: this.handleCancel.bind(null, 'removeScheduleDialog')},
            {text: 'Confirm', onClick: this.handleRemoveSchedules}
          ],
          modal: true,
          children: [
            'Do you really want to delete ' + this.getDialogListLength(checkedSchedules) + ' Schedule(s)?',
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
          <Column.ColumnHeader
            columnName="DESC"
            className="col-sm-6">
            CodeBox
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="DESC">Crontab</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DESC">Traces</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Next run</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Created</Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <IconMenu iconButtonElement={this.renderListIconMenuButton()}>
              <MenuItem
                primaryText="Delete Schedule(s)"
                disabled={!checkedItems}
                onTouchTap={this.showDialog.bind(null, 'removeScheduleDialog')}/>
              <MenuItem
                primaryText="Unselect All"
                onTouchTap={Actions.uncheckAll}/>
              <MenuItem
                primaryText="Select All"
                onTouchTap={Actions.selectAll}/>
            </IconMenu>
          </Column.ColumnHeader>
        </Common.ColumnList.Header>
        <Common.Lists.List>
          <Common.Loading show={this.props.isLoading}>
            {this.renderList()}
          </Common.Loading>
        </Common.Lists.List>
      </Common.Lists.Container>
    );
  }
});

