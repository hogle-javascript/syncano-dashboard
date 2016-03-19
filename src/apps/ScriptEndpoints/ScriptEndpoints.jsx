import React from 'react';
import Reflux from 'reflux';
import {State, Navigation} from 'react-router';

// Stores and Actions
import Actions from './ScriptEndpointsActions';
import ScriptsActions from '../Scripts/ScriptsActions';
import Store from './ScriptEndpointsStore';

// Components
import {RaisedButton} from 'syncano-material-ui';
import {Container} from 'syncano-components';
import {InnerToolbar} from '../../common';

// Local components
import ScriptEndpointsList from './ScriptEndpointsList';
import ScriptEndpointDialog from './ScriptEndpointDialog';

export default React.createClass({
  displayName: 'ScriptEndpoints',

  mixins: [
    State,
    Navigation,
    Reflux.connect(Store)
  ],

  componentDidMount() {
    console.info('Data::componentDidMount');
    Actions.fetch();
    ScriptsActions.fetch();
  },

  showScriptEndpointDialog() {
    Actions.showDialog();
  },

  render() {
    const {items, hideDialogs, isLoading} = this.state;

    return (
      <div>
        <ScriptEndpointDialog />

        <InnerToolbar title="Script Endpoints">
          <RaisedButton
            label="Create"
            style={{marginRight: 0}}
            primary={true}
            onTouchTap={Actions.showDialog}/>
        </InnerToolbar>

        <Container>
          <ScriptEndpointsList
            name="Script Endpoints"
            isLoading={isLoading}
            items={items}
            hideDialogs={hideDialogs}
            emptyItemContent="Create a Script Endpoint"/>
        </Container>
      </div>
    );
  }
});
