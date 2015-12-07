import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import SchedulesActions from './SchedulesActions';
import SchedulesStore from './SchedulesStore';
import TriggersActions from './TriggersActions';
import TriggersStore from './TriggersStore';
import CodeBoxesActions from '../CodeBoxes/CodeBoxesActions';
import ClassesActions from '../Classes/ClassesActions';

// Components
import {IconButton} from 'syncano-material-ui';
import Common from '../../common';
import Container from '../../common/Container/Container';

// Local components
import SchedulesList from './SchedulesList';
import TriggersList from './TriggersList';
import ScheduleDialog from './ScheduleDialog';
import TriggerDialog from './TriggerDialog';

export default React.createClass({

  displayName: 'Tasks',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(SchedulesStore, 'schedules'),
    Reflux.connect(TriggersStore, 'triggers'),
    Mixins.Dialog,
    Mixins.Dialogs,
    Mixins.InstanceTabs,
    HeaderMixin
  ],

  componentDidMount() {
    console.info('Tasks::componentDidMount');
    ClassesActions.fetch();
    CodeBoxesActions.fetch();
    SchedulesActions.fetch();
    TriggersActions.fetch();
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

  showTriggerDialog() {
    TriggersActions.showDialog();
  },

  render() {
    return (
      <Container>
        <TriggerDialog />
        <ScheduleDialog />

        <Common.InnerToolbar title="Tasks">
          <IconButton
            iconClassName="synicon-camera-timer"
            tooltip="Click here to create a Schedule"
            onTouchTap={this.showScheduleDialog}/>
          <IconButton
            iconClassName="synicon-arrow-up-bold"
            tooltip="Click here to create a Trigger"
            onTouchTap={this.showTriggerDialog}/>
        </Common.InnerToolbar>

        <SchedulesList
          name="Schedules"
          checkItem={this.checkSchedule}
          isLoading={this.state.schedules.isLoading}
          items={this.state.schedules.items}
          hideDialogs={this.state.schedules.hideDialogs}
          emptyItemHandleClick={this.showScheduleDialog}
          emptyItemContent="Create a Schedule"/>

        <TriggersList
          name="Triggers"
          checkItem={this.checkTrigger}
          isLoading={this.state.triggers.isLoading}
          items={this.state.triggers.items}
          hideDialogs={this.state.triggers.hideDialogs}
          emptyItemHandleClick={this.showTriggerDialog}
          emptyItemContent="Create a Trigger"/>
      </Container>
    );
  }
});
