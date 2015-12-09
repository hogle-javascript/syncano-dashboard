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

  showScheduleDialog() {
    Actions.showDialog();
  },

  render() {
    return (
      <Container>
        <ScheduleDialog />

        <Common.InnerToolbar title="Schedule Sockets">
          <Common.Socket.Schedule
            tooltipPosition="bottom-left"
            onTouchTap={this.showScheduleDialog}/>
        </Common.InnerToolbar>

        <SchedulesList
          name="Schedules"
          isLoading={this.state.isLoading}
          items={this.state.items}
          hideDialogs={this.state.hideDialogs}
          emptyItemHandleClick={this.showScheduleDialog}
          emptyItemContent="Create a Schedule Socket"/>
      </Container>
    );
  }
});
