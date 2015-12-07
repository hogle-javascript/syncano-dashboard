import React from 'react';
import Router from 'react-router';
import Reflux from 'reflux';

import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

import Actions from './TriggersActions';
import Store from './TriggersStore';
import CodeBoxesActions from '../CodeBoxes/CodeBoxesActions';

import TriggersList from './TriggersList';
import TriggerDialog from './TriggerDialog';
import Common from '../../common';
import Container from '../../common/Container/Container';

export default React.createClass({

  displayName: 'TriggerSockets',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(Store),
    Mixins.Dialogs,
    Mixins.InstanceTabs,
    HeaderMixin
  ],

  componentWillMount() {
    Actions.fetch();
    CodeBoxesActions.fetch();
  },

  componentWillUpdate(nextProps, nextState) {
    console.info('Tasks::componentWillUpdate');
    // Merging "hideDialogs
    this.hideDialogs(nextState.hideDialogs);
  },

  handleRemoveTriggers() {
    console.info('Tasks::handleDelete');
    Actions.removeTriggers(Store.getCheckedItems());
  },

  checkTrigger(id, state) {
    console.info('Tasks::checkTrigger');
    Actions.checkItem(id, state);
  },

  initDialogs() {
    let checkedTriggers = Store.getCheckedItems();

    return [
      {
        dialog: Common.Dialog,
        params: {
          ref: 'removeTriggerDialog',
          title: 'Delete a Trigger',
          onRequestClose: this.handleCancel,
          actions: [
            {
              text: 'Cancel',
              onClick: this.handleCancel
            },
            {
              text: 'Confirm',
              onClick: this.handleRemoveTriggers
            }
          ],
          children: [
            'Do you really want to delete ' + this.getDialogListLength(checkedTriggers) + ' Trigger(s)?',
            this.getDialogList(checkedTriggers, 'label'),
            <Common.Loading
              type='linear'
              position='bottom'
              show={this.state.isLoading}/>
          ]
        }
      }
    ];
  },

  showTriggerDialog() {
    Actions.showDialog();
  },

  render() {
    let checkedTriggers = Store.getNumberOfChecked();
    let isAnyTriggerSelected = checkedTriggers >= 1 && checkedTriggers < (this.state.items.length);
    let markedIcon = 'synicon-checkbox-multiple-marked-outline';
    let blankIcon = 'synicon-checkbox-multiple-blank-outline';

    return (
      <Container>
        <TriggerDialog />
        {this.getDialogs()}

        <Common.InnerToolbar title="Trigger Sockets" />

        <Common.Show if={checkedTriggers > 0}>
          <Common.Fab position="top">
            <Common.Fab.TooltipItem
              tooltip={isAnyTriggerSelected ? 'Click here to select all' : 'Click here to unselect all'}
              mini={true}
              onClick={isAnyTriggerSelected ? Actions.selectAll : Actions.uncheckAll}
              iconClassName={isAnyTriggerSelected ? markedIcon : blankIcon}/>
            <Common.Fab.TooltipItem
              tooltip="Click here to delete Trigger Sockets"
              mini={true}
              onClick={this.showDialog.bind(null, 'removeTriggerDialog')}
              iconClassName="synicon-delete"/>
          </Common.Fab>
        </Common.Show>

        <Common.Fab>
          <Common.Fab.TooltipItem
            tooltip="Click here to create a Trigger Socket"
            onClick={this.showTriggerDialog}
            iconClassName="synicon-arrow-up-bold"/>
        </Common.Fab>

        <div>
          <TriggersList
            name="Trigger Sockets"
            checkItem={this.checkTrigger}
            isLoading={this.state.isLoading}
            items={this.state.items}
            emptyItemHandleClick={this.showTriggerDialog}
            emptyItemContent="Create a Trigger Socket"/>
        </div>
      </Container>
    );
  }
});
