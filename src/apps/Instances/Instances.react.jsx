import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import Radium from 'radium';

// Utils
import Mixins from '../../mixins';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import Actions from './InstancesActions';
import Store from './InstancesStore';
import InstanceDialogActions from './InstanceDialogActions';

// Components
import MUI from 'material-ui';
import Common from '../../common';
// TODO: Why I can't reach it via Common?
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
    Mixins.Dialogs
  ],

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
              show={this.state.isLoading}
              />
          ]
        }
      }]
  },

  componentDidMount() {
    console.info('Instances::componentDidMount');
    if (this.getParams().action === 'add') {
      // Show Add modal
      this.showDialog('addInstanceDialog');
    }
    Store.fetch();

    Actions.setTourConfig(this.getTourConfig())
  },

  getStyles() {
    return {
      tourHighlight: {
        color: MUI.Styles.Colors.blue800
      }
    }
  },

  getTourConfig() {
    const styles = this.getStyles();

    return [{
      node: React.findDOMNode(this.refs.myInstancesList),
      text: <div>This screen is all about <strong style={styles.tourHighlight}>Instances</strong>. <br />
        <strong style={styles.tourHighlight}>Instance</strong> is the space for your data.</div>,
      radius: 200
    },
    {
      node: React.findDOMNode(this.refs.addInstanceFab),
      text: <div>Here you can add new <strong style={styles.tourHighlight}>Instance.</strong></div>,
      radius: 95
    },
    {
      node: document.getElementById('menu-solutions'),
      text: <div>Go here to find <strong style={styles.tourHighlight}>Solution</strong> for you!</div>,
      radius: 100,
      top: -14,
      left: 20
    }]
  },

  componentWillUpdate(nextProps, nextState) {
    console.info('Instances::componentWillUpdate');
    this.hideDialogs(nextState.hideDialogs);
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

  handleItemClick(instanceName) {
    // Redirect to main instance screen
    SessionActions.fetchInstance(instanceName);
    this.transitionTo('instance', {instanceName});
  },

  showInstanceDialog() {
    InstanceDialogActions.showDialog();
    this.setState({welcomeShowed: true});
  },

  showInstanceEditDialog() {
    InstanceDialogActions.showDialog(Store.getCheckedItem());
  },

  onNextStep() {
    Actions.setTourConfig(this.getTourConfig());
    Actions.nextStep();
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
    let checkedInstances = Store.getNumberOfChecked();
    let isAnyInstanceSelected = instances !== null && checkedInstances >= 1 && checkedInstances < (instancesCount);
    let markedIcon = 'synicon-checkbox-multiple-marked-outline';
    let blankIcon = 'synicon-checkbox-multiple-blank-outline';

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

        <WelcomeDialog
          getStarted={this.showInstanceDialog}
          visible={this.state.items !== null && Store.getAllInstances().length === 0 && !this.state.welcomeShowed}/>

        <InstanceDialog />
        {this.getDialogs()}

        <Common.Show if={checkedInstances > 0}>
          <Common.Fab position="top">
            <Common.Fab.TooltipItem
              tooltip={isAnyInstanceSelected ? 'Click here to select all' : 'Click here to unselect all'}
              mini={true}
              onClick={isAnyInstanceSelected ? Actions.selectAll : Actions.uncheckAll}
              iconClassName={isAnyInstanceSelected ? markedIcon : blankIcon}/>
            <Common.Fab.TooltipItem
              tooltip="Click here to delete Instances"
              mini={true}
              onClick={this.showDialog.bind(null, 'deleteInstanceDialog')}
              iconClassName="synicon-delete"/>
            <Common.Fab.TooltipItem
              tooltip="Click here to edit Instance"
              mini={true}
              disabled={checkedInstances > 1}
              onClick={this.showInstanceEditDialog}
              iconClassName="synicon-pencil"/>
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
            onClick={this.showInstanceDialog}
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
