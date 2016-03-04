import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Stores and Actions
import Actions from './ApiKeysActions';
import Store from './ApiKeysStore';

// Components
import {Container, Socket} from 'syncano-components';
import {InnerToolbar} from '../../common';

// Local components
import ApiKeysList from './ApiKeysList';
import ApiKeyDialog from './ApiKeyDialog';

export default React.createClass({

  displayName: 'ApiKeys',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(Store)
  ],

  componentDidMount() {
    console.info('ApiKeys::componentWillMount');
    Actions.fetch();
  },

  showApiKeyDialog() {
    Actions.showDialog();
  },

  render() {
    return (
      <div>
        <ApiKeyDialog />

        <InnerToolbar title="API Keys">
          <Socket
            tooltip="Click here to add an API Key"
            onTouchTap={this.showApiKeyDialog}/>
        </InnerToolbar>

        <Container>
          <ApiKeysList
            name="API Keys"
            items={this.state.items}
            isLoading={this.state.isLoading}
            hideDialogs={this.state.hideDialogs}
            emptyItemHandleClick={this.showApiKeyDialog}
            emptyItemContent="Generate an API Key"/>
        </Container>
      </div>
    );
  }
});
