var React            = require('react'),
    Reflux           = require('reflux'),

    // Utils
    ValidationMixin  = require('../../mixins/ValidationMixin'),
    FormMixin        = require('../../mixins/FormMixin'),
    DialogMixin      = require('../../mixins/DialogMixin'),

    // Stores and Actions
    UsersActions     = require('./UsersActions'),
    UserDialogStore  = require('./UserDialogStore'),
    CodeBoxesStore   = require('../CodeBoxes/CodeBoxesStore'),

    // Components
    mui              = require('material-ui'),
    Toggle           = mui.Toggle,
    TextField        = mui.TextField,
    DropDownMenu     = mui.DropDownMenu,
    Dialog           = mui.Dialog;


module.exports = React.createClass({

  displayName: 'UserDialog',

  mixins: [
    React.addons.LinkedStateMixin,
    Reflux.connect(UserDialogStore),
    ValidationMixin,
    FormMixin,
    DialogMixin
  ],

  validatorConstraints: {
    username: {
      presence: true
    },
    password: {
      presence: true
    }
  },

  handleAddSubmit: function () {
    UsersActions.createUser({
      username : this.state.username,
      password : this.state.password
    });
  },

  handleEditSubmit: function () {
    UsersActions.updateUser(this.state.instance.id, {
      username : this.state.username,
      password : this.state.password
    });
  },

  render: function () {
    var title       = this.hasEditMode() ? 'Edit': 'Add',
        submitLabel = 'Confirm',
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
        ref       = "dialog"
        title     = {title + " User"}
        actions   = {dialogStandardActions}
        modal     = {true}>
        <div>
          {this.renderFormNotifications()}
          <form
            onSubmit      = {this.handleFormValidation}
            acceptCharset = "UTF-8"
            method        = "post">

            <TextField
              ref               = "username"
              name              = "username"
              style             = {{width:'100%'}}
              valueLink         = {this.linkState('username')}
              errorText         = {this.getValidationMessages('username').join(' ')}
              hintText          = "Username"
              floatingLabelText = "Username" />

            <TextField
              ref               = "password"
              name              = "password"
              type              = "password"
              style             = {{width:'100%'}}
              valueLink         = {this.linkState('password')}
              errorText         = {this.getValidationMessages('password').join(' ')}
              hintText          = "User password"
              floatingLabelText = "Password" />

          </form>
        </div>
      </Dialog>
    );
  }

});
