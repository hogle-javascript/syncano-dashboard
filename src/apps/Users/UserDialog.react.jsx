var React            = require('react'),
    Reflux           = require('reflux'),
    Select           = require('react-select'),

    // Utils
    FormMixin        = require('../../mixins/FormMixin'),
    DialogMixin      = require('../../mixins/DialogMixin'),

    // Stores and Actions
    UsersActions     = require('./UsersActions'),
    UserDialogStore  = require('./UserDialogStore'),
    CodeBoxesStore   = require('../CodeBoxes/CodeBoxesStore'),
    GroupsStore      = require('./GroupsStore'),

    // Components
    mui              = require('material-ui'),
    Toggle           = mui.Toggle,
    TextField        = mui.TextField,
    SelectField      = mui.SelectField,
    DropDownMenu     = mui.DropDownMenu,
    Dialog           = mui.Dialog;

require('react-select/dist/default.css');

module.exports = React.createClass({

  displayName: 'UserDialog',

  mixins: [
    React.addons.LinkedStateMixin,
    Reflux.connect(UserDialogStore),
    FormMixin,
    DialogMixin
  ],

  validatorConstraints: {
    username: {
      presence: true
    }
  },

  handleAddSubmit: function() {
    var activeGroup = GroupsStore.getActiveGroup(),
        userGroups = this.state.newUserGroups || [activeGroup];

    UsersActions.createUser(
      {
        username : this.state.username,
        password : this.state.password
      },
      {
        newGroups: userGroups
      }
    );
  },

  handleEditSubmit: function() {
    UsersActions.updateUser(
      this.state.id,
      {
        username: this.state.username,
        password: this.state.password
      },
      {
        groups    : this.state.groups,
        newGroups : this.state.newUserGroups
      }
    );
  },

  handleSelectFieldChange: function(newValue, selectedGroups) {
    this.setState({
      newUserGroups: selectedGroups
    })
  },

  render: function() {
    var title       = this.hasEditMode() ? 'Edit' : 'Add',
        submitLabel = 'Confirm',
        selectValue = '',
        activeGroup = GroupsStore.getActiveGroup(),
        allGroups   = GroupsStore.getGroups().map(function(group) {
          group.value = group.id + '';
          return group;
        }),
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

    if (this.state.newUserGroups) {
      selectValue = this.linkState('newUserGroups');
    } else if (this.state.groups) {
      selectValue = this.linkState('groups');
    } else if (activeGroup) {
      selectValue = activeGroup
    }

    return (
      <Dialog
        ref                   = 'dialog'
        title                 = {title + ' User'}
        actions               = {dialogStandardActions}
        onDismiss             = {this.resetDialogState}
        autoScrollBodyContent = {true} >
        <div>
          {this.renderFormNotifications()}
          <form
            onSubmit      = {this.handleFormValidation}
            acceptCharset = "UTF-8"
            method        = "post">

            <TextField
              ref               = 'username'
              name              = 'username'
              fullWidth         = {true}
              valueLink         = {this.linkState('username')}
              errorText         = {this.getValidationMessages('username').join(' ')}
              hintText          = 'Username'
              floatingLabelText = 'Username' />

            <TextField
              ref               = 'password'
              name              = 'password'
              type              = 'password'
              fullWidth         = {true}
              valueLink         = {this.linkState('password')}
              errorText         = {this.getValidationMessages('password').join(' ')}
              hintText          = 'User password'
              floatingLabelText = 'Password' />

            <Select
              name     = 'group'
              multi    = {true}
              value    = {selectValue.value || null}
              placeholder = 'User groups'
              options  = {allGroups}
              onChange = {this.handleSelectFieldChange} />

          </form>
        </div>
      </Dialog>
    );
  }

});
