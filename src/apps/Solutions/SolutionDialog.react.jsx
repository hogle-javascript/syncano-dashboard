import React from 'react';
import Reflux from 'reflux';

// Utils
import Mixins from '../../mixins';

// Stores and Actions
import Actions from './SolutionsActions';
import Store from './SolutionDialogStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'SolutionDialog',

  mixins: [
    Reflux.connect(Store),
    React.addons.LinkedStateMixin,
    Mixins.Dialog,
    Mixins.Form
  ],

  validatorConstraints: {
    label: {
      presence: true,
      length: {
        minimum: 5
      }
    }
  },

  handleEditSubmit() {
    Actions.updateSolution({
      description: this.state.description
    });
  },

  handleAddSubmit() {
    Actions.createSolution({
      label       : this.state.label,
      description : this.state.description,
      public      : this.state.public ? true : false
      //metadata: {
      //  color     : Common.Color.getRandomColorName(),
      //  icon      : Common.Icon.Store.getRandomIconPickerIcon()
      //}
    });
  },

  handleToogle(event, status) {
    let state = {};
    state[event.target.name] = status;
    this.setState(state);
  },

  render() {
    let title = this.hasEditMode() ? 'Update an Solution' : 'Create a Solution';
    let dialogCustomActions = [
      <MUI.FlatButton
        key        = "cancel"
        label      = "Cancel"
        onTouchTap = {this.handleCancel}
        ref        = "cancel" />,
      <MUI.FlatButton
        key        = "confirm"
        label      = "Confirm"
        primary    = {true}
        onTouchTap = {this.handleFormValidation}
        ref        = "submit" />
    ];

    return (
      <Common.Dialog
        ref             = "dialog"
        title           = {title}
        openImmediately = {this.props.openImmediately}
        actions         = {dialogCustomActions}
        onDismiss       = {this.resetDialogState}>
        <div>
          {this.renderFormNotifications()}
          <MUI.TextField
              ref               = 'label'
              name              = 'label'
              fullWidth         = {true}
              disabled          = {this.hasEditMode() ? true : false}
              valueLink         = {this.linkState('label')}
              errorText         = {this.getValidationMessages('label').join(' ')}
              hintText          = 'Short name for your Solution'
              floatingLabelText = 'Name' />
          <MUI.TextField
            ref               = 'description'
            name              = 'description'
            fullWidth         = {true}
            valueLink         = {this.linkState('description')}
            errorText         = {this.getValidationMessages('description').join(' ')}
            hintText          = 'Sescription of Solution (optional)'
            floatingLabelText = 'Description' />
          <MUI.Toggle
            ref            = 'public'
            name           = 'public'
            defaultToggled = {this.state.public}
            onToggle       = {this.handleToogle}
            style          = {{marginTop: 20}}
            label          = 'Make this solution public?' />
        </div>
      </Common.Dialog>
    );
  }
});

