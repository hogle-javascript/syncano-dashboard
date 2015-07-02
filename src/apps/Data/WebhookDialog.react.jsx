var React              = require('react'),
    Reflux             = require('reflux'),

    // Utils
    DialogMixin        = require('../../mixins/DialogMixin'),
    FormMixin          = require('../../mixins/FormMixin'),

    // Stores and Actions
    WebhooksActions    = require('./WebhooksActions'),
    WebhookDialogStore = require('./WebhookDialogStore'),
    CodeBoxesActions   = require('../CodeBoxes/CodeBoxesActions'),
    ClassesActions     = require('../Classes/ClassesActions'),

    // Components
    mui                = require('material-ui'),
    Toggle             = mui.Toggle,
    TextField          = mui.TextField,
    SelectField        = mui.SelectField,
    Dialog             = mui.Dialog;

module.exports = React.createClass({

  displayName: 'WebhookDialog',

  mixins: [
    Reflux.connect(WebhookDialogStore),
    React.addons.LinkedStateMixin,
    DialogMixin,
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

  handleDialogShow: function() {
    console.info('WebhookDialog::handleDialogShow');
    CodeBoxesActions.fetch();
    ClassesActions.fetch();
  },

  handleAddSubmit: function () {
    WebhooksActions.createWebhook({
      label   : this.state.label,
      codebox : this.state.codebox,
      'class' : this.state.class,
      signal  : this.state.signal
    });
  },

  handleEditSubmit: function () {
    WebhooksActions.updateWebhook(
      this.state.id, {
        label   : this.state.label,
        codebox : this.state.codebox,
        'class' : this.state.class,
        signal  : this.state.signal
      });
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
        title           = {title + " Webhook"}
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
              hintText          = "Label of the trigger"
              floatingLabelText = "Label" />

            <SelectField
              ref               = "signal"
              name              = "signal"
              floatingLabelText = "Signal"
              fullWidth         = {true}
              valueLink         = {this.linkState('signal')}
              errorText         = {this.getValidationMessages('signal').join(' ')}
              valueMember       = "payload"
              displayMember     = "text"
              menuItems         = {WebhookDialogStore.getSignalsDropdown()} />

            <SelectField
              ref               = "doClass"
              name              = "doClass"
              floatingLabelText = "Class"
              fullWidth         = {true}
              valueLink         = {this.linkState('class')}
              errorText         = {this.getValidationMessages('class').join(' ')}
              valueMember       = "payload"
              displayMember     = "text"
              menuItems         = {this.state.classes} />

            <SelectField
              ref               = "codebox"
              name              = "codebox"
              floatingLabelText = "CodeBox"
              valueLink         = {this.linkState('codebox')}
              errorText         = {this.getValidationMessages('codebox').join(' ')}
              valueMember       = "payload"
              displayMember     = "text"
              fullWidth         = {true}
              menuItems         = {this.state.codeboxes} />

          </form>
        </div>
      </Dialog>
    );
  }

});

