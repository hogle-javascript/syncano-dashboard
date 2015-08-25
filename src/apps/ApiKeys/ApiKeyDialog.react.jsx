import React from 'react';
import Reflux from 'reflux';

// Utils
import Mixins from '../../mixins';

// Stores and Actions
import Actions from './ApiKeysActions';
import Store from './ApiKeyDialogStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'ApiKeyDialog',

  mixins: [
    Reflux.connect(Store),
    Mixins.Dialog,
    Mixins.Form
  ],

  handleDialogShow() {
    console.info('ApiKeyDialog::handleDialogHide');
    this.refs.ignore_acl.setToggled(this.state.allow_user_create);
    this.refs.allow_user_create.setToggled(this.state.ignore_acl);
  },

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
        {
          text: 'Cancel',
          ref: 'cancel',
          onTouchTap: this.handleCancel
        },
        {
          text: {submitLabel},
          ref: 'submit',
          onTouchTap: this.handleFormValidation
        }
      ];

    return (
      <Common.Dialog
        ref='dialog'
        title={title + ' an API Key'}
        openImmediately={this.props.openImmediately}
        actions={dialogStandardActions}
        onShow={this.handleDialogShow}
        onDismiss={this.resetDialogState}>
        <div>
          {this.renderFormNotifications()}
          <form
            onSubmit={this.handleFormValidation}
            acceptCharset='UTF-8'
            method='post'>
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
          </form>
        </div>
      </Common.Dialog>
    );
  }
});

