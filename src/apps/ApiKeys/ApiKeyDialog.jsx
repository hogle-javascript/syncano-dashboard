import React from 'react';
import Reflux from 'reflux';

// Utils
import {DialogMixin, FormMixin} from '../../mixins';

// Stores and Actions
import Actions from './ApiKeysActions';
import Store from './ApiKeyDialogStore';

// Components
import {FlatButton, Toggle, TextField} from 'syncano-material-ui';
import {Dialog} from '../../common';

export default React.createClass({
  displayName: 'ApiKeyDialog',

  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin
  ],

  handleAddSubmit() {
    Actions.createApiKey({
      description: this.state.description,
      allow_user_create: this.state.allow_user_create,
      ignore_acl: this.state.ignore_acl
    });
  },

  handleEditSubmit() {
    Actions.updateApiKey(this.state.id, {
      description: this.state.description,
      allow_user_create: this.state.allow_user_create,
      ignore_acl: this.state.ignore_acl
    });
  },

  handleToogle(event, status) {
    let state = {};

    state[event.target.name] = status;
    this.setState(state);
  },

  render() {
    let title = this.hasEditMode() ? 'Edit' : 'Generate';
    let submitLabel = this.hasEditMode() ? 'Save changes' : 'Confirm';
    let dialogStandardActions = [
      <FlatButton
        key="cancel"
        label="Cancel"
        onTouchTap={this.handleCancel}
        ref="cancel"/>,
      <FlatButton
        key="confirm"
        label={submitLabel}
        primary={true}
        onTouchTap={this.handleFormValidation}
        ref="submit"/>
    ];

    return (
      <Dialog
        key="dialog"
        ref="dialog"
        title={`${title} an API Key`}
        defaultOpen={this.props.defaultOpen}
        onRequestClose={this.handleCancel}
        open={this.state.open}
        actions={dialogStandardActions}>
        {this.renderFormNotifications()}
        <TextField
          ref="description"
          name="description"
          fullWidth={true}
          valueLink={this.linkState('description')}
          errorText={this.getValidationMessages('description').join(' ')}
          floatingLabelText="Description of an API Key"
          className="vm-3-b"/>
        <Toggle
          ref="ignore_acl"
          name="ignore_acl"
          defaultToggled={this.state.ignore_acl}
          onToggle={this.handleToogle}
          label="Ignore ACL?"
          className="vm-3-b"/>
        <Toggle
          ref="allow_user_create"
          name="allow_user_create"
          defaultToggled={this.state.allow_user_create}
          onToggle={this.handleToogle}
          label="User registration?"/>
      </Dialog>
    );
  }
});

