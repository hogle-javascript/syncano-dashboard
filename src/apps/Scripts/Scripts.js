import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import {DialogsMixin, InstanceTabsMixin} from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import Actions from './ScriptsActions';
import Store from './ScriptsStore';

// Components
import {Container, Socket} from 'syncano-components';
import {InnerToolbar} from '../../common';

// Local components
import ScriptsList from './ScriptsList';
import ScriptDialog from './ScriptDialog';

export default React.createClass({

  displayName: 'Scripts',

  mixins: [
    Router.State,
    Router.Navigation,
    Reflux.connect(Store),
    DialogsMixin,
    InstanceTabsMixin,
    HeaderMixin
  ],

  componentDidMount() {
    console.info('Scripts::componentDidMount');
    if (this.getParams().action === 'add') {
      // Show Add modal
      this.showScriptDialog();
    }
    Actions.fetch();
  },

  showScriptDialog() {
    Actions.showDialog();
  },

  render() {
    return (
      <div>
        <ScriptDialog />

        <InnerToolbar title="Scripts">
          <Socket
            tooltip="Create a Script"
            tooltipPosition="bottom-left"
            onTouchTap={this.showScriptDialog}/>
        </InnerToolbar>

        <Container>
          <ScriptsList
            name="Scripts"
            items={this.state.items}
            hideDialogs={this.state.hideDialogs}
            emptyItemHandleClick={this.showScriptDialog}
            emptyItemContent="Create a Script"/>
        </Container>
      </div>
    );
  }
});
