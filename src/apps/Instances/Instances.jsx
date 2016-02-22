import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Stores and Actions
import SessionStore from '../Session/SessionStore';
import Store from './InstancesStore';
import InstanceDialogActions from './InstanceDialogActions';

// Components
import Header from '../Header';
import {Container, Show, Socket} from 'syncano-components';
import {InnerToolbar} from '../../common';

import InstancesList from './InstancesList';
import SharedInstancesList from './SharedInstancesList';
import InstanceDialog from './InstanceDialog';
// import WelcomeDialog from './WelcomeDialog';

import './Instances.sass';

export default React.createClass({
  displayName: 'Instances',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(Store)
  ],

  componentDidMount() {
    console.info('Instances::componentDidMount');
    if (this.getParams().action === 'add') {
      this.showDialog('addInstanceDialog');
    }
    Store.fetch();
  },

  showInstanceDialog() {
    InstanceDialogActions.showDialog();
  },

  transitionToFirstInstance() {
    let firstInstance = Store.getMyInstances()[0] ? Store.getMyInstances()[0].name : null;

    if (firstInstance) {
      this.transitionTo('instance', {instanceName: firstInstance});
    }
    SessionStore.hideWelcomeDialog();
  },

  render() {
    if (this.state.blocked) {
      return (
        <div className="row vp-5-t">
          <Container.Empty
            icon='synicon-block-helper'
            text={this.state.blocked}/>
        </div>
      );
    }

    return (
      <div>
        <InstanceDialog />

        <Header logo={true}/>

        <InnerToolbar title="Instances">
          <Socket
            tooltip="Create an Instance"
            tooltipPosition="bottom-left"
            onTouchTap={this.showInstanceDialog}/>
        </InnerToolbar>

        <Container id="instances">
          <InstancesList
            ref="myInstancesList"
            name="My instances"
            items={Store.getMyInstances()}
            isLoading={this.state.isLoading}
            hideDialogs={this.state.hideDialogs}
            emptyItemHandleClick={this.showInstanceDialog}
            emptyItemContent="Create an instance" />

          <Show if={this.state.items.length > 0 && Store.getOtherInstances().length > 0 && !this.state.isLoading}>
            <SharedInstancesList
              ref="otherInstancesList"
              name="Shared with me"
              items={Store.getOtherInstances()}
              hideDialogs={this.state.hideDialogs}
              isLoading={this.state.isLoading}/>
          </Show>
        </Container>
      </div>
    );
  }
});
