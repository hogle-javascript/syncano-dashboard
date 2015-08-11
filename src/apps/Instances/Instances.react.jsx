import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import Radium from 'radium';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import Actions from './InstancesActions';
import Store from './InstancesStore';
import InstanceDialogActions from './InstanceDialogActions';

// Components
import Common from '../../common';
// TODO: Why I can't reach it via Common?
import Container from '../../common/Container/Container.react';
import EmptyContainer from '../../common/Container/EmptyContainer.react';

import InstancesList from './InstancesList.react';
import InstanceDialog from './InstanceDialog.react';
import WelcomeDialog from './WelcomeDialog';

require('./Instances.sass');

export default Radium(React.createClass({
  displayName: 'Instances',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(Store),
    Mixins.Dialogs,
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
    this.setState({'welcomeShowed': true});
  },

  showInstanceEditDialog() {
    InstanceDialogActions.showDialog(Store.getCheckedItem());
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
    let isAnyInstanceSelected =  instances !== null && checkedInstances >= 1 && checkedInstances < (instancesCount);
    let markedIcon = 'synicon-checkbox-multiple-marked-outline';
    let blankIcon = 'synicon-checkbox-multiple-blank-outline';

    return (
      <Container id="instances" style={{marginTop: 96, marginLeft: 'auto', marginRight: 'auto', width: '80%'}}>

        <WelcomeDialog
          getStared={this.showInstanceDialog}
          visible={this.state.items !== null && Store.getMyInstances().length === 0 && !this.state.welcomeShowed}/>

        <InstanceDialog />
        {this.getDialogs()}

        <Common.Show if={checkedInstances > 0}>
          <Common.Fab position="top">
            <Common.Fab.Item
              label={isAnyInstanceSelected ? 'Click here to select all' : 'Click here to unselect all'}
              mini={true}
              onClick={isAnyInstanceSelected ? Actions.selectAll : Actions.uncheckAll}
              iconClassName={isAnyInstanceSelected ? markedIcon : blankIcon}/>
            <Common.Fab.Item
              label="Click here to delete Instances"
              mini={true}
              onClick={this.showDialog.bind(null, 'deleteInstanceDialog')}
              iconClassName="synicon-delete"/>
            <Common.Fab.Item
              label="Click here to edit Instance"
              mini={true}
              disabled={checkedInstances > 1}
              onClick={this.showInstanceEditDialog}
              iconClassName="synicon-pencil"/>
            <Common.Fab.Item
              label="Click here to customize Instances"
              secondary={true}
              mini={true}
              disabled={checkedInstances > 1}
              onClick={this.showDialog.bind(null, 'pickColorIconDialog')}
              iconClassName="synicon-palette"/>
          </Common.Fab>
        </Common.Show>

        <Common.Fab>
          <Common.Fab.Item
            ref="addInstanceFab"
            label="Click here to add Instances"
            onClick={this.showInstanceDialog}
            iconClassName="synicon-plus"
            />
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
