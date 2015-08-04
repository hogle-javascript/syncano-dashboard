import React from 'react';
import Reflux from 'reflux';

// Utils
import Mixins from '../../mixins';

// Stores and Actions
import AdminsActions from './AdminsActions';
import AdminsInvitationsActions from './AdminsInvitationsActions';
import AdminDialogStore from './AdminDialogStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'AdminDialog',

  mixins: [
    Reflux.connect(AdminDialogStore),
    React.addons.LinkedStateMixin,
    Mixins.Dialog,
    Mixins.Form
  ],

  validatorConstraints: {
    email: {
      presence: true,
      email: {
        message: '^Invalid email address'
      }
    },
    role: {
      presence: true
    }
  },

  handleAddSubmit() {
    AdminsInvitationsActions.createInvitation({
      email: this.state.email,
      role: this.state.role
    });
  },

  handleEditSubmit() {
    AdminsActions.updateAdmin(this.state.id, {
      role: this.state.role
    });
  },

  render() {
    let title = this.hasEditMode() ? 'Edit' : 'Invite';
    let submitLabel = this.hasEditMode() ? 'Save changes' : 'Confirm';
    let dialogStandardActions = [
        {
          ref: 'cancel',
          text: 'Cancel',
          onTouchTap: this.handleCancel
        },
        {
          ref: 'submit',
          text: {submitLabel},
          onTouchTap: this.handleFormValidation
        }
      ];

    return (
      <Common.Dialog
        ref='dialog'
        title={title + ' an Administrator'}
        openImmediately={this.props.openImmediately}
        actions={dialogStandardActions}
        onDismiss={this.resetDialogState}>
        <div>
          {this.renderFormNotifications()}
          <form
            onSubmit={this.handleFormValidation}
            acceptCharset='UTF-8'
            method='post'>
            <MUI.TextField
              ref='email'
              name='email'
              fullWidth={true}
              disabled={this.hasEditMode() ? true : false}
              valueLink={this.linkState('email')}
              errorText={this.getValidationMessages('email').join(' ')}
              hintText='Email of the administrator'
              floatingLabelText='Email'/>

            <MUI.SelectField
              ref='role'
              name='role'
              autoWidth={true}
              valueLink={this.linkState('role')}
              valueMember='payload'
              displayMember='text'
              floatingLabelText='Role of the administrator'
              style={{width: '50%'}}
              errorText={this.getValidationMessages('role').join(' ')}
              menuItems={AdminDialogStore.getRoles()}/>
          </form>
        </div>
      </Common.Dialog>
    );
  }
});

