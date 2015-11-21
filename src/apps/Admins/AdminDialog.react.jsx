import React from 'react';
import Reflux from 'reflux';

// Utils
import Mixins from '../../mixins';

// Stores and Actions
import AdminsActions from './AdminsActions';
import AdminsInvitationsActions from './AdminsInvitationsActions';
import AdminDialogStore from './AdminDialogStore';

// Components
import MUI from 'syncano-material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'AdminDialog',

  mixins: [
    Reflux.connect(AdminDialogStore),
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
      <MUI.FlatButton
        key="cancel"
        label="Cancel"
        onTouchTap={this.handleCancel}
        ref="cancel"/>,
      <MUI.FlatButton
        type="submit"
        key="confirm"
        label={submitLabel}
        primary={true}
        ref="submit"/>
    ];

    return (
      <form
        onSubmit={this.handleFormValidation}
        acceptCharset='UTF-8'
        method='post'>
        <Common.Dialog
          ref='dialog'
          title={title + ' an Administrator'}
          defaultOpen={this.props.defaultOpen}
          onRequestClose={this.handleCancel}
          actions={dialogStandardActions}>
          <div>
            {this.renderFormNotifications()}
            <MUI.TextField
              ref='email'
              name='email'
              fullWidth={true}
              disabled={this.hasEditMode()}
              valueLink={this.linkState('email')}
              errorText={this.getValidationMessages('email').join(' ')}
              hintText='Email of the administrator'
              floatingLabelText='Email'/>
            <MUI.SelectField
              className="invite-admin-dropdown"
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
          </div>
        </Common.Dialog>
      </form>
    );
  }
});

