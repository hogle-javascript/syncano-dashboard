import React from 'react';
import Reflux from 'reflux';

// Utils
import Mixins from '../../mixins';

// Stores and Actions
import Actions from './ApiKeysActions';
import Store from './ApiKeyDialogStore';

// Components
import MUI from 'syncano-material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'ApiKeyDialog',

  mixins: [
    Reflux.connect(Store),
    Mixins.Dialog,
    Mixins.Form
  ],

  handleAddSubmit() {
    Actions.createApiKey({
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
      <MUI.FlatButton
        key="cancel"
        label="Cancel"
        onTouchTap={this.handleCancel}
        ref="cancel"/>,
      <MUI.FlatButton
        key="confirm"
        label={submitLabel}
        primary={true}
        onTouchTap={this.handleFormValidation}
        ref="submit"/>
    ];

    return (
      <Common.Dialog
        key='dialog'
        ref='dialog'
        title={`${title} an API Key`}
        defaultOpen={this.props.defaultOpen}
        onRequestClose={this.handleCancel}
        open={this.state.open}
        actions={dialogStandardActions}>
        {this.renderFormNotifications()}
        <MUI.TextField
          ref='description'
          name='description'
          fullWidth={true}
          valueLink={this.linkState('description')}
          errorText={this.getValidationMessages('description').join(' ')}
          floatingLabelText='Description of an API Key'/>
        <MUI.Toggle
          ref='ignore_acl'
          name='ignore_acl'
          onToggle={this.handleToogle}
          style={{marginTop: 20}}
          label='Ignore ACL?'/>
        <MUI.Toggle
          ref='allow_user_create'
          name='allow_user_create'
          onToggle={this.handleToogle}
          style={{marginTop: 20}}
          label='User registration?'/>
      </Common.Dialog>
    );
  }
});

