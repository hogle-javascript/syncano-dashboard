import React from 'react';
import Reflux from 'reflux';
import Select from 'react-select';
import MUI from 'material-ui';

// Utils
import DialogMixin from '../../mixins/DialogMixin';
import FormMixin from '../../mixins/FormMixin';

// Stores and Actions
import UsersActions from './UsersActions';
import UserDialogStore from './UserDialogStore';
import GroupsStore from './GroupsStore';

// Components
import Common from '../../common';

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

  handleAddSubmit() {
    let activeGroup = GroupsStore.getActiveGroup(),
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

  handleEditSubmit() {
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

  handleSelectFieldChange(newValue, selectedGroups) {
    this.setState({
      newUserGroups: selectedGroups
    })
  },

  getSelectValueSource() {
    let activeGroup = GroupsStore.getActiveGroup();

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

  render() {
    let title             = this.hasEditMode() ? 'Edit' : 'Add',
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
      <MUI.Dialog
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

            <MUI.TextField
              ref               = 'username'
              name              = 'username'
              fullWidth         = {true}
              valueLink         = {this.linkState('username')}
              errorText         = {this.getValidationMessages('username').join(' ')}
              hintText          = 'Username'
              floatingLabelText = 'Username'
            />

            <MUI.TextField
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
          <Common.Loading
              type="linear"
              position="bottom"
              show={this.state.isLoading}
            />
        </div>
      </MUI.Dialog>
    );
  }

});
