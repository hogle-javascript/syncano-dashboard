import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Stores and Actions
import Actions from './ScriptEndpointsActions';
import ScriptsActions from '../Scripts/ScriptsActions';
import Store from './ScriptEndpointsStore';

// Components
import {Container, Socket} from 'syncano-components';
import {InnerToolbar} from '../../common';

// Local components
import ScriptEndpointsList from './ScriptEndpointsList';
import ScriptEndpointDialog from './ScriptEndpointDialog';

export default React.createClass({
  displayName: 'ScriptEndpoints',

  mixins: [
    Router.State,
    Router.Navigation,
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
          <Socket.ScriptEndpoint
            tooltipPosition="bottom-left"
            onTouchTap={this.showScriptEndpointDialog}/>
        </InnerToolbar>

        <Container>
          <ScriptEndpointsList
            name="Script Endpoints"
            isLoading={isLoading}
            items={items}
            hideDialogs={hideDialogs}
            emptyItemHandleClick={this.showScriptEndpointDialog}
            emptyItemContent="Create a Script Endpoint"/>
        </Container>
      </div>
    );
  }
});
