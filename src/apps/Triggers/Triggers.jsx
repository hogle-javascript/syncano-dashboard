import React from 'react';
import Reflux from 'reflux';

import {DialogsMixin} from '../../mixins';

import Actions from './TriggersActions';
import Store from './TriggersStore';
import ScriptsActions from '../Scripts/ScriptsActions';

import {RaisedButton} from 'syncano-material-ui';
import {Container} from 'syncano-components';
import TriggersList from './TriggersList';
import TriggerDialog from './TriggerDialog';
import SocketsInnerToolbar from '../Sockets/SocketsInnerToolbar';

export default React.createClass({
  displayName: 'TriggerSockets',

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
        <TriggerDialog />

        <SocketsInnerToolbar>
          <RaisedButton
            label="Add"
            primary={true}
            style={{marginRight: 0}}
            onTouchTap={Actions.showDialog}/>
        </SocketsInnerToolbar>

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
