import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Stores and Actions
import SessionStore from '../Session/SessionStore';
import Actions from './InstancesActions';
import Store from './InstancesStore';
import InstanceDialogActions from './InstanceDialogActions';

// Components
import {RaisedButton} from 'syncano-material-ui';
import {Container, Show} from 'syncano-components';
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
    Actions.fetch();
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
    const {blocked, isLoading, hideDialogs, items} = this.state;


    if (blocked) {
      return (
        <div className="row vp-5-t">
          <Container.Empty
            icon='synicon-block-helper'
            text={blocked}/>
        </div>
      );
    }

    return (
      <div>
        <InstanceDialog />

        <InnerToolbar title="Instances">
          <RaisedButton
            label="Create"
            primary={true}
            style={{marginRight: 0}}
            onTouchTap={InstanceDialogActions.showDialog} />
        </InnerToolbar>

        <Container id="instances">
          <InstancesList
            ref="myInstancesList"
            name="My instances"
            items={Store.getMyInstances()}
            isLoading={isLoading}
            hideDialogs={hideDialogs}
            emptyItemHandleClick={this.showInstanceDialog}
            emptyItemContent="Create an instance" />

          <Show if={items.length && Store.getOtherInstances().length && !isLoading}>
            <SharedInstancesList
              ref="otherInstancesList"
              items={Store.getOtherInstances()}
              hideDialogs={hideDialogs}
              isLoading={isLoading}/>
          </Show>
        </Container>
      </div>
    );
  }
});
