import React from 'react';
import {State, Navigation} from 'react-router';
import Reflux from 'reflux';

import Actions from './TriggersActions';
import Store from './TriggersStore';
import ScriptsActions from '../Scripts/ScriptsActions';

import {Container, Socket} from 'syncano-components';
import {InnerToolbar} from '../../common';
import TriggersList from './TriggersList';
import TriggerDialog from './TriggerDialog';

export default React.createClass({

  displayName: 'TriggerSockets',

  mixins: [
    State,
    Navigation,

    Reflux.connect(Store)
  ],

  componentWillMount() {
    Actions.fetch();
    ScriptsActions.fetch();
  },

  showTriggerDialog() {
    Actions.showDialog();
  },

  render() {
    return (
      <div>
        <TriggerDialog />

        <InnerToolbar title="Trigger Sockets">
          <Socket.Trigger
            tooltipPosition="bottom-left"
            onTouchTap={this.showTriggerDialog}/>
        </InnerToolbar>

        <Container>
          <TriggersList
            name="Triggers"
            isLoading={this.state.isLoading}
            items={this.state.items}
            hideDialogs={this.state.hideDialogs}
            emptyItemHandleClick={this.showTriggerDialog}
            emptyItemContent="Create a Trigger Socket"/>
        </Container>
      </div>
    );
  }
});
