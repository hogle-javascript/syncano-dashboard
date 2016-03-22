import React from 'react';
import {State, Navigation} from 'react-router';
import Reflux from 'reflux';

import Actions from './TriggersActions';
import Store from './TriggersStore';
import ScriptsActions from '../Scripts/ScriptsActions';

import {RaisedButton} from 'syncano-material-ui';
import {Container} from 'syncano-components';
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
    const {isLoading, items, hideDialogs} = this.state;

    return (
      <div>
        <TriggerDialog />

        <InnerToolbar title="Trigger Sockets">
          <RaisedButton
            label="Add"
            primary={true}
            style={{marginRight: 0}}
            onTouchTap={Actions.showDialog}/>
        </InnerToolbar>

        <Container>
          <TriggersList
            isLoading={isLoading}
            items={items}
            hideDialogs={hideDialogs} />
        </Container>
      </div>
    );
  }
});
