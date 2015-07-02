var React            = require('react'),
    Reflux           = require('reflux'),

    // Utils
    DialogMixin      = require('../../mixins/DialogMixin'),
    FormMixin        = require('../../mixins/FormMixin'),

    // Stores and Actions
    GroupsActions    = require('./GroupsActions'),
    GroupDialogStore = require('./GroupDialogStore'),
    GroupsStore      = require('./GroupsStore'),

    // Components
    Loading          = require('../../common/Loading/Loading.react.jsx'),
    mui              = require('material-ui'),
    Toggle           = mui.Toggle,
    TextField        = mui.TextField,
    DropDownMenu     = mui.DropDownMenu,
    Dialog           = mui.Dialog;


module.exports = React.createClass({

  displayName: 'GroupDialog',

  mixins: [
    Reflux.connect(GroupsStore, 'groups'),
    Reflux.connect(GroupDialogStore),
    React.addons.LinkedStateMixin,
    DialogMixin,
    FormMixin
  ],

  validatorConstraints: {
    label: {
      presence: true
    }
  },

  handleAddSubmit: function (event) {
    GroupsActions.createGroup(this.state.label);
  },

  handleEditSubmit: function (event) {
    GroupsActions.updateGroup(this.state.id, {
      label: this.state.label
    });
  },

  render: function () {
    var title       = this.hasEditMode() ? 'Edit': 'Add',
        submitLabel = this.hasEditMode() ? 'Save changes': 'Create',
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
        ref             = "dialog"
        title           = {title + " Group"}
        openImmediately = {this.props.openImmediately}
        actions         = {dialogStandardActions}
        onDismiss       = {this.resetDialogState}>
        <div>
          {this.renderFormNotifications()}
          <form
            onSubmit      = {this.handleFormValidation}
            acceptCharset = "UTF-8"
            method        = "post">

            <TextField
              ref               = "label"
              label             = "label"
              style             = {{width:'100%'}}
              valueLink         = {this.linkState('label')}
              errorText         = {this.getValidationMessages('label').join(' ')}
              hintText          = "Name of the group"
              floatingLabelText = "Group Name" />

          </form>
          <Loading
              type="linear"
              position="bottom"
              show={this.state.groups.isLoading} />
        </div>
      </Dialog>
    );
  }

});

