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
        userGroups  = this.state.newUserGroups || [this.state.secondInstance] || [activeGroup];

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

  getSelectValueSource: function() {
    var activeGroup = GroupsStore.getActiveGroup();

    if (this.state.newUserGroups) {
      return this.linkState('newUserGroups');
    } else if (this.state.groups) {
      return this.linkState('groups');
    } else if (this.state.secondInstance && this.state.secondInstance.value) {
      return this.state.secondInstance;
    } else if (activeGroup) {
      return activeGroup;
    } else {
      return null
    }
  },

  render: function() {
    var title             = this.hasEditMode() ? 'Edit' : 'Add',
        submitLabel       = 'Confirm',
        selectValueSource = this.getSelectValueSource(),
        selectValue       = selectValueSource ? selectValueSource.value : null,
        allGroups         = GroupsStore.getGroups().map(function(group) {
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

    return (
      <Dialog
        ref       = 'dialog'
        title     = {title + ' User'}
        actions   = {dialogStandardActions}
        onDismiss = {this.resetDialogState}
        style     = {{overflow: 'auto'}}
      >
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
              floatingLabelText = 'Username'
            />

            <TextField
              ref               = 'password'
              name              = 'password'
              type              = 'password'
              fullWidth         = {true}
              valueLink         = {this.linkState('password')}
              errorText         = {this.getValidationMessages('password').join(' ')}
              hintText          = 'User password'
              floatingLabelText = 'Password'
              className         = 'vm-4-b'
            />

            <Select
              name        = 'group'
              multi       = {true}
              value       = {selectValue}
              placeholder = 'User groups'
              options     = {allGroups}
              onChange    = {this.handleSelectFieldChange}
            />

          </form>
        </div>
      </Dialog>
    );
  }

});
