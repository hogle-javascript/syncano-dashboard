import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import SchedulesActions from './SchedulesActions';
import SchedulesStore from './SchedulesStore';
import TriggersActions from './TriggersActions';
import TriggersStore from './TriggersStore';
import CodeBoxesActions from '../CodeBoxes/CodeBoxesActions';
import ClassesActions from '../Classes/ClassesActions';

// Components
import MUI from 'material-ui';
import Common from '../../common';
import Container from '../../common/Container/Container.react';

// Local components
import SchedulesList from './SchedulesList.react';
import TriggersList from './TriggersList.react';
import ScheduleDialog from './ScheduleDialog.react';
import TriggerDialog from './TriggerDialog.react';

export default React.createClass({

  displayName: 'Tasks',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(SchedulesStore, 'schedules'),
    Reflux.connect(TriggersStore, 'triggers'),
    Mixins.Dialogs,
    Mixins.InstanceTabs,
    HeaderMixin
  ],

  componentWillUpdate(nextProps, nextState) {
    console.info('Tasks::componentWillUpdate');
    // Merging "hideDialogs
    this.hideDialogs(nextState.schedules.hideDialogs || nextState.triggers.hideDialogs);
  },

  componentDidMount() {
    console.info('Tasks::componentDidMount');
    ClassesActions.fetch();
    CodeBoxesActions.fetch();
    SchedulesActions.fetch();
    TriggersActions.fetch();
  },

  // Dialogs config
  initDialogs() {
    let checkedTriggers  = TriggersStore.getCheckedItems(),
        checkedSchedules = SchedulesStore.getCheckedItems();

    return [
      {
        dialog: Common.Dialog,
        params: {
          ref:    'removeTriggerDialog',
          title:  'Delete Trigger',
          actions: [
            {
              text    : 'Cancel',
              onClick : this.handleCancel},
            {
              text    : 'Yes, I\'m sure',
              onClick : this.handleRemoveTriggers}
          ],
          modal: true,
          children: [
            'Do you really want to delete ' + this.getDialogListLength(checkedTriggers) + ' Trigger(s)?',
            this.getDialogList(checkedTriggers, 'label'),
            <Common.Loading
              type     = 'linear'
              position = 'bottom'
              show     = {this.state.triggers.isLoading} />
          ]
        }
      },
      {
        dialog: Common.Dialog,
        params: {
          ref:    'removeScheduleDialog',
          title:  'Delete Schedule',
          actions: [
            {text: 'Cancel', onClick: this.handleCancel},
            {text: 'Yes, I\'m sure', onClick: this.handleRemoveSchedules}
          ],
          modal: true,
          children: [
            'Do you really want to delete ' + this.getDialogListLength(checkedSchedules) + ' Schedule(s)?',
            this.getDialogList(checkedSchedules, 'label'),
            <Common.Loading
              type     = 'linear'
              position = 'bottom'
              show     = {this.state.schedules.items.isLoading} />
          ]
        }
      }
    ]
  },

  handleRemoveTriggers() {
    console.info('Tasks::handleDelete');
    TriggersActions.removeTriggers(TriggersStore.getCheckedItems());
  },

  handleRemoveSchedules() {
    console.info('Tasks::handleRemoveSchedules');
    SchedulesActions.removeSchedules(SchedulesStore.getCheckedItems());
  },

  uncheckAll() {
    console.info('Tasks::uncheckAll');
    SchedulesActions.uncheckAll();
    TriggersActions.uncheckAll();
  },

  checkSchedule(id, state) {
    console.info('Tasks::checkSchedule');
    SchedulesActions.checkItem(id, state);
    TriggersActions.uncheckAll();
  },

  checkTrigger(id, state) {
    console.info('Tasks::checkSchedule');
    TriggersActions.checkItem(id, state);
    SchedulesActions.uncheckAll();
  },

  showScheduleDialog() {
    SchedulesActions.showDialog();
  },

  showScheduleEditDialog() {
    SchedulesActions.showDialog(SchedulesStore.getCheckedItem());
  },

  showTriggerDialog() {
    TriggersActions.showDialog();
  },

  showTriggerEditDialog() {
    TriggersActions.showDialog(TriggersStore.getCheckedItem());
  },

  render() {
    let checkedSchedules      = SchedulesStore.getNumberOfChecked(),
        checkedTriggers       = TriggersStore.getNumberOfChecked(),
        isAnyScheduleSelected = checkedSchedules >= 1 && checkedSchedules < (this.state.schedules.items.length),
        isAnyTriggerSelected  = checkedTriggers >= 1 && checkedTriggers < (this.state.triggers.items.length),
        markedIcon           = 'synicon-checkbox-multiple-marked-outline',
        blankIcon            = 'synicon-checkbox-multiple-blank-outline';

    return (
      <Container>
        <TriggerDialog />
        <ScheduleDialog />
        {this.getDialogs()}

        <Common.Show if={checkedSchedules > 0}>
          <Common.Fab position="top">
            <Common.Fab.Item
              label         = {isAnyScheduleSelected ? 'Click here to select all' : 'Click here to unselect all'}
              mini          = {true}
              onClick       = {isAnyScheduleSelected ? SchedulesActions.selectAll : SchedulesActions.uncheckAll}
              iconClassName = {isAnyScheduleSelected ? markedIcon : blankIcon} />
            <Common.Fab.Item
              label         = "Click here to delete Schedules"
              mini          = {true}
              onClick       = {this.showDialog.bind(null, 'removeScheduleDialog')}
              iconClassName = "synicon-delete" />
            <Common.Fab.Item
              label         = "Click here to edit Schedule"
              mini          = {true}
              disabled      = {checkedSchedules > 1}
              onClick       = {this.showScheduleEditDialog}
              iconClassName = "synicon-pencil" />
          </Common.Fab>
        </Common.Show>

        <Common.Show if={checkedTriggers > 0}>
          <Common.Fab position="top">
            <Common.Fab.Item
              label         = {isAnyTriggerSelected ? 'Click here to select all' : 'Click here to unselect all'}
              mini          = {true}
              onClick       = {isAnyTriggerSelected ? TriggersActions.selectAll : TriggersActions.uncheckAll}
              iconClassName = {isAnyTriggerSelected ? markedIcon : blankIcon} />
            <Common.Fab.Item
              label         = "Click here to delete Schedules"
              mini          = {true}
              onClick       = {this.showDialog.bind(null, 'removeTriggerDialog')}
              iconClassName = "synicon-delete" />
            <Common.Fab.Item
              label         = "Click here to edit Trigger"
              mini          = {true}
              disabled      = {checkedSchedules > 1}
              onClick       = {this.showTriggerEditDialog}
              iconClassName = "synicon-pencil" />
          </Common.Fab>
        </Common.Show>

        <Common.Fab>
          <Common.Fab.Item
            label         = "Click here to create schedule"
            onClick       = {this.showScheduleDialog}
            iconClassName = "synicon-camera-timer" />
          <Common.Fab.Item
            label         = "Click here to create Trigger"
            onClick       = {this.showTriggerDialog}
            iconClassName = "synicon-arrow-up-bold" />
        </Common.Fab>

        <SchedulesList
          name                 = "Schedules"
          checkItem            = {this.checkSchedule}
          isLoading            = {this.state.schedules.isLoading}
          items                = {this.state.schedules.items}
          emptyItemHandleClick = {this.showScheduleDialog}
          emptyItemContent     = "Create a Schedule" />

        <TriggersList
          name                 = "Triggers"
          checkItem            = {this.checkTrigger}
          isLoading            = {this.state.triggers.isLoading}
          items                = {this.state.triggers.items}
          emptyItemHandleClick = {this.showTriggerDialog}
          emptyItemContent     = "Create a Trigger" />
      </Container>
    );
  }
});
