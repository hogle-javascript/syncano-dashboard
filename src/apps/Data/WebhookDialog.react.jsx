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
    name: {
      presence: true
    },
    codebox: {
      presence: true
    }
  },

  handleDialogShow: function() {
    console.info('WebhookDialog::handleDialogShow');
    CodeBoxesActions.fetch();
  },

  handleAddSubmit: function() {
    WebhooksActions.createWebhook({
      name        : this.state.name,
      codebox     : this.state.codebox,
      description : this.state.description,
      'public'    : this.state.public
    });
  },

  handleEditSubmit: function() {
    WebhooksActions.updateWebhook(
      this.state.name, {
        codebox     : this.state.codebox,
        description : this.state.description,
        'public'    : this.state.public
      });
  },

  handleToogle: function(event, status) {
    var state = {};
    state[event.target.name] = status;
    this.setState(state);
  },

  render: function() {
    var title       = this.hasEditMode() ? 'Edit' : 'Add',
        submitLabel = this.hasEditMode() ? 'Save changes' : 'Create',
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
        ref             = 'dialog'
        title           = {title + ' CodeBox Endpoint'}
        openImmediately = {this.props.openImmediately}
        actions         = {dialogStandardActions}
        onShow          = {this.handleDialogShow}
        onDismiss       = {this.resetDialogState}
        modal           = {true}>
        <div>
          {this.renderFormNotifications()}

          <TextField
            ref               = "name"
            name              = "name"
            fullWidth         = {true}
            disabled          = {this.hasEditMode()}
            valueLink         = {this.linkState('name')}
            errorText         = {this.getValidationMessages('name').join(' ')}
            hintText          = "Name of the WebHook"
            floatingLabelText = "Name" />

          <TextField
            ref               = "description"
            name              = "description"
            fullWidth         = {true}
            valueLink         = {this.linkState('description')}
            errorText         = {this.getValidationMessages('description').join(' ')}
            hintText          = "Description of the WebHook"
            floatingLabelText = "Description" />

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

          <Toggle
            ref            = 'public'
            name           = 'public'
            onToggle       = {this.handleToogle}
            style          = {{marginTop: 20}}
            defaultToggled = {this.state.public}
            label          = 'Make this WebHook public?' />

        </div>
      </Dialog>
    );
  }

});

