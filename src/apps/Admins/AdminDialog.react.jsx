var React                    = require('react'),
    Reflux                   = require('reflux'),

    // Utils
    DialogMixin              = require('../../mixins/DialogMixin'),
    FormMixin                = require('../../mixins/FormMixin'),

    // Stores and Actions
    AdminsActions            = require('./AdminsActions'),
    AdminsInvitationsActions = require('./AdminsInvitationsActions'),
    AdminDialogStore         = require('./AdminDialogStore'),

    // Components
    mui                       = require('material-ui'),
    TextField                 = mui.TextField,
    SelectField               = mui.SelectField,
    Dialog                    = mui.Dialog,
    Loading                   = require('../../common/Loading');

module.exports = React.createClass({

  displayName: 'AdminDialog',

  mixins: [
    Reflux.connect(AdminDialogStore),
    React.addons.LinkedStateMixin,
    DialogMixin,
    FormMixin
  ],

  validatorConstraints: {
    email: {
      presence: true,
      email: {
        message: '^Invalid email address'
      }
    },
    role: {
      presence: true
    }
  },

  handleAddSubmit: function() {
    AdminsInvitationsActions.createInvitation({
      email : this.state.email,
      role  : this.state.role
    });
  },

  handleEditSubmit: function() {
    AdminsActions.updateAdmin(this.state.id, {
      role  : this.state.role
    });
  },

  render: function() {
    var title       = this.hasEditMode() ? 'Edit' : 'Invite',
        submitLabel = this.hasEditMode() ? 'Save changes' : 'Confirm',
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
        ref             = 'dialog'
        title           = {title + ' an Administrator'}
        openImmediately = {this.props.openImmediately}
        actions         = {dialogStandardActions}
        onDismiss       = {this.resetDialogState}>
        <div>
          {this.renderFormNotifications()}
          <form
            onSubmit      = {this.handleFormValidation}
            acceptCharset = 'UTF-8'
            method        = 'post'>

            <TextField
              ref               = 'email'
              name              = 'email'
              fullWidth         = {true}
              disabled          = {this.hasEditMode() ? true : false}
              valueLink         = {this.linkState('email')}
              errorText         = {this.getValidationMessages('email').join(' ')}
              hintText          = 'Email of the administrator'
              floatingLabelText = 'Email' />

            <SelectField
              ref               = 'role'
              name              = 'role'
              autoWidth         = {true}
              valueLink         = {this.linkState('role')}
              valueMember       = 'payload'
              displayMember     = 'text'
              floatingLabelText = 'Role of the administrator'
              style             = {{width: '50%'}}
              errorText         = {this.getValidationMessages('role').join(' ')}
              menuItems         = {AdminDialogStore.getRoles()} />

          </form>
        </div>

      </Dialog>
    );
  }

});

