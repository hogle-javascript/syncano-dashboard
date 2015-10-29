import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router-old';
import _ from 'lodash';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import Actions from './CodeBoxesActions';
import Store from './CodeBoxesStore';

// Components
import Common from '../../common';

// Local components
import CodeBoxesList from './CodeBoxesList.react';
import CodeBoxDialog from './CodeBoxDialog.react';

export default React.createClass({

  displayName: 'CodeBoxes',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(Store),
    Mixins.Dialogs,
    Mixins.InstanceTabs,
    HeaderMixin
  ],

  componentDidMount() {
    console.info('CodeBoxes::componentDidMount');
    if (this.getParams().action === 'add') {
      // Show Add modal
      this.showCodeBoxDialog();
    }
    Actions.fetch();
  },

  componentWillUpdate(nextProps, nextState) {
    console.info('CodeBoxes::componentWillUpdate');
    this.hideDialogs(nextState.hideDialogs);
  },

  getAssociatedCodeboxes(associatedWith) {
    let checkedCodeBoxes = Store.getCheckedItems();

    let associatedCodeBoxes = _.filter(checkedCodeBoxes, (codeBox) => {
      codeBox[associatedWith] = _.pluck(_.filter(this.state[associatedWith], 'codebox', codeBox.id), 'label');
      return codeBox[associatedWith].length > 0;
    });

    return associatedCodeBoxes;
  },

  getAssociationsList(associationsFor, associatedItems) {
    let hasItems = associatedItems.length > 0;
    let list = {
      schedules: null,
      triggers: null,
      notAssociated: null
    };

    if (hasItems) {
      list.schedules = (
        <div>
          Associated with Schedules: {this.getDialogList(associatedItems, 'label', associationsFor)}
        </div>
      );
      list.triggers = (
        <div>
          Associated with Triggers: {this.getDialogList(associatedItems, 'label', associationsFor)}
        </div>
      );
      list.notAssociated = (
        <div>
          Not associated: {this.getDialogList(associatedItems, 'label')}
        </div>
      );
    }

    return list[associationsFor];
  },

  handleDelete() {
    console.info('CodeBoxes::handleDelete');
    Actions.removeCodeBoxes(Store.getCheckedItems());
  },

  showCodeBoxDialog() {
    Actions.showDialog();
  },

  showCodeBoxEditDialog() {
    Actions.showDialog(Store.getCheckedItem());
  },

  // Dialogs config
  initDialogs() {
    let checkedCodeboxes = Store.getCheckedItems();
    let codeboxesAssociatedWithTriggers = this.getAssociatedCodeboxes('triggers');
    let codeboxesAssociatedWithSchedules = this.getAssociatedCodeboxes('schedules');
    let codeboxesNotAssociated = _.difference(_.difference(checkedCodeboxes, codeboxesAssociatedWithSchedules),
      codeboxesAssociatedWithTriggers);

    if (codeboxesAssociatedWithSchedules.length > 0 || codeboxesAssociatedWithTriggers.length > 0) {
      let associatedWithSchedulesList = this.getAssociationsList('schedules', codeboxesAssociatedWithSchedules);
      let associatedWithTriggersList = this.getAssociationsList('triggers', codeboxesAssociatedWithTriggers);
      let notAssociatedList = this.getAssociationsList('notAssociated', codeboxesNotAssociated);

      return [{
        dialog: Common.Dialog,
        params: {
          ref: 'deleteCodeBoxDialog',
          title: 'Delete a CodeBox',
          actions: [
            {
              text: 'Cancel',
              onClick: this.handleCancel
            },
            {
              text: 'Confirm',
              onClick: this.handleDelete
            }
          ],
          modal: true,
          children: [
            'Some of checked CodeBoxes are associated with Schedules or Triggers. Do you really want to delete ' +
            checkedCodeboxes.length + ' CodeBox(es)?',
            notAssociatedList,
            associatedWithSchedulesList,
            associatedWithTriggersList,
            <Common.Loading
              type="linear"
              position="bottom"
              show={this.state.isLoading}/>
          ]
        }
      }];
    }

    return [{
      dialog: Common.Dialog,
      params: {
        ref: 'deleteCodeBoxDialog',
        title: 'Delete a CodeBox',
        actions: [
          {
            text: 'Cancel',
            onClick: this.handleCancel
          },
          {
            text: 'Confirm',
            onClick: this.handleDelete
          }
        ],
        modal: true,
        children: [
          'Do you really want to delete ' + this.getDialogListLength(checkedCodeboxes) + ' CodeBox(es)?',
          this.getDialogList(checkedCodeboxes, 'label'),
          <Common.Loading
            type="linear"
            position="bottom"
            show={this.state.isLoading}/>
        ]
      }
    }];
  },

  render() {
    let checkedItems = Store.getNumberOfChecked();
    let isAnyCodeboxSelected = checkedItems >= 1 && checkedItems < (this.state.items.length);
    let markedIcon = 'synicon-checkbox-multiple-marked-outline';
    let blankIcon = 'synicon-checkbox-multiple-blank-outline';

    return (
      <div>
        <CodeBoxDialog />
        {this.getDialogs()}

        <Common.Show if={checkedItems > 0}>
          <Common.Fab position="top">
            <Common.Fab.TooltipItem
              tooltip={isAnyCodeboxSelected ? 'Click here to select all' : 'Click here to unselect all'}
              mini={true}
              onClick={isAnyCodeboxSelected ? Actions.selectAll : Actions.uncheckAll}
              iconClassName={isAnyCodeboxSelected ? markedIcon : blankIcon}/>
            <Common.Fab.TooltipItem
              tooltip="Click here to delete CodeBoxes"
              mini={true}
              onClick={this.showDialog.bind(null, 'deleteCodeBoxDialog')}
              iconClassName="synicon-delete"/>
          </Common.Fab>
        </Common.Show>

        <Common.Fab>
          <Common.Fab.TooltipItem
            tooltip="Click here to add CodeBox"
            onClick={this.showCodeBoxDialog}
            iconClassName="synicon-plus"/>
        </Common.Fab>

        <CodeBoxesList
          name="CodeBoxes"
          items={this.state.items}
          emptyItemHandleClick={this.showCodeBoxDialog}
          emptyItemContent="Create a CodeBox"/>
      </div>
    );
  }
});
