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
    SelectField     = mui.SelectField,
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
    signal: {
      presence: true
    },
    doClass: {
      presence: true
    },
    codebox: {
      presence: true
    }
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
        ];

    var cb = [{payload: 'dummy', text: 'loading...'}];
    if (this.state.codeboxes.items.length > 0) {
        cb = CodeBoxesStore.getCodeBoxesDropdown();
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
              fullWidth         = {true}
              valueLink         = {this.linkState('label')}
              errorText         = {this.getValidationMessages('label').join()}
              hintText          = "Label of the trigger"
              floatingLabelText = "Label" />

            <SelectField
              ref               = "signal"
              name              = "signal"
              floatingLabelText = "Signal"
              fullWidth         = {true}
              valueLink         = {this.linkState("signal")}
              errorText         = {this.getValidationMessages('signal').join()}

              valueMember       = "payload"
              displayMember     = "text"
              menuItems         = {TriggersStore.getSignalsDropdown()} />

            <SelectField
              ref               = "doClass"
              name              = "doClass"
              floatingLabelText = "Class"
              fullWidth         = {true}
              valueLink         = {this.linkState("class")}
              errorText         = {this.getValidationMessages('class').join()}
              valueMember       = "payload"
              displayMember     = "text"
              menuItems         = {TriggersStore.getClassesDropdown()} />

            <SelectField
              ref               = "codebox"
              name              = "codebox"
              floatingLabelText = "CodeBox"
              valueLink         = {this.linkState("codebox")}
              errorText         = {this.getValidationMessages('codebox').join()}
              valueMember       = "payload"
              displayMember     = "text"
              style             = {{width: '50%'}}
              menuItems         = {cb} />

          </form>
        </div>
      </Dialog>
    );
  }

});

