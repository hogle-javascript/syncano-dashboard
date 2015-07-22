import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import SessionStore from '../Session/SessionStore';
import CodeBoxesActions from './CodeBoxesActions';
import CodeBoxesStore from './CodeBoxesStore';

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

    Reflux.connect(CodeBoxesStore),
    Mixins.Dialogs,
    Mixins.InstanceTabs,
    HeaderMixin
  ],

  componentWillUpdate: function(nextProps, nextState) {
    console.info('CodeBoxes::componentWillUpdate');
    this.hideDialogs(nextState.hideDialogs);
  },

  componentDidMount: function() {
    if (this.getParams().action == 'add') {
      // Show Add modal
      this.showCodeBoxDialog();
    }
    CodeBoxesActions.fetch();
  },

  // Dialogs config
  initDialogs: function() {
    var checkedCodeboxes = CodeBoxesStore.getCheckedItems();

    return [{
      dialog: Common.Dialog,
      params: {
        ref     : 'deleteCodeBoxDialog',
        title   : 'Delete CodeBox',
        actions : [
          {
            text    : 'Cancel',
            onClick : this.handleCancel
          },
          {
            text    : 'Confirm',
            onClick : this.handleDelete
          }
        ],
        modal: true,
        children: [
          'Do you really want to delete ' + this.getDialogListLength(checkedCodeboxes) + ' CodeBox(es)?',
          this.getDialogList(checkedCodeboxes),
          <Common.Loading
            type     = "linear"
            position = "bottom"
            show     = {this.state.isLoading} 
          />
        ]
      }
    }]
  },

  handleDelete: function() {
    console.info('CodeBoxes::handleDelete');
    CodeBoxesActions.removeCodeBoxes(CodeBoxesStore.getCheckedItems());
  },

  showCodeBoxDialog: function() {
    CodeBoxesActions.showDialog();
  },

  showCodeBoxEditDialog: function() {
    CodeBoxesActions.showDialog(CodeBoxesStore.getCheckedItem());
  },

  render: function() {
    var checkedItems         = CodeBoxesStore.getNumberOfChecked(),
        isAnyCodeboxSelected = checkedItems >= 1 && checkedItems < (this.state.items.length),
        markedIcon           = 'synicon-checkbox-multiple-marked-outline',
        blankIcon            = 'synicon-checkbox-multiple-blank-outline';

    return (
      <Container>
        <CodeBoxDialog />
        {this.getDialogs()}

        <Common.Show if={checkedItems > 0}>
          <Common.Fab position="top">
            <Common.Fab.Item
              label         = {isAnyCodeboxSelected ? 'Click here to select all' : 'Click here to unselect all'}
              mini          = {true}
              onClick       = {isAnyCodeboxSelected ? CodeBoxesActions.selectAll : CodeBoxesActions.uncheckAll}
              iconClassName = {isAnyCodeboxSelected ? markedIcon : blankIcon}
            />
            <Common.Fab.Item
              label         = "Click here to delete CodeBoxes"
              mini          = {true}
              onClick       = {this.showDialog.bind(null, 'deleteCodeBoxDialog')}
              iconClassName = "synicon-delete"
            />
            <Common.Fab.Item
              label         = "Click here to edit CodeBox"
              mini          = {true}
              disabled      = {checkedItems > 1}
              onClick       = {this.showCodeBoxEditDialog}
              iconClassName = "synicon-pencil"
            />
          </Common.Fab>
        </Common.Show>

        <Common.Fab>
          <Common.Fab.Item
            label         = "Click here to add CodeBox"
            onClick       = {this.showCodeBoxDialog}
            iconClassName = "synicon-plus"
          />
        </Common.Fab>

        <CodeBoxesList
          name                 = "CodeBoxes"
          items                = {this.state.items}
          emptyItemHandleClick = {this.showCodeBoxDialog}
          emptyItemContent     = "Create a CodeBox"
        />
      </Container>
    );
  }
});
