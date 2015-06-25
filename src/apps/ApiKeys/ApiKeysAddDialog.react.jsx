var React           = require('react'),
    Reflux          = require('reflux'),

    // Utils
    ValidationMixin = require('../../mixins/ValidationMixin'),
    DialogFormMixin = require('../../mixins/DialogFormMixin'),
    FormMixin       = require('../../mixins/FormMixin'),

    // Stores and Actions
    ApiKeysActions  = require('./ApiKeysActions'),
    ApiKeysStore    = require('./ApiKeysStore'),

    // Components
    mui             = require('material-ui'),
    Toggle          = mui.Toggle,
    TextField       = mui.TextField,
    DropDownMenu    = mui.DropDownMenu,
    Dialog          = mui.Dialog;


module.exports = React.createClass({

  displayName: 'ApiKeysAddDialog',

  mixins: [
    Reflux.connect(ApiKeysStore),
    React.addons.LinkedStateMixin,
    DialogFormMixin,
    ValidationMixin,
    FormMixin
  ],

  validatorConstraints: {
    description: {
      presence: true
    }
  },

  getInitialState: function() {
    return {
      description       : "",
      ignore_acl        : false,
      allow_user_create : false
    }
  },

  clearData: function() {
    this.refs.ignore_acl.setToggled(false);
    this.refs.allow_user_create.setToggled(false);

    this.setState({
      description       : '',
      ignore_acl        : false,
      allow_user_create : false,
      errors            : {}
    })
  },

  handleAddSubmit: function () {
    ApiKeysActions.createApiKey({
      description       : this.state.description,
      allow_user_create : this.state.allow_user_create,
      ignore_acl        : this.state.ignore_acl
    });
  },

  handleToogle: function(field) {
    return function() {
      var stateObj = {};
      stateObj[field] = !this.state[field];
      this.setState(stateObj);
    }.bind(this);
  },

  render: function () {
    var title                 = this.props.mode === 'edit' ? 'Edit': 'Generate',
        submitLabel           = this.props.mode === 'edit' ? 'Save changes': 'Confirm',
        dialogStandardActions = [
          {
            text    : 'Cancel',
            onClick : this.handleCancel,
            ref     : 'cancel'
          },
          {
            text    : {submitLabel},
            onClick : this.handleFormValidation,
            ref     : 'submit'
          }
        ];

    return (
      <Dialog
        ref             = "dialogRef"
        title           = {title + " an API Key"}
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
              ref               = "description"
              name              = "description"
              fullWidth         = "true"
              valueLink         = {this.linkState('description')}
              errorText         = {this.getValidationMessages('description').join(' ')}
              floatingLabelText = "Description of an API Key" />

            <Toggle
              ref      = "ignore_acl"
              name     = "ignore_acl"
              onToggle = {this.handleToogle('ignore_acl')}
              style    = {{marginTop: 20}}
              label    = "Ignore ACL?" />

            <Toggle
              ref      = "allow_user_create"
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

