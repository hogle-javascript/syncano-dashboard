import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import _ from 'lodash';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import SessionStore from '../Session/SessionStore';
import Actions from './CodeBoxesActions';
import Store from './CodeBoxesStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';
import Container from '../../common/Container/Container.react';

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

  componentWillUpdate(nextProps, nextState) {
    console.info('CodeBoxes::componentWillUpdate');
    this.hideDialogs(nextState.hideDialogs);
  },

  componentDidMount() {
    console.info('CodeBoxes::componentDidMount');
    if (this.getParams().action === 'add') {
      // Show Add modal
      this.showCodeBoxDialog();
    }
    Actions.fetch();
  },

  getAssociatedCodeboxes(associatedWith) {
    let checkedCodeboxes = Store.getCheckedItems();
    let associatedCodeboxes = checkedCodeboxes.filter((codebox) => {
      codebox[associatedWith] = [];
      let associatedItems = this.state[associatedWith].filter((item) => {
        if (codebox.id === item.codebox) {
          codebox[associatedWith].push(item.label);
          return true;
        }
      });

      return associatedItems.length > 0;
    });

    return associatedCodeboxes;
  },

  // Dialogs config
  initDialogs() {
    let checkedCodeboxes = Store.getCheckedItems();
    let codeboxesAssociatedWithSchedules = this.getAssociatedCodeboxes('schedules');
    let codeboxesAssociatedWithTriggers = this.getAssociatedCodeboxes('triggers');
    let codeboxesNotAssociated = _.difference(checkedCodeboxes, codeboxesAssociatedWithSchedules);

    codeboxesNotAssociated = _.difference(codeboxesNotAssociated, codeboxesAssociatedWithTriggers);

    if ((codeboxesAssociatedWithSchedules && codeboxesAssociatedWithSchedules.length > 0) ||
        (codeboxesAssociatedWithTriggers && codeboxesAssociatedWithTriggers.length > 0)) {
      let associatedWithSchedulesList = codeboxesAssociatedWithSchedules.length > 0 ?
          <div>
            Associated with Schedules: {this.getDialogList(codeboxesAssociatedWithSchedules, 'label', 'schedules')}
          </div> :
          null;
      let associatedWithTriggersList = codeboxesAssociatedWithTriggers.length > 0 ?
          <div>
            Associated with Triggers: {this.getDialogList(codeboxesAssociatedWithTriggers, 'label', 'triggers')}
          </div> :
          null;
      let notAssociatedList = codeboxesNotAssociated.length > 0 ?
          <div>
            Not associated: {this.getDialogList(codeboxesNotAssociated, 'label')}
          </div> :
          null;

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
      }]
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
    }]
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
            <Common.Fab.TooltipItem
              tooltip="Click here to edit CodeBox"
              mini={true}
              disabled={checkedItems > 1}
              onClick={this.showCodeBoxEditDialog}
              iconClassName="synicon-pencil"/>
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
