import React from 'react';
import Reflux from 'reflux';

import Mixins from '../../mixins';

import Actions from './InstanceDialogActions';
import Store from './InstanceDialogStore';

import MUI from 'material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'InstanceDialog',

  mixins: [
    Reflux.connect(Store),
    React.addons.LinkedStateMixin,
    Mixins.Dialog,
    Mixins.Form
  ],

  validatorConstraints: {
    name: {
      presence: true,
      length: {
        minimum: 5
      }
    }
  },

  handleDialogShow() {
    if (!this.hasEditMode()) {
      this.setState({
        name: Store.genUniqueName()
      });
    }
  },

  handleEditSubmit() {
    Actions.updateInstance(
      this.state.name,
      {description: this.state.description}
    );
  },

  handleAddSubmit() {
    Actions.createInstance({
      name        : this.state.name,
      description : this.state.description,
      metadata: {
        color     : Common.Color.getRandomColorName(),
        icon      : Common.Icon.Store.getRandomIconPickerIcon()
      }
    });
  },

  render() {
    let title = this.hasEditMode() ? 'Update an Instance' : 'Create an Instance';
    let dialogCustomActions = [
      <MUI.FlatButton
        key        = "cancel"
        label      = "Cancel"
        onTouchTap = {this.handleCancel}
        ref        = "cancel"
      />,
      <MUI.FlatButton
        key        = "confirm"
        label      = "Confirm"
        primary    = {true}
        onTouchTap = {this.handleFormValidation}
        ref        = "submit"
      />
    ];

    return (
      <Common.Dialog
        ref             = "dialog"
        title           = {title}
        openImmediately = {this.props.openImmediately}
        actions         = {dialogCustomActions}
        onDismiss       = {this.resetDialogState}
        onShow          = {this.handleDialogShow}
      >
        <div>
          {this.renderFormNotifications()}
          <MUI.TextField
            ref               = "name"
            name              = "name"
            fullWidth         = {true}
            disabled          = {true}
            valueLink         = {this.linkState('name')}
            errorText         = {this.getValidationMessages('name').join(' ')}
            hintText          = "Short name for your Instance"
            floatingLabelText = "Name" 
          />
          <MUI.TextField
            ref               = "description"
            name              = "description"
            fullWidth         = {true}
            valueLink         = {this.linkState('description')}
            errorText         = {this.getValidationMessages('description').join(' ')}
            hintText          = "Multiline description of Instance (optional)"
            floatingLabelText = "Description" 
          />
        </div>
      </Common.Dialog>
    );
  }
});

