var React               = require('react'),
    Reflux              = require('reflux'),

    // Utils
    ValidationMixin     = require('../../mixins/ValidationMixin'),
    DialogMixin         = require('../../mixins/DialogMixin'),
    FormMixin           = require('../../mixins/FormMixin'),

    // Stores and Actions
    SchedulesActions    = require('./SchedulesActions'),
    ScheduleDialogStore = require('./ScheduleDialogStore'),
    CodeBoxesActions    = require('../CodeBoxes/CodeBoxesActions'),

    // Components
    mui                 = require('material-ui'),
    Toggle              = mui.Toggle,
    TextField           = mui.TextField,
    SelectField         = mui.SelectField,
    Dialog              = mui.Dialog;


module.exports = React.createClass({

  displayName: 'ScheduleDialog',

  mixins: [
    Reflux.connect(ScheduleDialogStore),
    React.addons.LinkedStateMixin,
    DialogMixin,
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

  handleDialogShow: function() {
    console.info('ScheduleDialog::handleDialogShow');
    CodeBoxesActions.fetchCodeBoxes();
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
    var title       = this.hasEditMode() ? 'Edit': 'Add',
        submitLabel = this.hasEditMode() ? 'Save changes': 'Create',

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

    return (
      <Dialog
        ref             = "dialog"
        title           = {title + " Schedule"}
        openImmediately = {this.props.openImmediately}
        actions         = {dialogStandardActions}
        onShow          = {this.handleDialogShow}
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
              errorText         = {this.getValidationMessages('label').join(' ')}
              hintText          = "Label of the schedule"
              floatingLabelText = "Label" />

            <SelectField
              ref               = "codebox"
              name              = "codebox"
              floatingLabelText = "CodeBox"
              valueLink         = {this.linkState("codebox")}
              errorText         = {this.getValidationMessages('codebox').join(' ')}
              valueMember       = "payload"
              displayMember     = "text"
              fullWidth         = {true}
              menuItems         = {this.state.codeboxes} />

            <SelectField
              ref               = "crontab"
              name              = "crontab"
              floatingLabelText = "CronTab"
              valueLink         = {this.linkState("crontab")}
              errorText         = {this.getValidationMessages('crontab').join(' ')}
              valueMember       = "payload"
              displayMember     = "text"
              fullWidth         = {true}
              menuItems         = {ScheduleDialogStore.getCrontabDropdown()} />

          </form>
        </div>
      </Dialog>
    );
  }

});

