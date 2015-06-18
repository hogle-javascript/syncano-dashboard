var React  = require('react'),
    Reflux = require('reflux'),

    // Utils
    ValidationMixin = require('../../mixins/ValidationMixin'),

    // Stores and Actions
    ApiKeysActions = require('./ApiKeysActions'),
    ApiKeysStore   = require('./ApiKeysStore'),

    // Components
    mui          = require('material-ui'),
    Toggle       = mui.Toggle,
    TextField    = mui.TextField,
    DropDownMenu = mui.DropDownMenu,
    Dialog       = mui.Dialog;


module.exports = React.createClass({

  displayName: 'ApiKeysAddDialog',

  mixins: [
    Reflux.connect(ApiKeysStore),
    React.addons.LinkedStateMixin,
    ValidationMixin,
  ],

  validatorConstraints: {
    description: {
    },
  },

  getInitialState: function() {
    return {
      description       : "",
      ignore_acl        : false,
      allow_user_create : false,
    }
  },

  clearData: function() {
    this.setState({
      description       : '',
      ignore_acl        : false,
      allow_user_create : false,
      errors            : {},
    })
  },
  componentWillUpdate: function() {
    console.log('ApiKeysAddDialog::componentWillUpdate');
  },

  show: function() {
    console.log('ApiKeysAddDialog::show');
    this.clearData();

    // When it is "edit" mode, we want to set values
    if (this.props.mode === "edit"){
      var checkedItem = ApiKeysStore.getCheckedItem();
      if (checkedItem) {
        this.setState({
            description : checkedItem.description
        });
      }
    }

    this.refs.createApiKeyDialog.show();
  },

  dismiss: function() {
    this.refs.createApiKeyDialog.dismiss();
  },

  handleSubmit: function (event) {
    console.info('ApiKeysAddDialog::handleSubmit');
    event.preventDefault();

    if (!this.state.canSubmit) {
      return
    }

    this.validate(function (isValid) {
      console.info('ApiKeysAddDialog::handleSubmit isValid:', isValid);
      if (isValid === true) {

        if (this.props.mode === 'add') {
          ApiKeysActions.createApiKey({
            description       : this.state.description,
            allow_user_create : this.state.allow_user_create,
            ignore_acl        : this.state.ignore_acl
          });
        } else if (this.props.mode === 'edit') {
          ApiKeysActions.updateApiKey(this.state.name, {description: this.state.description});
        }
      }
    }.bind(this));
  },

  handleCancel: function(event) {
    this.setState({
      errors: {}});
    this.dismiss();
  },

  handleToogle: function(field) {
    return function() {
      var stateObj = {};
      stateObj[field] = !this.state[field];
      this.setState(stateObj);
    }.bind(this);
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
    var title = this.props.mode === 'edit' ? 'Edit': 'Generate';
    var submitLabel = this.props.mode === 'edit' ? 'Save changes': 'Generate Api Key';

    var dialogStandardActions = [
      {text: 'Cancel', onClick: this.handleCancel, ref: 'cancel'},
      {text: {submitLabel}, onClick: this.handleSubmit, ref: 'submit'}
    ];

    return (
      <Dialog
        ref="createApiKeyDialog"
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
            ref               = "description"
            name              = "description"
            style             = {{width:'100%'}}
            valueLink         = {this.linkState('description')}
            errorText         = {this.getValidationMessages('description').join(' ')}
            hintText          = "Label of API key"
            floatingLabelText = "Label" />

          <Toggle
            name     = "ignore_acl"
            onToggle = {this.handleToogle('ignore_acl')}
            style    = {{marginTop: 20}}
            label    = "Ignore ACL?" />

          <Toggle
            name     = "allow_user_create"
            onToggle = {this.handleToogle('allow_user_create')}
            style    = {{marginTop: 20}}
            label    = "User registration?" />

        </form>
        </div>
      </Dialog>
    );
  }

});

