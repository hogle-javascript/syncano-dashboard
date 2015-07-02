var React             = require('react'),
    Reflux            = require('reflux'),

    // Utils
    DialogMixin       = require('../../mixins/DialogMixin'),
    FormMixin         = require('../../mixins/FormMixin'),

    // Stores and Actions
    ApiKeysActions    = require('./ApiKeysActions'),
    ApiKeyDialogStore = require('./ApiKeyDialogStore'),

    // Components
    mui               = require('material-ui'),
    Toggle            = mui.Toggle,
    TextField         = mui.TextField,
    DropDownMenu      = mui.DropDownMenu,
    Dialog            = mui.Dialog,
    Loading           = require('../../common/Loading/Loading.react.jsx');

module.exports = React.createClass({

  displayName: 'ApiKeyDialog',

  mixins: [
    Reflux.connect(ApiKeyDialogStore),
    React.addons.LinkedStateMixin,
    DialogMixin,
    FormMixin
  ],

  validatorConstraints: {},

  handleDialogShow: function() {
    console.info('ApiKeyDialog::handleDialogHide');
    this.refs.ignore_acl.setToggled(this.state.allow_user_create);
    this.refs.allow_user_create.setToggled(this.state.ignore_acl);
  },

  handleAddSubmit: function() {
    ApiKeysActions.createApiKey({
      description       : this.state.description,
      allow_user_create : this.state.allow_user_create,
      ignore_acl        : this.state.ignore_acl
    });
  },

  handleToogle: function(event, status) {
    var state = {};
    state[event.target.name] = status;
    this.setState(state);
  },

  render: function () {
    var title                 = this.hasEditMode() ? 'Edit': 'Generate',
        submitLabel           = this.hasEditMode() ? 'Save changes': 'Confirm',
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
        ref             = 'dialog'
        title           = {title + ' an API Key'}
        openImmediately = {this.props.openImmediately}
        actions         = {dialogStandardActions}
        onShow          = {this.handleDialogShow}
        modal           = {true}>
        <div>
          {this.renderFormNotifications()}
          <form
            onSubmit      = {this.handleFormValidation}
            acceptCharset = 'UTF-8'
            method        = 'post'>

            <TextField
              ref               = 'description'
              name              = 'description'
              fullWidth         = {true}
              valueLink         = {this.linkState('description')}
              errorText         = {this.getValidationMessages('description').join(' ')}
              floatingLabelText = 'Description of an API Key' />

            <Toggle
              ref      = 'ignore_acl'
              name     = 'ignore_acl'
              onToggle = {this.handleToogle}
              style    = {{marginTop: 20}}
              label    = 'Ignore ACL?' />

            <Toggle
              ref      = 'allow_user_create'
              name     = 'allow_user_create'
              onToggle = {this.handleToogle}
              style    = {{marginTop: 20}}
              label    = 'User registration?' />

          </form>
        </div>
      </Dialog>
    );
  }

});

