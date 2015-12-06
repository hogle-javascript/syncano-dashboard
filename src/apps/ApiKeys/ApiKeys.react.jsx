import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import Actions from './ApiKeysActions';
import Store from './ApiKeysStore';

// Components
import {IconButton} from 'syncano-material-ui';
import Common from '../../common';
import Container from '../../common/Container/Container.react';

// Local components
import ApiKeysList from './ApiKeysList.react';
import ApiKeyDialog from './ApiKeyDialog.react';

export default React.createClass({

  displayName: 'ApiKeys',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(Store),
    Mixins.Dialog,
    Mixins.Dialogs,
    Mixins.InstanceTabs,
    HeaderMixin
  ],

  componentDidMount() {
    console.info('ApiKeys::componentWillMount');
    Actions.fetch();
  },

  componentWillUpdate(nextProps, nextState) {
    console.info('Channels::componentWillUpdate');
    this.hideDialogs(nextState.hideDialogs);
  },

  showApiKeyDialog() {
    Actions.showDialog();
  },

  render() {
    return (
      <Container>
        <ApiKeyDialog />

        <Common.InnerToolbar title="API Keys">
          <IconButton
            iconClassName="synicon-plus"
            tooltip="Click here to add an API Key"
            onTouchTap={this.showApiKeyDialog}/>
        </Common.InnerToolbar>

        <ApiKeysList
          name="API Keys"
          items={this.state.items}
          isLoading={this.state.isLoading}
          emptyItemHandleClick={this.showApiKeyDialog}
          emptyItemContent="Generate an API Key"/>
      </Container>
    );
  }
});
