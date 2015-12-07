import React from 'react';
import Router from 'react-router';
import Reflux from 'reflux';

import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

import Actions from './SchedulesActions';
import Store from './SchedulesStore';
import CodeBoxesActions from '../CodeBoxes/CodeBoxesActions';

import SchedulesList from './SchedulesList';
import ScheduleDialog from './ScheduleDialog';
import Common from '../../common';
import Container from '../../common/Container/Container';

export default React.createClass({

  displayName: 'ScheduleSockets',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(Store),
    Mixins.Dialogs,
    Mixins.InstanceTabs,
    HeaderMixin
  ],

  componentWillMount() {
    Actions.fetch();
    CodeBoxesActions.fetch();
  },

  componentWillUpdate(nextProps, nextState) {
    console.info('Tasks::componentWillUpdate');
    this.hideDialogs(nextState.hideDialogs);
  },

  handleRemoveSchedules() {
    console.info('Tasks::handleRemoveSchedules');
    Actions.removeSchedules(Store.getCheckedItems());
  },

  checkSchedule(id, state) {
    console.info('Tasks::checkSchedule');
    Actions.checkItem(id, state);
  },

  initDialogs() {
    let checkedSchedules = Store.getCheckedItems();

    return [
      {
        dialog: Common.Dialog,
        params: {
          ref: 'removeScheduleDialog',
          title: 'Delete a Schedule',
          onRequestClose: this.handleCancel,
          actions: [
            {text: 'Cancel', onClick: this.handleCancel},
            {text: 'Confirm', onClick: this.handleRemoveSchedules}
          ],
          children: [
            'Do you really want to delete ' + this.getDialogListLength(checkedSchedules) + ' Schedule(s)?',
            this.getDialogList(checkedSchedules, 'label'),
            <Common.Loading
              type='linear'
              position='bottom'
              show={this.state.items.isLoading}/>
          ]
        }
      }
    ];
  },

  showScheduleDialog() {
    Actions.showDialog();
  },

  render() {
    let checkedSchedules = Store.getNumberOfChecked();
    let isAnyScheduleSelected = checkedSchedules >= 1 && checkedSchedules < (this.state.items.length);
    let markedIcon = 'synicon-checkbox-multiple-marked-outline';
    let blankIcon = 'synicon-checkbox-multiple-blank-outline';

    return (
      <Container>
        <ScheduleDialog />
        {this.getDialogs()}

        <Common.InnerToolbar title="Schedule Sockets" />

        <Common.Show if={checkedSchedules > 0}>
          <Common.Fab position="top">
            <Common.Fab.TooltipItem
              tooltip={isAnyScheduleSelected ? 'Click here to select all' : 'Click here to unselect all'}
              mini={true}
              onClick={isAnyScheduleSelected ? Actions.selectAll : Actions.uncheckAll}
              iconClassName={isAnyScheduleSelected ? markedIcon : blankIcon}/>
            <Common.Fab.TooltipItem
              tooltip="Click here to delete Schedule Sockets"
              mini={true}
              onClick={this.showDialog.bind(null, 'removeScheduleDialog')}
              iconClassName="synicon-delete"/>
          </Common.Fab>
        </Common.Show>

        <Common.Fab>
          <Common.Fab.TooltipItem
            tooltip="Click here to create a Schedule Socket"
            onClick={this.showScheduleDialog}
            iconClassName="synicon-arrow-up-bold"/>
        </Common.Fab>

        <div>
          <SchedulesList
            name="Schedule Sockets"
            checkItem={this.checkSchedule}
            isLoading={this.state.isLoading}
            items={this.state.items}
            emptyItemHandleClick={this.showScheduleDialog}
            emptyItemContent="Create a Schedule Socket"/>
        </div>
      </Container>
    );
  }
});
