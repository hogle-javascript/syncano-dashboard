import React from 'react';
import Reflux from 'reflux';

// Utils
import Mixins from '../../mixins';

// Stores and Actions
import SolutionsActions from './SolutionsActions';
import SolutionDialogStore from './SolutionDialogStore';
import ColorStore from '../../common/Color/ColorStore';
import IconStore from '../../common/Icon/IconStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'SolutionDialog',

  mixins: [
    Reflux.connect(SolutionDialogStore),
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
    SolutionsActions.updateSolution({
      description: this.state.description
    });
  },

  handleAddSubmit() {
    SolutionsActions.createSolution({
      label       : this.state.label,
      description : this.state.description,
      public      : this.state.public ? true : false
      //metadata: {
      //  color     : ColorStore.getRandomColorName(),
      //  icon      : IconStore.getRandomIconPickerIcon()
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
      >
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
              floatingLabelText = 'Name'
          />
          <MUI.TextField
            ref               = 'description'
            name              = 'description'
            fullWidth         = {true}
            valueLink         = {this.linkState('description')}
            errorText         = {this.getValidationMessages('description').join(' ')}
            hintText          = 'Sescription of Solution (optional)'
            floatingLabelText = 'Description'
          />
          <MUI.Toggle
            ref            = 'public'
            name           = 'public'
            defaultToggled = {this.state.public}
            onToggle       = {this.handleToogle}
            style          = {{marginTop: 20}}
            label          = 'Make this solution public?'
          />
        </div>
      </Common.Dialog>
    );
  }
});

