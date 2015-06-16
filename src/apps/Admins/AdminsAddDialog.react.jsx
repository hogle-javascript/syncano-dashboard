var React                    = require('react'),
    Reflux                   = require('reflux'),

    // Utils
    ValidationMixin          = require('../../mixins/ValidationMixin'),
    DialogFormMixin          = require('../../mixins/DialogFormMixin'),

    // Stores and Actions
    AdminsActions            = require('./AdminsActions'),
    AdminsInvitationsActions = require('./AdminsInvitationsActions'),
    AdminsStore              = require('./AdminsStore'),

    // Components
    mui                       = require('material-ui'),
    Toggle                    = mui.Toggle,
    TextField                 = mui.TextField,
    DropDownMenu              = mui.DropDownMenu,
    Dialog                    = mui.Dialog;


module.exports = React.createClass({

  displayName: 'AdminsAddDialog',

  mixins: [
    Reflux.connect(AdminsStore),
    React.addons.LinkedStateMixin,
    DialogFormMixin,
    ValidationMixin,
  ],

  validatorConstraints: {
    email: {
      presence: true,
      email: true
    },
  },

  clearData: function() {
    this.setState({
      email  : '',
      errors : {},
    })
  },

  handleAddSubmit: function (event) {
    AdminsInvitationsActions.createInvitation({
      email : this.state.email,
      role  : this.state.role,
    });
  },

  handleRoleChange: function (event, selectedIndex, menuItem){
    this.setState({role: selectedIndex});
  },

  render: function () {
    var title = "Invite Administrator";
    var submitLabel = "Send Invitation";

    var dialogStandardActions = [
      {text: 'Cancel', onClick: this.handleCancel, ref: 'cancel'},
      {text: {submitLabel}, onClick: this.handleSubmit, ref: 'submit'}
    ];

    // TODO: move it to the store
    var menuItems = [
      {
        payload: 'read',
        text: 'read'
      },
      {
        payload: 'write',
        text: 'write'
      },
      {
        payload: 'full',
        text: 'full'
      },
    ];

    return (
      <Dialog
        ref="dialogRef"
        title={title + " API Key"}
        openImmediately={this.props.openImmediately}
        actions={dialogStandardActions}
        modal={true}>
        <div>
        <form
          onSubmit={this.handleSubmit}
          acceptCharset="UTF-8"
          method="post">

          <TextField
            ref               = "email"
            name              = "email"
            style             = {{width:'100%'}}
            valueLink         = {this.linkState('email')}
            errorText         = {this.getValidationMessages('email').join()}
            hintText          = "Email of the new administrator"
            floatingLabelText = "Email" />

          <DropDownMenu
            ref               = "role"
            name              = "role"
            autoWidth         = {true}
            floatingLabelText = "Role of the new administrator"
            style             = {{width:500}}
            onChange          = {this.handleRoleChange}
            menuItems         = {menuItems} />;

        </form>
        </div>
      </Dialog>
    );
  }

});

