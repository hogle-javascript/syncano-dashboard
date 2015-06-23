var React  = require('react'),
    Reflux = require('reflux'),
    Router = require('react-router'),

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
    mui                  = require('material-ui'),
    Dialog               = mui.Dialog,
    Container            = require('../../common/Container/Container.react'),
    FabList              = require('../../common/Fab/FabList.react'),
    FabListItem          = require('../../common/Fab/FabListItem.react'),

    // Local components
    CodeBoxesList        = require('./CodeBoxesList.react'),
    AddDialog            = require('./CodeBoxesAddDialog.react');


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

  componentWillMount: function() {
    CodeBoxesStore.refreshData();
  },

  componentWillUpdate: function(nextProps, nextState) {
    console.info('CodeBoxes::componentWillUpdate');
    this.hideDialogs(nextState.hideDialogs);
  },

  componentDidMount: function() {
    if (this.getParams().action == 'add'){
      // Show Add modal
      this.refs.addCodeBoxDialog.show();
    }
  },

  // Dialogs config
  initDialogs: function () {

    return [{
      dialog: AddDialog,
      params: {
        ref  : "addCodeBoxDialog",
        mode : "add"
      }
    },{
      dialog: AddDialog,
      params: {
        ref  : "editCodeBoxDialog",
        mode : "edit"
      }
    },{
      dialog: Dialog,
      params: {
        ref:    "deleteCodeBoxDialog",
        title:  "Delete CodeBox key",
        actions: [
          {text: 'Cancel', onClick: this.handleCancel},
          {text: "Yes, I'm sure", onClick: this.handleDelete}
        ],
        modal: true,
        children: 'Do you really want to delete ' + CodeBoxesStore.getCheckedItems().length +' CodeBox(es)?'
      }
    }]
  },

  handleDelete: function() {
    console.info('CodeBoxes::handleDelete');
    CodeBoxesActions.removeCodeBoxes(CodeBoxesStore.getCheckedItems());
  },

  handleItemClick: function(itemId) {
    // Redirect to edit screen
    this.transitionTo('codeboxes-edit', {instanceName: SessionStore.instance.name, codeboxId: itemId});
  },

  render: function () {

    var checkedItems = CodeBoxesStore.getNumberOfChecked();

    return (
      <Container>
        {this.getDialogs()}

        <Show if={checkedItems > 0}>

          <FabList position="top">
            <FabListItem
              label         = "Click here to unselect Api Keys"
              mini          = {true}
              onClick       = {CodeBoxesActions.uncheckAll}
              iconClassName = "synicon-checkbox-multiple-marked-outline" />

            <FabListItem
              label         = "Click here to delete CodeBoxes"
              mini          = {true}
              onClick       = {this.showDialog('deleteCodeBoxDialog')}
              iconClassName = "synicon-delete" />

            <FabListItem
              label         = "Click here to edit CodeBox"
              mini          = {true}
              disabled      = {checkedItems > 1}
              onClick       = {this.showDialog('editCodeBoxDialog')}
              iconClassName = "synicon-pencil" />

          </FabList>
        </Show>

        <FabList>
          <FabListItem
            label         = "Click here to add CodeBox"
            onClick       = {this.showDialog('addCodeBoxDialog')}
            iconClassName = "synicon-plus" />
        </FabList>

        <CodeBoxesList
          name                 = "CodeBoxes"
          items                = {this.state.items}
          emptyItemHandleClick = {this.showDialog('addCodeBoxDialog')}
          emptyItemContent     = "Create a CodeBox" />
      </Container>
    );
  }

});