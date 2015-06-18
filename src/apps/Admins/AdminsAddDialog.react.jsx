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

  displayName: 'AdminInvitationDialog',

  mixins: [
    Reflux.connect(AdminsStore),
    React.addons.LinkedStateMixin,
    DialogFormMixin,
    ValidationMixin
  ],

  validatorConstraints: {
    email: {
      presence: true,
      email: true
    },
  },

  getInitialState: function() {
    return {
      email         : '',
      role          : ''
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

  handleRoleChange: function (event, selectedIndex, menuItem){
    console.info('AdminInvitationDialog::handleRoleChange', selectedIndex, menuItem );
    this.setState({role : menuItem.payload});
  },

  render: function () {
    var title       = this.props.mode === 'edit' ? 'Edit': 'Invite',
        submitLabel = this.props.mode === 'edit' ? 'Save changes': 'Invite Administrator';

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
        title           = {title + " Administrator"}
        openImmediately = {this.props.openImmediately}
        actions         = {dialogStandardActions}
        modal           = {true}>
        <div>
        <form
          onSubmit={this.handleSubmit}
          acceptCharset="UTF-8"
          method="post">

          <TextField
            ref               = "email"
            name              = "email"
            style             = {{width:'100%'}}
            disabled          = {this.props.mode === 'edit' ? true: false}
            valueLink         = {this.linkState('email')}
            errorText         = {this.getValidationMessages('email').join()}
            hintText          = "Email of the administrator"
            floatingLabelText = "Email" />

          <DropDownMenu
            ref               = "role"
            name              = "role"
            autoWidth         = {true}
            selectedIndex     = {AdminsStore.getRoleMenuIndex(this.state.role) || 0}
            floatingLabelText = "Role of the administrator"
            style             = {{width:500}}
            onChange          = {this.handleRoleChange}
            menuItems         = {AdminsStore.roleMenuItems} />

        </form>
        </div>
      </Dialog>
    );
  }

});

