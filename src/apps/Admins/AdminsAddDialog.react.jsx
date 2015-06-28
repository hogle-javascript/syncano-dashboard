var React                    = require('react'),
    Reflux                   = require('reflux'),

    // Utils
    ValidationMixin          = require('../../mixins/ValidationMixin'),
    DialogFormMixin          = require('../../mixins/DialogFormMixin'),
    FormMixin                = require('../../mixins/FormMixin'),

    // Stores and Actions
    AdminsActions            = require('./AdminsActions'),
    AdminsInvitationsActions = require('./AdminsInvitationsActions'),
    AdminsStore              = require('./AdminsStore'),

    // Components
    mui                       = require('material-ui'),
    Toggle                    = mui.Toggle,
    TextField                 = mui.TextField,
    SelectField               = mui.SelectField,
    Dialog                    = mui.Dialog;


module.exports = React.createClass({

  displayName: 'AdminInvitationDialog',

  mixins: [
    Reflux.connect(AdminsStore),
    React.addons.LinkedStateMixin,
    DialogFormMixin,
    ValidationMixin,
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

  getInitialState: function() {
    return {
      email : '',
      role  : ''
    }
  },

  clearData: function() {
    this.setState({
      email  : '',
      role   : '',
      errors : {}
    })
  },

  editShow: function() {
    console.info('AdminInvitationDialog::editShow');
    var checkedItem = this.props.store.getCheckedItem();
    if (checkedItem) {
      this.setState({
            email : checkedItem.email,
            role  : checkedItem.role
      });
    }
  },

  handleAddSubmit: function () {
    AdminsInvitationsActions.createInvitation({
      email : this.state.email,
      role  : this.state.role
    });
  },

  handleEditSubmit: function () {
    var checkedItem = this.props.store.getCheckedItem();
    AdminsActions.updateAdmin(checkedItem.id, {
      role  : this.state.role
    });
  },

  render: function () {
    var title       = this.props.mode === 'edit' ? 'Edit': 'Invite',
        submitLabel = this.props.mode === 'edit' ? 'Save changes': 'Confirm',

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
        ref             = "dialogRef"
        title           = {title + " an Administrator"}
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
              ref               = "email"
              name              = "email"
              fullWidth         = {true}
              disabled          = {this.props.mode === 'edit' ? true: false}
              valueLink         = {this.linkState('email')}
              errorText         = {this.getValidationMessages('email').join(' ')}
              hintText          = "Email of the administrator"
              floatingLabelText = "Email" />

            <SelectField
              ref               = "role"
              name              = "role"
              autoWidth         = {true}
              valueLink         = {this.linkState("role")}
              valueMember       = "payload"
              displayMember     = "text"
              floatingLabelText = "Role of the administrator"
              style             = {{width: '50%'}}
              errorText         = {this.getValidationMessages('role').join(' ')}
              menuItems         = {AdminsStore.getRoles()} />

          </form>
        </div>
      </Dialog>
    );
  }

});

