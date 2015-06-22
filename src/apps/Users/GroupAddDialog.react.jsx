var React           = require('react'),
    Reflux          = require('reflux'),

    // Utils
    ValidationMixin = require('../../mixins/ValidationMixin'),
    DialogFormMixin = require('../../mixins/DialogFormMixin'),

    // Stores and Actions
    GroupsActions   = require('./GroupsActions'),
    GroupsStore     = require('./GroupsStore'),

    // Components
    mui             = require('material-ui'),
    Toggle          = mui.Toggle,
    TextField       = mui.TextField,
    DropDownMenu    = mui.DropDownMenu,
    Dialog          = mui.Dialog;


module.exports = React.createClass({

  displayName: 'GroupsAddDialog',

  mixins: [
    Reflux.connect(GroupsStore),
    React.addons.LinkedStateMixin,
    DialogFormMixin,
    ValidationMixin
  ],

  validatorConstraints: {
    label: {
      presence: true
    }
  },

  clearData: function() {
    this.setState({
      label  : '',
      errors : {}
    })
  },

  editShow: function() {
    var checkedItem = GroupsStore.getCheckedItem();
    if (checkedItem) {
      this.setState({
          id    : checkedItem.id,
          label : checkedItem.label
      });
    }
  },

  handleAddSubmit: function (event) {
    GroupsActions.createGroup(this.state.label);
  },

  handleEditSubmit: function (event) {
    GroupsActions.updateGroup(
      this.state.id, {
        label   : this.state.label
      });
  },


  render: function () {

    var title       = this.props.mode === 'edit' ? 'Edit': 'Add',
        submitLabel = this.props.mode === 'edit' ? 'Save changes': 'Create',
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
        title           = {title + " Group"}
        openImmediately = {this.props.openImmediately}
        actions         = {dialogStandardActions}
        modal           = {true}>
        <div>
        <form
          onSubmit      = {this.handleSubmit}
          acceptCharset = "UTF-8"
          method        = "post">

          <TextField
            ref               = "label"
            label             = "label"
            style             = {{width:'100%'}}
            valueLink         = {this.linkState('label')}
            errorText         = {this.getValidationMessages('label').join()}
            hintText          = "Name of the group"
            floatingLabelText = "Group Name" />
          
        </form>
        </div>
      </Dialog>
    );
  }

});

