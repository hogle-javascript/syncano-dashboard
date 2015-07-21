import React from 'react';
import Reflux from 'reflux';

// Utils
import DialogMixin from '../../mixins/DialogMixin';
import FormMixin from '../../mixins/FormMixin';

// Stores and Actions
import CodeBoxesActions from './CodeBoxesActions';
import CodeBoxDialogStore from './CodeBoxDialogStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'CodeBoxDialog',

  mixins: [
    React.addons.LinkedStateMixin,
    Reflux.connect(CodeBoxDialogStore),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints: {
    label: {
      presence: true
    },
    runtime_name: {
      presence: true
    }
  },

  handleDialogShow() {
    console.info('ScheduleDialog::handleDialogShow');
    CodeBoxesActions.fetchCodeBoxRuntimes();
  },

  handleEditSubmit() {
    CodeBoxesActions.updateCodeBox(this.state.id, {
      label        : this.state.label,
      description  : this.state.description,
      runtime_name : this.state.runtime_name
    });
  },

  handleAddSubmit() {
    CodeBoxesActions.createCodeBox({
      label        : this.state.label,
      description  : this.state.description,
      runtime_name : this.state.runtime_name
    });
  },

  render() {
    var title       = this.hasEditMode() ? 'Edit' : 'Add',
        submitLabel = this.hasEditMode() ? 'Save changes' : 'Create Codebox',
        dialogStandardActions = [
          {
            text       : 'Cancel',
            ref        : 'cancel',
            onTouchTap : this.handleCancel
          }, {
            text       : submitLabel,
            ref        : 'submit',
            onTouchTap : this.handleFormValidation
          }
        ];

    return (
      <MUI.Dialog
        ref          = 'dialog'
        title        = {title + ' CodeBox'}
        actions      = {dialogStandardActions}
        onDismiss    = {this.resetDialogState}
        onShow       = {this.handleDialogShow}
        contentStyle = {{padding: '8px 0 0 0'}}
      >
        <div>
          {this.renderFormNotifications()}
          <form
            onSubmit      = {this.handleFormValidation}
            acceptCharset = 'UTF-8'
            method        = 'post'
          >
            <MUI.TextField
              ref               = 'label'
              valueLink         = {this.linkState('label')}
              errorText         = {this.getValidationMessages('label').join(' ')}
              name              = 'label'
              style             = {{width:500}}
              hintText          = 'Short name for your CodeBox'
              floatingLabelText = 'Label of CodeBox'
            />
            <MUI.TextField
              ref               = 'description'
              name              = 'description'
              valueLink         = {this.linkState('description')}
              errorText         = {this.getValidationMessages('description').join(' ')}
              style             = {{width:500}}
              className         = 'text-field'
              multiLine         = {true}
              hintText          = 'Multiline description of CodeBox (optional)'
              floatingLabelText = 'Description of CodeBox'
            />
            <MUI.SelectField
              ref               = 'runtime_name'
              name              = 'runtime_name'
              floatingLabelText = 'Runtime name'
              valueLink         = {this.linkState('runtime_name')}
              errorText         = {this.getValidationMessages('runtime_name').join(' ')}
              valueMember       = 'payload'
              displayMember     = 'text'
              fullWidth         = {true}
              menuItems         = {this.state.runtimes}
            />
          </form>
        </div>
        <Common.Loading
          type     = 'linear'
          position = 'bottom'
          show     = {this.state.isLoading}
        />
      </MUI.Dialog>
    );
  }
});

