var React  = require('react'),
    Reflux = require('reflux'),

    // Utils
    ValidationMixin = require('../../mixins/ValidationMixin'),
    DialogFormMixin = require('../../mixins/DialogFormMixin'),

    // Stores and Actions
    InstancesActions = require('./InstancesActions'),
    InstancesStore   = require('./InstancesStore'),

    // Components
    mui          = require('material-ui'),
    TextField    = mui.TextField,
    DropDownMenu = mui.DropDownMenu,
    Dialog       = mui.Dialog,
    FlatButton   = mui.FlatButton;


module.exports = React.createClass({

  displayName: 'InstancesAddDialog',

  mixins: [
    Reflux.connect(InstancesStore),
    React.addons.LinkedStateMixin,
    DialogFormMixin,
    ValidationMixin
  ],

  validatorConstraints: {
    name: {
      presence: true,
      length: {
        minimum: 5
      }
    },
    description: {
    }
  },

  getInitialState: function() {
    return {
      description: ""
    }
  },

  clearData: function() {
    this.setState({
      name        : '',
      description : '',
      errors      : {}
    })
  },

  editShow: function() {
    var checkedItem = InstancesStore.getCheckedItem();
    if (checkedItem) {
      this.setState({
            name        : checkedItem.name,
            description : checkedItem.description
      });
    }
  },

  handleEditSubmit: function () {
    InstancesActions.updateInstance(
      this.state.name,
      {description: this.state.description}
    );
  },

  handleAddSubmit: function () {
    InstancesActions.createInstance({
      name        : this.state.name,
      description : this.state.description
    });
  },

  render: function () {
    var title = this.props.mode === 'edit' ? 'Update an Instance': 'Create an Instance';

    var dialogCustomActions = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.handleCancel}
        ref="cancel" />,
      <FlatButton
        label="Confirm"
        primary={true}
        onTouchTap={this.handleSubmit}
        ref="submit" />
    ];

    return (
      <Dialog
        ref             = "dialogRef"
        title           = {title}
        openImmediately = {this.props.openImmediately}
        actions         = {dialogCustomActions}
        modal           = {true}>
        <div>
          <form
            onSubmit      = {this.handleSubmit}
            acceptCharset = "UTF-8"
            method        = "post">

          <TextField
              ref               = "name"
              name              = "name"
              style             = {{width:'100%'}}
              disabled          = {this.props.mode === 'edit' ? true : false}
              valueLink         = {this.linkState('name')}
              errorText         = {this.getValidationMessages('name').join()}
              hintText          = "Short name for your Instance"
              floatingLabelText = "Name" />

            <TextField
              ref               = "description"
              name              = "description"
              multiLine         = {true}
              style             = {{width:'100%'}}
              valueLink         = {this.linkState('description')}
              errorText         = {this.getValidationMessages('description').join()}
              hintText          = "Multiline description of Instance (optional)"
              floatingLabelText = "Description" />

          </form>
        </div>
      </Dialog>
    );
  }

});

