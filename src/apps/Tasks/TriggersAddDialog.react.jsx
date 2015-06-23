var React           = require('react'),
    Reflux          = require('reflux'),

    // Utils
    ValidationMixin = require('../../mixins/ValidationMixin'),
    DialogFormMixin = require('../../mixins/DialogFormMixin'),
    FormMixin       = require('../../mixins/FormMixin'),

    // Stores and Actions
    TriggersActions = require('./TriggersActions'),
    TriggersStore   = require('./TriggersStore'),
    CodeBoxesStore  = require('../CodeBoxes/CodeBoxesStore'),

    // Components
    mui             = require('material-ui'),
    Toggle          = mui.Toggle,
    TextField       = mui.TextField,
    DropDownMenu    = mui.DropDownMenu,
    Dialog          = mui.Dialog;


module.exports = React.createClass({

  displayName: 'TriggersAddDialog',

  mixins: [
    Reflux.connect(TriggersStore),
    Reflux.connect(CodeBoxesStore, 'codeboxes'),
    React.addons.LinkedStateMixin,
    DialogFormMixin,
    ValidationMixin,
    FormMixin
  ],

  validatorConstraints: {
    label: {
      presence: true
    },
  },

  componentWillUpdate: function(nextProps, nextState) {
    if (nextState.codeboxes.items.length > 0 && !this.state.codebox) {
      this.setState({
        codebox: CodeBoxesStore.getCodeBoxesDropdown()[0].payload
      })
    }
  },

  clearData: function() {
    this.setState({
      'class' : 'user_profile',
      signal  : 'post_create',
      errors  : {}
    })
  },

  editShow: function() {
    var checkedItem = TriggersStore.getCheckedItem();
    if (checkedItem) {
      this.setState({
          id      : checkedItem.id,
          label   : checkedItem.label,
          signal  : checkedItem.signal,
          'class' : checkedItem.class,
          codebox : checkedItem.codebox
      });
    }
  },

  handleAddSubmit: function (event) {
    TriggersActions.createTrigger({
      label   : this.state.label,
      codebox : this.state.codebox,
      'class' : this.state.class,
      signal  : this.state.signal
    });
  },

  handleEditSubmit: function (event) {
    TriggersActions.updateTrigger(
      this.state.id, {
        label   : this.state.label,
        codebox : this.state.codebox,
        'class' : this.state.class,
        signal  : this.state.signal
      });
  },

  handleCodeBoxChange: function (event, selectedIndex, menuItem){
    this.setState({codebox: menuItem.payload});
  },

  handleClassChange: function (event, selectedIndex, menuItem){
    this.setState({'class': menuItem.payload});
  },

  handleSignalChange: function (event, selectedIndex, menuItem){
    this.setState({signal: menuItem.payload});
  },

  render: function () {
    var title       = this.props.mode === 'edit' ? 'Edit': 'Add',
        submitLabel = this.props.mode === 'edit' ? 'Save changes': 'Create',
        dialogStandardActions = [
          {
            ref     : 'cancel',
            text    : 'Cancel',
            onClick : this.handleCancel
          },
          {
            ref     : 'submit',
            text    : {submitLabel},
            onClick : this.handleFormValidation
          }
        ],
        // TODO: move it to the store
        classMenuItems = [
          {
            payload : 'user_profile',
            text    : 'UserProfile'
          },
          {
            payload : 'user_profile',
            text    : 'UserProfile'
          },

        ];

    var cb = [{payload: 'dummy', text: 'loading...'}];
    if (this.state.codeboxes.items.length > 0) {
        cb = CodeBoxesStore.getCodeBoxesDropdown();
    }

    var codeBoxSelectedIndex = 0;
    if (this.state.codebox) {
      codeBoxSelectedIndex = CodeBoxesStore.getCodeBoxIndex(this.state.codebox);
    }

    var signalSelectedIndex = 0;
    if (this.state.signal) {
      signalSelectedIndex = TriggersStore.getSignalIndex(this.state.signal);
    }


    return (
      <Dialog
        ref             = "dialogRef"
        title           = {title + " Trigger"}
        openImmediately = {this.props.openImmediately}
        actions         = {dialogStandardActions}
        modal           = {true}>
        <div>
          {this.renderFormNotifications()}
          <form
            onSubmit      = {this.handleFormValidation}
            acceptCharset = "UTF-8"
            method        = "post">

            <TextField
              ref               = "label"
              name              = "label"
              style             = {{width:'100%'}}
              valueLink         = {this.linkState('label')}
              errorText         = {this.getValidationMessages('label').join()}
              hintText          = "Label of the trigger"
              floatingLabelText = "Label" />

            <DropDownMenu
              ref               = "signal"
              name              = "signal"
              autoWidth         = {true}
              floatingLabelText = "Signal"
              style             = {{width:500}}
              selectedIndex     = {signalSelectedIndex}
              onChange          = {this.handleSignalChange}
              menuItems         = {TriggersStore.getSignalsDropdown()} />

            <DropDownMenu
              ref               = "doClass"
              name              = "doClass"
              autoWidth         = {true}
              floatingLabelText = "Class"
              style             = {{width:500}}
              onChange          = {this.handleClassChange}
              menuItems         = {classMenuItems} />

            <DropDownMenu
              ref               = "codebox"
              name              = "codebox"
              selectedIndex     = {codeBoxSelectedIndex}
              autoWidth         = {true}
              floatingLabelText = "CodeBox"
              style             = {{width:500}}
              onChange          = {this.handleCodeBoxChange}
              menuItems         = {cb} />

          </form>
        </div>
      </Dialog>
    );
  }

});

