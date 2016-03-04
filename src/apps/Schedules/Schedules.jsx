import React from 'react';
import {State, Navigation} from 'react-router';
import Reflux from 'reflux';

import {DialogsMixin} from '../../mixins';

import Actions from './SchedulesActions';
import Store from './SchedulesStore';
import ScriptsActions from '../Scripts/ScriptsActions';

import SchedulesList from './SchedulesList';
import ScheduleDialog from './ScheduleDialog';
import {Container, Socket} from 'syncano-components';
import {InnerToolbar} from '../../common';

export default React.createClass({

  displayName: 'ScheduleSockets',

  mixins: [
    State,
    Navigation,

    Reflux.connect(Store),
    DialogsMixin
  ],

  componentWillMount() {
    Actions.fetch();
    ScriptsActions.fetch();
  },

  showScheduleDialog() {
    Actions.showDialog();
  },

  render() {
    return (
      <div>
        <ScheduleDialog />

        <InnerToolbar title="Schedule Sockets">
          <Socket.Schedule
            tooltipPosition="bottom-left"
            onTouchTap={this.showScheduleDialog}/>
        </InnerToolbar>

        <Container>
          <SchedulesList
            name="Schedules"
            isLoading={this.state.isLoading}
            items={this.state.items}
            hideDialogs={this.state.hideDialogs}
            emptyItemHandleClick={this.showScheduleDialog}
            emptyItemContent="Create a Schedule Socket"/>
        </Container>
      </div>
    );
  }
});
