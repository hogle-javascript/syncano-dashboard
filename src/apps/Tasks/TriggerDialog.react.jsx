import React from 'react';
import Reflux from 'reflux';

// Utils
import Mixins from '../../mixins';

// Stores and Actions
import TriggersActions from './TriggersActions';
import TriggerDialogStore from './TriggerDialogStore';
import CodeBoxesActions from '../CodeBoxes/CodeBoxesActions';
import ClassesActions from '../Classes/ClassesActions';

// Components
import MUI from 'material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'TriggerDialog',

  mixins: [
    Reflux.connect(TriggerDialogStore),
    React.addons.LinkedStateMixin,
    Mixins.Dialog,
    Mixins.Form
  ],

  validatorConstraints: {
    label: {
      presence: true
    },
    signal: {
      presence: true
    },
    class: {
      presence: true
    },
    codebox: {
      presence: true
    }
  },

  handleDialogShow() {
    console.info('TriggerDialog::handleDialogShow');
    CodeBoxesActions.fetch();
    ClassesActions.fetch();
  },

  handleAddSubmit() {
    TriggersActions.createTrigger({
      label   : this.state.label,
      codebox : this.state.codebox,
      class   : this.state.class,
      signal  : this.state.signal
    });
  },

  handleEditSubmit() {
    TriggersActions.updateTrigger(
      this.state.id, {
        label   : this.state.label,
        codebox : this.state.codebox,
        class   : this.state.class,
        signal  : this.state.signal
      });
  },

  render() {
    let title = this.hasEditMode() ? 'Update' : 'Create';
    let dialogStandardActions = [
      {
        ref        : 'cancel',
        text       : 'Cancel',
        onTouchTap : this.handleCancel
      },
      {
        ref        : 'submit',
        text       : 'Confirm',
        onTouchTap : this.handleFormValidation
      }
    ];

    return (
      <Common.Dialog
        ref             = "dialog"
        title           = {title + ' a Trigger'}
        openImmediately = {this.props.openImmediately}
        actions         = {dialogStandardActions}
        onShow          = {this.handleDialogShow}
        onDismiss       = {this.resetDialogState}
      >
        <div>
          {this.renderFormNotifications()}
          <form
            onSubmit      = {this.handleFormValidation}
            acceptCharset = "UTF-8"
            method        = "post"
          >
            <MUI.TextField
              ref               = "label"
              name              = "label"
              fullWidth         = {true}
              valueLink         = {this.linkState('label')}
              errorText         = {this.getValidationMessages('label').join(' ')}
              hintText          = "Label of the trigger"
              floatingLabelText = "Label" 
            />
            <MUI.SelectField
              ref               = "signal"
              name              = "signal"
              hintText          = "Signal"
              fullWidth         = {true}
              valueLink         = {this.linkState('signal')}
              errorText         = {this.getValidationMessages('signal').join(' ')}
              valueMember       = "payload"
              displayMember     = "text"
              menuItems         = {TriggerDialogStore.getSignalsDropdown()} 
            />
            <MUI.SelectField
              ref               = "class"
              name              = "class"
              hintText          = "Class"
              fullWidth         = {true}
              valueLink         = {this.linkState('class')}
              errorText         = {this.getValidationMessages('class').join(' ')}
              valueMember       = "payload"
              displayMember     = "text"
              menuItems         = {this.state.classes} 
            />
            <MUI.SelectField
              ref               = "codebox"
              name              = "codebox"
              hintText          = "CodeBox"
              valueLink         = {this.linkState('codebox')}
              errorText         = {this.getValidationMessages('codebox').join(' ')}
              valueMember       = "payload"
              displayMember     = "text"
              fullWidth         = {true}
              menuItems         = {this.state.codeboxes} 
            />
          </form>
        </div>
      </Common.Dialog>
    );
  }
});

