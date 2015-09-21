import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import Radium from 'radium';

// Utils
import Mixins from '../../mixins';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import Actions from './InstancesActions';
import Store from './InstancesStore';
import InstanceDialogActions from './InstanceDialogActions';

import Header from '../Header'

// Components
import MUI from 'material-ui';
import Common from '../../common';
import Container from '../../common/Container/Container.react';
import EmptyContainer from '../../common/Container/EmptyContainer.react';

import InstancesList from './InstancesList.react';
import InstanceDialog from './InstanceDialog.react';
import WelcomeDialog from './WelcomeDialog';

import './Instances.sass';

export default Radium(React.createClass({
  displayName: 'Instances',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(Store),
    Mixins.Dialogs,
    Mixins.Limits
  ],

  componentDidMount() {
    console.info('Instances::componentDidMount');
    if (this.getParams().action === 'add') {
      // Show Add modal
      this.showDialog('addInstanceDialog');
    }
    Store.fetch();
    Actions.setTourConfig(this.getTourConfig())
  },

  componentWillUpdate(nextProps, nextState) {
    console.info('Instances::componentWillUpdate');
    this.hideDialogs(nextState.hideDialogs);
  },

  getStyles() {
    return {
      tourHighlight: {
        color: MUI.Styles.Colors.blue500
      },
      secondLine: {
        marginTop: 16,
        fontSize: '0.8em',
        lineHeight: '1.5em'
      },
      link: {
        color: MUI.Styles.Colors.blue500
      }
    }
  },

  getTourConfig() {
    const styles = this.getStyles();

    function toggleAccountMenu() {
      Header.Actions.toggleAccountMenu();
    }

    return [{
      node: React.findDOMNode(this.refs.myInstancesList),
      text: <div>All your <strong style={styles.tourHighlight}>Instances</strong> will be listed here.<br />
              <div style={styles.secondLine}>
                Instance is a place for all of your
                data and all of your code. Every time you start a new app - we recommend creating
                a new Instance.
              </div>
            </div>,
      radius: 200
    },
    {
      node: React.findDOMNode(this.refs.addInstanceFab),
      text: <div>You can add a new <strong style={styles.tourHighlight}>Instance</strong> by clicking here
              <div style={styles.secondLine}>
                You will see a similar button placed in same screen corner, on other views as well - you will
                use it to add new items in Classes, CodeBoxes, Schedules, Triggers, Webhooks, Users, Groups and Channels
              </div>
            </div>,
      radius: 95
    },
    {
      node: document.getElementById('menu-account'),
      text: <div>
              Use this link to go into your <strong style={styles.tourHighlight}>Account</strong> settings
              <div style={styles.secondLine}>
                Your profile, authentication info and pending invitations list or Billing information (your billing
                plan, payment methods or list of invoices).
              </div>
            </div>,
      radius: 350,
      top: -20,
      left: -180,
      run: toggleAccountMenu
    },
    {
      node: document.getElementById('menu-solutions'),
      text:
        <div>
          Use this link to go into <strong style={styles.tourHighlight}>Solutions</strong> listing<br />
          Browse and install existing Solutions or create a new one.
          <div style={styles.secondLine}>
            Solutions are Syncano app templates made by other users and are a great way to speed up the development
            process of your app.
          </div>
          <div style={styles.secondLine}>
            Read more on Solutions
            in <a style={styles.link} href="http://docs.syncano.com/docs/solutions" target="_blank">our docs</a>.
          </div>
        </div>,
      radius: 100,
      top: -14,
      left: 20
    }]
  },

  onNextStep() {
    Actions.setTourConfig(this.getTourConfig());
    Actions.nextStep();
  },

  handleChangePalette(color, icon) {
    console.info('Instances::handleChangePalette', color, icon);

    Actions.updateInstance(
      Store.getCheckedItem().name, {
        metadata: JSON.stringify({color, icon})
      }
    );
    Actions.uncheckAll()
  },

  handleDelete() {
    console.info('Instances::handleDelete');
    Actions.removeInstances(Store.getCheckedItems());
  },

  handleDeleteShared() {
    console.info('Instances::handleDeleteShared');
    Actions.removeSharedInstance(Store.getCheckedItems(), SessionStore.getUser().id);
  },

  handleItemClick(instanceName) {
    // Redirect to main instance screen
    SessionActions.fetchInstance(instanceName);
    this.transitionTo('instance', {instanceName});
  },

  // Dialogs config
  initDialogs() {
    let checkedItemIconColor = Store.getCheckedItemIconColor();
    let checkedInstances = Store.getCheckedItems();

    return [
      {
        dialog: Common.ColorIconPicker.Dialog,
        params: {
          key: 'pickColorIconDialog',
          ref: 'pickColorIconDialog',
          mode: 'add',
          initialColor: checkedItemIconColor.color,
          initialIcon: checkedItemIconColor.icon,
          handleClick: this.handleChangePalette
        }
      },
      {
        dialog: Common.Dialog,
        params: {
          key: 'deleteInstanceDialog',
          ref: 'deleteInstanceDialog',
          title: 'Delete an Instance',
          actions: [
            {text: 'Cancel', onClick: this.handleCancel},
            {text: 'Confirm', onClick: this.handleDelete}
          ],
          modal: true,
          children: [
            'Do you really want to delete ' + this.getDialogListLength(checkedInstances) + ' Instance(s)?',
            this.getDialogList(checkedInstances),
            <Common.Loading
              type="linear"
              position="bottom"
              show={this.state.isLoading} />
          ]
        }
      },
      {
        dialog: Common.Dialog,
        params: {
          key: 'deleteSharedInstanceDialog',
          ref: 'deleteSharedInstanceDialog',
          title: 'Delete shared Instance',
          actions: [
            {text: 'Cancel', onClick: this.handleCancel},
            {text: 'Confirm', onClick: this.handleDeleteShared}
          ],
          modal: true,
          children: [
            'Do you really want to delete ' + this.getDialogListLength(checkedInstances) + ' Instance(s)?',
            this.getDialogList(checkedInstances),
            <Common.Loading
              type="linear"
              position="bottom"
              show={this.state.isLoading} />
          ]
        }
      }
    ]
  },

  showInstanceDialog() {
    let userEmail = SessionStore.getUser().email;

    InstanceDialogActions.showDialog();
    localStorage.setItem(`welcomeShowed${userEmail}`, true);
  },

  showInstanceEditDialog() {
    InstanceDialogActions.showDialog(Store.getCheckedItem());
  },

  renderDeleteFabButton() {
    if (Store.isSharedInstanceChecked()) {
      return (
        <Common.Fab.TooltipItem
          tooltip="Click here to leave Instance"
          mini={true}
          onClick={this.showDialog.bind(null, 'deleteSharedInstanceDialog')}
          iconClassName="synicon-delete"/>
      )
    }

    return (
      <Common.Fab.TooltipItem
        tooltip="Click here to delete Instances"
        mini={true}
        onClick={this.showDialog.bind(null, 'deleteInstanceDialog')}
        iconClassName="synicon-delete"/>
    )
  },

  render() {
    if (this.state.blocked) {
      return (
        <div className="row vp-5-t">
          <EmptyContainer
            icon='synicon-block-helper'
            text={this.state.blocked}/>
        </div>
      )
    }

    let instances = this.state.items;
    let instancesCount = instances ? instances.length : 0;
    let myInstances = Store.getMyInstances();
    let checkedInstances = Store.getNumberOfChecked();
    let isAnyInstanceSelected = instances !== null && checkedInstances >= 1 && checkedInstances < (instancesCount);
    let markedIcon = 'synicon-checkbox-multiple-marked-outline';
    let blankIcon = 'synicon-checkbox-multiple-blank-outline';
    let userEmail = SessionStore.getUser() ? SessionStore.getUser().email : '';
    let shouldShowWelcomeDialog = this.state.items !== null &&
      Store.getAllInstances().length === 0 &&
      !localStorage.getItem(`welcomeShowed${userEmail}`);

    return (
      <Container id="instances" style={{marginTop: 96, marginLeft: 'auto', marginRight: 'auto', width: '80%'}}>

        <div style={{position: 'fixed', left: 10, bottom: 10}}>
        <MUI.IconButton
          iconClassName="synicon-help-circle"
          onClick={this.onNextStep}
          touch={true}
          iconStyle={{color: 'rgba(0,0,0,.4)'}}/>
        </div>

        <Common.Tour
          config={this.state.tourConfig}
          currentStep={this.state.currentStep}
          visible={this.state.isTourVisible}
          onClick={this.onNextStep}
          showDots={true} />

        {this.renderLimitNotification('instances')}

        <WelcomeDialog
          getStarted={this.showInstanceDialog}
          visible={shouldShowWelcomeDialog}/>

        <InstanceDialog />
        {this.getDialogs()}

        <Common.Show if={checkedInstances > 0}>
          <Common.Fab position="top">
            <Common.Fab.TooltipItem
              tooltip={isAnyInstanceSelected ? 'Click here to select all' : 'Click here to unselect all'}
              mini={true}
              onClick={isAnyInstanceSelected ? Actions.selectAll : Actions.uncheckAll}
              iconClassName={isAnyInstanceSelected ? markedIcon : blankIcon}/>
            {this.renderDeleteFabButton()}
            <Common.Fab.TooltipItem
              tooltip="Click here to customize Instances"
              secondary={true}
              mini={true}
              disabled={checkedInstances > 1}
              onClick={this.showDialog.bind(null, 'pickColorIconDialog')}
              iconClassName="synicon-palette"/>
          </Common.Fab>
        </Common.Show>

        <Common.Fab>
          <Common.Fab.TooltipItem
            ref="addInstanceFab"
            tooltip="Click here to add Instances"
            onClick={this.checkObjectsCount.bind(null, myInstances, 'instances', this.showInstanceDialog)}
            iconClassName="synicon-plus"/>
        </Common.Fab>

        <InstancesList
          ref="myInstancesList"
          name="My instances"
          items={Store.getMyInstances()}
          listType="myInstances"
          viewMode="stream"
          emptyItemHandleClick={this.showInstanceDialog}
          emptyItemContent="Create an instance"/>
        <Common.Show if={this.state.items !== null && Store.getOtherInstances().length && !this.state.isLoading}>
          <InstancesList
            ref="otherInstancesList"
            name="Shared with me"
            items={Store.getOtherInstances()}
            listType="sharedInstances"
            viewMode="stream"/>
        </Common.Show>
      </Container>
    );
  }
}));
