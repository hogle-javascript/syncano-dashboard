var React             = require('react'),
    Reflux            = require('reflux'),
    Router            = require('react-router'),

    // Utils
    DialogsMixin      = require('../../mixins/DialogsMixin'),
    InstanceTabsMixin = require('../../mixins/InstanceTabsMixin'),
    HeaderMixin       = require('../Header/HeaderMixin'),
    Show              = require('../../common/Show/Show.react'),

    // Stores and Actions
    SessionStore     = require('../Session/SessionStore'),
    CodeBoxesActions = require('./CodeBoxesActions'),
    CodeBoxesStore   = require('./CodeBoxesStore'),

    // Components
    mui              = require('material-ui'),
    Dialog           = mui.Dialog,
    Loading          = require('../../common/Loading/Loading.react.jsx'),
    Container        = require('../../common/Container/Container.react'),
    FabList          = require('../../common/Fab/FabList.react'),
    FabListItem      = require('../../common/Fab/FabListItem.react'),

    // Local components
    CodeBoxesList    = require('./CodeBoxesList.react'),
    CodeBoxDialog    = require('./CodeBoxDialog.react');

module.exports = React.createClass({

  displayName: 'CodeBoxes',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(CodeBoxesStore),
    DialogsMixin,
    HeaderMixin,
    InstanceTabsMixin
  ],

  componentDidMount: function() {
    CodeBoxesActions.fetch();
  },

  componentWillUpdate: function(nextProps, nextState) {
    console.info('CodeBoxes::componentWillUpdate');
    this.hideDialogs(nextState.hideDialogs);
  },

  componentDidMount: function() {
    if (this.getParams().action == 'add') {
      // Show Add modal
      this.showCodeBoxDialog();
    }
  },

  // Dialogs config
  initDialogs: function() {
    var checkedCodeboxes = CodeBoxesStore.getCheckedItems();

    return [{
      dialog: Dialog,
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
          <Loading
            type     = "linear"
            position = "bottom"
            show     = {this.state.isLoading} />
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

        <Show if={checkedItems > 0}>

          <FabList position="top">

            <FabListItem
              label         = {isAnyCodeboxSelected ? 'Click here to select all' : 'Click here to unselect all'}
              mini          = {true}
              onClick       = {isAnyCodeboxSelected ? CodeBoxesActions.selectAll : CodeBoxesActions.uncheckAll}
              iconClassName = {isAnyCodeboxSelected ? markedIcon : blankIcon} />

            <FabListItem
              label         = "Click here to delete CodeBoxes"
              mini          = {true}
              onClick       = {this.showDialog.bind(null, 'deleteCodeBoxDialog')}
              iconClassName = "synicon-delete" />

            <FabListItem
              label         = "Click here to edit CodeBox"
              mini          = {true}
              disabled      = {checkedItems > 1}
              onClick       = {this.showCodeBoxEditDialog}
              iconClassName = "synicon-pencil" />

          </FabList>
        </Show>

        <FabList>
          <FabListItem
            label         = "Click here to add CodeBox"
            onClick       = {this.showCodeBoxDialog}
            iconClassName = "synicon-plus" />
        </FabList>

        <CodeBoxesList
          name                 = "CodeBoxes"
          items                = {this.state.items}
          emptyItemHandleClick = {this.showCodeBoxDialog}
          emptyItemContent     = "Create a CodeBox" />
      </Container>
    );
  }

});
