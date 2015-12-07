import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';

// Stores and Actions
import SessionStore from '../Session/SessionStore';
import Store from './InstancesStore';
import InstanceDialogActions from './InstanceDialogActions';

// Components
import {IconButton} from 'syncano-material-ui';
import Common from '../../common';
import Container from '../../common/Container/Container';
import EmptyContainer from '../../common/Container/EmptyContainer';

import InstancesList from './InstancesList';
import SharedInstancesList from './SharedInstancesList';
import InstanceDialog from './InstanceDialog';
import WelcomeDialog from './WelcomeDialog';

import './Instances.sass';

export default React.createClass({

  displayName: 'Instances',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(Store),
    Mixins.Dialog
  ],

  componentDidMount() {
    console.info('Instances::componentDidMount');
    if (this.getParams().action === 'add') {
      // Show Add modal
      this.showDialog('addInstanceDialog');
    }
    Store.fetch();
  },

  showInstanceDialog() {
    let userEmail = SessionStore.getUser().email;

    InstanceDialogActions.showDialog();
    localStorage.setItem(`welcomeShowed${userEmail}`, true);
  },

  renderDeleteFabButton() {
    if (Store.isSharedInstanceChecked()) {
      return (
        <Common.Fab.TooltipItem
          tooltip="Click here to leave Instance"
          mini={true}
          onClick={this.showDialog.bind(null, 'deleteSharedInstanceDialog')}
          iconClassName="synicon-delete"/>
      );
    }

    return (
      <Common.Fab.TooltipItem
        tooltip="Click here to delete Instances"
        mini={true}
        onClick={this.showDialog.bind(null, 'deleteInstanceDialog')}
        iconClassName="synicon-delete"/>
    );
  },

  render() {
    if (this.state.blocked) {
      return (
        <div className="row vp-5-t">
          <EmptyContainer
            icon='synicon-block-helper'
            text={this.state.blocked}/>
        </div>
      );
    }

    let userEmail = SessionStore.getUser() ? SessionStore.getUser().email : '';
    let shouldShowWelcomeDialog = this.state.items !== null && !this.state.isLoading &&
      Store.getAllInstances().length === 0 &&
      !localStorage.getItem(`welcomeShowed${userEmail}`);

    return (
      <Container id="instances" style={{marginTop: 96, marginLeft: 'auto', marginRight: 'auto', width: '80%'}}>

        <WelcomeDialog
          getStarted={this.showInstanceDialog}
          visible={shouldShowWelcomeDialog}/>
        <Common.InnerToolbar title="Instances">
          <IconButton
            iconClassName="synicon-plus"
            tooltip="Click here to add Instances"
            onTouchTap={this.showInstanceDialog}/>
        </Common.InnerToolbar>

        <InstanceDialog />

        <InstancesList
          ref="myInstancesList"
          name="My instances"
          items={Store.getMyInstances()}
          isLoading={this.state.isLoading}
          hideDialogs={this.state.hideDialogs}
          emptyItemHandleClick={this.showInstanceDialog}
          emptyItemContent="Create an instance" />

        <Common.Show if={this.state.items !== [] && Store.getOtherInstances().length && !this.state.isLoading}>
          <SharedInstancesList
            ref="otherInstancesList"
            name="Shared with me"
            items={Store.getOtherInstances()}
            hideDialogs={this.state.hideDialogs}
            isLoading={this.state.isLoading}/>
        </Common.Show>
      </Container>
    );
  }
});
