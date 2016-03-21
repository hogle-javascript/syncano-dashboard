import React from 'react';
import {State, Navigation} from 'react-router';
import Reflux from 'reflux';

import {DialogsMixin} from '../../mixins';

import Actions from './SchedulesActions';
import Store from './SchedulesStore';
import ScriptsActions from '../Scripts/ScriptsActions';

import SchedulesList from './SchedulesList';
import ScheduleDialog from './ScheduleDialog';
import {RaisedButton} from 'syncano-material-ui';
import {Container} from 'syncano-components';
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
    const {isLoading, items, hideDialogs} = this.state;

    return (
      <div>
        <ScheduleDialog />

        <InnerToolbar title="Schedule Sockets">
          <RaisedButton
            label="Add"
            primary={true}
            style={{marginRight: 0}}
            onTouchTap={Actions.showDialog} />
        </InnerToolbar>

        <Container>
          <SchedulesList
            name="Schedules"
            isLoading={isLoading}
            items={items}
            hideDialogs={hideDialogs} />
        </Container>
      </div>
    );
  }
});
