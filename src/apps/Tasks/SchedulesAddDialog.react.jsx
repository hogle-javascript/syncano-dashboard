var React            = require('react'),
    Reflux           = require('reflux'),

    // Utils
    ValidationMixin  = require('../../mixins/ValidationMixin'),
    DialogFormMixin  = require('../../mixins/DialogFormMixin'),
    FormMixin        = require('../../mixins/FormMixin'),

    // Stores and Actions
    SchedulesActions = require('./SchedulesActions'),
    SchedulesStore   = require('./SchedulesStore'),
    CodeBoxesStore   = require('../CodeBoxes/CodeBoxesStore'),

    // Components
    mui              = require('material-ui'),
    Toggle           = mui.Toggle,
    TextField        = mui.TextField,
    SelectField      = mui.SelectField,
    Dialog           = mui.Dialog;


module.exports = React.createClass({

  displayName: 'SchedulesAddDialog',

  mixins: [
    Reflux.connect(SchedulesStore),
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
    codebox: {
      presence: true
    },
    crontab: {
      presence: true
    }
  },

  clearData: function() {
    this.setState({
      email  : '',
      errors : {}
    })
  },

  editShow: function() {
    var checkedItem = SchedulesStore.getCheckedItem();
    if (checkedItem) {
      this.setState({
          id      : checkedItem.id,
          label   : checkedItem.label,
          crontab : checkedItem.crontab,
          codebox : checkedItem.codebox
      });
    }
  },

  handleAddSubmit: function () {
    SchedulesActions.createSchedule({
      label    : this.state.label,
      crontab  : this.state.crontab,
      codebox  : this.state.codebox
    });
  },

  handleEditSubmit: function () {
    SchedulesActions.updateSchedule(
      this.state.id, {
        label    : this.state.label,
        crontab  : this.state.crontab,
        codebox  : this.state.codebox
      }
    );
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
        ref             ="dialogRef"
        title           ={title + " Schedule"}
        openImmediately ={this.props.openImmediately}
        actions         ={dialogStandardActions}
        modal           ={true}>
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
              hintText          = "Label of the schedule"
              floatingLabelText = "Label" />

            <SelectField
              ref               = "codebox"
              name              = "codebox"
              floatingLabelText = "CodeBox"
              valueLink         = {this.linkState("codebox")}
              errorText         = {this.getValidationMessages('codebox').join()}
              valueMember       = "payload"
              displayMember     = "text"
              fullWidth         = {true}
              menuItems         = {cb} />

            <SelectField
              ref               = "crontab"
              name              = "crontab"
              floatingLabelText = "CronTab"
              valueLink         = {this.linkState("crontab")}
              errorText         = {this.getValidationMessages('crontab').join()}
              valueMember       = "payload"
              displayMember     = "text"
              fullWidth         = {true}
              menuItems         = {SchedulesStore.getCrontabDropdown()} />

          </form>
        </div>
      </Dialog>
    );
  }

});

