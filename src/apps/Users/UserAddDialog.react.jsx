var React            = require('react'),
    Reflux           = require('reflux'),

    // Utils
    ValidationMixin  = require('../../mixins/ValidationMixin'),
    DialogFormMixin  = require('../../mixins/DialogFormMixin'),
    FormMixin        = require('../../mixins/FormMixin'),

    // Stores and Actions
    UsersActions     = require('./UsersActions'),
    UsersStore       = require('./UsersStore'),
    CodeBoxesStore   = require('../CodeBoxes/CodeBoxesStore'),

    // Components
    mui              = require('material-ui'),
    Toggle           = mui.Toggle,
    TextField        = mui.TextField,
    DropDownMenu     = mui.DropDownMenu,
    Dialog           = mui.Dialog;


module.exports = React.createClass({

  displayName: 'UsersAddDialog',

  mixins: [
    React.addons.LinkedStateMixin,
    Reflux.connect(UsersStore),
    DialogFormMixin,
    ValidationMixin,
    FormMixin
  ],

  validatorConstraints: {
    username: {
      presence: true
    },
    password: {
      presence: true
    }
  },

  clearData: function() {
    this.setState({
      username  : '',
      password  : '',
      errors : {},
    })
  },

  editShow: function() {
    var checkedItem = UsersStore.getCheckedItem();
    if (checkedItem) {
      this.setState({
          id       : checkedItem.id,
          username : checkedItem.username,
          password : checkedItem.password
      });
    }
  },

  handleAddSubmit: function () {
    var checkedItem = UsersStore.getCheckedItem();
    UsersActions.createUser({
        username : this.state.username,
        password : this.state.password
    });
  },

  handleEditSubmit: function () {
    UsersActions.updateUser(
      this.state.id, {
        username : this.state.username,
        password : this.state.password
      }
    );
  },

  render: function () {
    var title       = this.props.mode === 'edit' ? 'Edit': 'Add',
        submitLabel = 'Confirm';

        dialogStandardActions = [
          {
            ref     : 'cancel',
            text    : 'Cancel',
            onClick : this.handleCancel
          },
          {
            ref     : 'submit',
            text    : {submitLabel},
            onClick : this.handleSubmit
          }
        ];

    return (
      <Dialog
        ref             = "dialogRef"
        title           = {title + " User"}
        openImmediately = {this.props.openImmediately}
        actions         = {dialogStandardActions}
        modal           = {true}>
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
