var React               = require('react'),
    Reflux              = require('reflux'),

    // Utils
    FormMixin           = require('../../mixins/FormMixin'),
    DialogMixin         = require('../../mixins/DialogMixin'),

    // Stores and Actions
    InstancesActions    = require('./InstancesActions'),
    InstanceDialogStore = require('./InstanceDialogStore'),
    ColorStore          = require('../../common/Color/ColorStore'),
    IconStore           = require('../../common/Icon/IconStore'),

    // Components
    mui                 = require('material-ui'),
    TextField           = mui.TextField,
    DropDownMenu        = mui.DropDownMenu,
    Dialog              = mui.Dialog,
    FlatButton          = mui.FlatButton;

module.exports = React.createClass({

  displayName: 'InstanceDialog',

  mixins: [
    Reflux.connect(InstanceDialogStore),
    React.addons.LinkedStateMixin,
    FormMixin,
    DialogMixin
  ],

  validatorConstraints: {
    name: {
      presence: true,
      length: {
        minimum: 5
      }
    }
  },

  handleEditSubmit: function () {
    InstancesActions.updateInstance(
      this.state.name,
      {description: this.state.description}
    );
  },

  handleAddSubmit: function () {
    InstancesActions.createInstance({
      name        : this.state.name,
      description : this.state.description,
      metadata: {
        color     : ColorStore.getRandomColorName(),
        icon      : IconStore.getRandomIconPickerIcon()
      }
    });
  },

  render: function () {
    var title = this.hasEditMode() ? 'Update an Instance': 'Create an Instance';

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
          <form
            onSubmit      = {this.handleFormValidation}
            acceptCharset = "UTF-8"
            method        = "post">

          <TextField
              ref               = "name"
              name              = "name"
              fullWidth         = {true}
              disabled          = {this.hasEditMode() ? true : false}
              valueLink         = {this.linkState('name')}
              errorText         = {this.getValidationMessages('name').join(' ')}
              hintText          = "Short name for your Instance"
              floatingLabelText = "Name" />

            <TextField
              ref               = "description"
              name              = "description"
              fullWidth         = {true}
              valueLink         = {this.linkState('description')}
              errorText         = {this.getValidationMessages('description').join(' ')}
              hintText          = "Multiline description of Instance (optional)"
              floatingLabelText = "Description" />

          </form>
        </div>
      </Dialog>
    );
  }

});

