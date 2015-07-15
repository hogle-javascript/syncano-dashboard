var React               = require('react'),
    Reflux              = require('reflux'),

    // Utils
    FormMixin           = require('../../mixins/FormMixin'),
    DialogMixin         = require('../../mixins/DialogMixin'),

    // Stores and Actions
    SolutionsActions    = require('./SolutionsActions'),
    SolutionDialogStore = require('./SolutionDialogStore'),
    ColorStore          = require('../../common/Color/ColorStore'),
    IconStore           = require('../../common/Icon/IconStore'),

    // Components
    mui                 = require('material-ui'),
    Toggle              = mui.Toggle,
    TextField           = mui.TextField,
    DropDownMenu        = mui.DropDownMenu,
    Dialog              = mui.Dialog,
    FlatButton          = mui.FlatButton;

module.exports = React.createClass({

  displayName: 'SolutionDialog',

  mixins: [
    Reflux.connect(SolutionDialogStore),
    React.addons.LinkedStateMixin,
    FormMixin,
    DialogMixin
  ],

  validatorConstraints: {
    label: {
      presence: true,
      length: {
        minimum: 5
      }
    }
  },

  handleEditSubmit: function() {
    SolutionsActions.updateSolution(

      {description: this.state.description}
    );
  },

  handleAddSubmit: function() {
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

  handleToogle: function(event, status) {
    var state = {};
    state[event.target.name] = status;
    this.setState(state);
  },

  render: function() {
    var title = this.hasEditMode() ? 'Update an Solution' : 'Create a Solution';

    var dialogCustomActions = [
      <FlatButton
        key        = "cancel"
        label      = "Cancel"
        onTouchTap = {this.handleCancel}
        ref        = "cancel" />,

      <FlatButton
        key        = "confirm"
        label      = "Confirm"
        primary    = {true}
        onTouchTap = {this.handleFormValidation}
        ref        = "submit" />
    ];

    return (
      <Dialog
        ref             = "dialog"
        title           = {title}
        openImmediately = {this.props.openImmediately}
        actions         = {dialogCustomActions}
        onDismiss       = {this.resetDialogState}>
        <div>
          {this.renderFormNotifications()}

          <TextField
              ref               = 'label'
              name              = 'label'
              fullWidth         = {true}
              disabled          = {this.hasEditMode() ? true : false}
              valueLink         = {this.linkState('label')}
              errorText         = {this.getValidationMessages('label').join(' ')}
              hintText          = 'Short name for your Solution'
              floatingLabelText = 'Name' />

            <TextField
              ref               = 'description'
              name              = 'description'
              fullWidth         = {true}
              valueLink         = {this.linkState('description')}
              errorText         = {this.getValidationMessages('description').join(' ')}
              hintText          = 'Sescription of Solution (optional)'
              floatingLabelText = 'Description' />

            <Toggle
              ref            = 'public'
              name           = 'public'
              defaultToggled = {this.state.public}
              onToggle       = {this.handleToogle}
              style          = {{marginTop: 20}}
              label          = 'Make this solution public?' />

        </div>
      </Dialog>
    );
  }

});

