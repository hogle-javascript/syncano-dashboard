import React from 'react';
import Reflux from 'reflux';

import {DialogsMixin} from '../../mixins';

import Actions from './SchedulesActions';
import Store from './SchedulesStore';
import ScriptsActions from '../Scripts/ScriptsActions';

import SchedulesList from './SchedulesList';
import ScheduleDialog from './ScheduleDialog';
import {RaisedButton} from 'syncano-material-ui';
import {Container} from 'syncano-components';
import SocketsInnerToolbar from '../Sockets/SocketsInnerToolbar';

export default React.createClass({
  displayName: 'ScheduleSockets',

  mixins: [
    Reflux.connect(Store),
    DialogsMixin
  ],

  componentWillMount() {
    Actions.fetch();
    ScriptsActions.fetch();
  },

  render() {
    const {isLoading, items, hideDialogs} = this.state;

    return (
      <div>
        <ScheduleDialog />

        <SocketsInnerToolbar>
          <RaisedButton
            label="Add"
            primary={true}
            style={{marginRight: 0}}
            onTouchTap={Actions.showDialog} />
        </SocketsInnerToolbar>

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
