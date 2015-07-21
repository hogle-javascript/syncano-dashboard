import React from 'react';
import Reflux from 'reflux';

// Utils
import DialogMixin from '../../mixins/DialogMixin';
import FormMixin from '../../mixins/FormMixin';

// Stores and Actions
import WebhooksActions from './WebhooksActions';
import WebhookDialogStore from './WebhookDialogStore';
import CodeBoxesActions from '../CodeBoxes/CodeBoxesActions';
import ClassesActions from '../Classes/ClassesActions';

// Components
import MUI from 'material-ui';

export default React.createClass({

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

  handleDialogShow() {
    console.info('WebhookDialog::handleDialogShow');
    CodeBoxesActions.fetch();
  },

  handleAddSubmit() {
    WebhooksActions.createWebhook({
      name        : this.state.name,
      codebox     : this.state.codebox,
      description : this.state.description,
      'public'    : this.state.public
    });
  },

  handleEditSubmit() {
    WebhooksActions.updateWebhook(
      this.state.name, {
        codebox     : this.state.codebox,
        description : this.state.description,
        'public'    : this.state.public
      });
  },

  handleToogle(event, status) {
    var state = {};
    state[event.target.name] = status;
    this.setState(state);
  },

  render() {
    var title       = this.hasEditMode() ? 'Edit' : 'Add',
        submitLabel = this.hasEditMode() ? 'Save changes' : 'Create',
        dialogStandardActions = [
          {
            ref        : 'cancel',
            text       : 'Cancel',
            onTouchTap : this.handleCancel
          },
          {
            ref        : 'submit',
            text       : {submitLabel},
            onTouchTap : this.handleFormValidation
          }
        ];

    return (
      <MUI.Dialog
        ref             = 'dialog'
        title           = {title + ' CodeBox Endpoint'}
        openImmediately = {this.props.openImmediately}
        actions         = {dialogStandardActions}
        onShow          = {this.handleDialogShow}
        onDismiss       = {this.resetDialogState}
        modal           = {true}
      >
        <div>
          {this.renderFormNotifications()}
          <MUI.TextField
            ref               = "name"
            name              = "name"
            fullWidth         = {true}
            disabled          = {this.hasEditMode()}
            valueLink         = {this.linkState('name')}
            errorText         = {this.getValidationMessages('name').join(' ')}
            hintText          = "Name of the WebHook"
            floatingLabelText = "Name"
          />
          <MUI.TextField
            ref               = "description"
            name              = "description"
            fullWidth         = {true}
            valueLink         = {this.linkState('description')}
            errorText         = {this.getValidationMessages('description').join(' ')}
            hintText          = "Description of the WebHook"
            floatingLabelText = "Description"
          />
          <MUI.SelectField
            ref               = "codebox"
            name              = "codebox"
            floatingLabelText = "CodeBox"
            valueLink         = {this.linkState('codebox')}
            errorText         = {this.getValidationMessages('codebox').join(' ')}
            valueMember       = "payload"
            displayMember     = "text"
            fullWidth         = {true}
            menuItems         = {this.state.codeboxes}
          />
          <MUI.Toggle
            ref            = 'public'
            name           = 'public'
            onToggle       = {this.handleToogle}
            style          = {{marginTop: 20}}
            defaultToggled = {this.state.public}
            label          = 'Make this WebHook public?'
          />
        </div>
      </MUI.Dialog>
    );
  }
});

