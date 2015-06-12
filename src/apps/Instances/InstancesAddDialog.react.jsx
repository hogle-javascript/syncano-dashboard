var React  = require('react'),
    Reflux = require('reflux'),

    // Utils
    ValidationMixin = require('../../mixins/ValidationMixin'),

    // Stores and Actions
    InstancesActions = require('./InstancesActions'),
    InstancesStore   = require('./InstancesStore'),

    // Components
    mui          = require('material-ui'),
    TextField    = mui.TextField,
    DropDownMenu = mui.DropDownMenu,
    Dialog       = mui.Dialog;


module.exports = React.createClass({

  displayName: 'InstancesAddDialog',

  mixins: [
    Reflux.connect(InstancesStore),
    React.addons.LinkedStateMixin,
    ValidationMixin,
  ],

  validatorConstraints: {
    name: {
      presence: true,
      length: {
        minimum: 5,
      }
    },
    description: {
    },
  },

  getInitialState: function() {
    return {
      description: ""
    }
  },

  clearData: function() {
    this.setState({
      name: '',
      description: '',
      errors: {},
    })
  },

  componentWillReceiveProps: function(nextProps, nextState) {
    if (nextProps.initialValues){
      this.setState({
          name: nextProps.initialValues.name,
          description: nextProps.initialValues.description
      })
    }
  },

  show: function() {
    console.log('InstancesAddDialog::show');
    this.clearData();
    this.refs.createInstanceDialog.show();
  },

  dismiss: function() {
    this.refs.createInstanceDialog.dismiss();
  },

  handleSubmit: function (event) {
    console.info('InstancesAddDialog::handleSubmit');
    event.preventDefault();

    if (!this.state.canSubmit) {
      return
    }

    this.validate(function (isValid) {
      console.info('InstancesAddDialog::handleSubmit isValid:', isValid);
      if (isValid === true) {

        if (this.props.mode === 'add') {
          InstancesActions.createInstance({
            name        : this.state.name,
            description : this.state.description,
          });
        } else if (this.props.mode === 'edit') {
          InstancesActions.updateInstance(this.state.name, {description: this.state.description});
        }
      }
    }.bind(this));
  },

  handleCancel: function(event) {
    this.setState({
      errors: {}});
    this.dismiss();
  },

  renderError: function () {
    if (!this.state.errors || this.state.errors.feedback === undefined) {
      return
    }
    return (
      <div>
        <p>{this.state.errors.feedback}</p>
      </div>
    )
  },

  render: function () {
    var title = this.props.mode === 'edit' ? 'Edit': 'Add';
    var submitLabel = this.props.mode === 'edit' ? 'Save changes': 'Create Instance';

    var dialogStandardActions = [
      {text: 'Cancel', onClick: this.handleCancel, ref: 'cancel'},
      {text: {submitLabel}, onClick: this.handleSubmit, ref: 'submit'}
    ];

    return (
      <Dialog
        ref="createInstanceDialog"
        title={title}
        openImmediately={this.props.openImmediately}
        actions={dialogStandardActions}
        modal={true}>
        <div>
        <form
          onSubmit={this.handleSubmit}
          acceptCharset="UTF-8"
          method="post">

        <TextField
            ref               = "name"
            name              = "name"
            style             = {{width:'100%'}}
            disabled          = {this.props.mode === 'edit' ? true: false}
            valueLink         = {this.linkState('name')}
            errorText         = {this.getValidationMessages('name').join()}
            hintText          = "Short name for your Instance"
            floatingLabelText = "Name of Instance" />

          <TextField
            ref               = "description"
            name              = "description"
            multiLine         = {true}
            style             = {{width:'100%'}}
            valueLink         = {this.linkState('description')}
            errorText         = {this.getValidationMessages('description').join()}
            hintText          = "Multiline description of Instance (optional)"
            floatingLabelText = "Description of Instance" />

        </form>
        </div>
      </Dialog>
    );
  }

});

