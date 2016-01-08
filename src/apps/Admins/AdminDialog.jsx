import React from 'react';
import Reflux from 'reflux';

// Utils
import {DialogsMixin, FormMixin} from '../../mixins';

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
    DialogsMixin,
    FormMixin
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
        title={`${title} an Administrator`}
        defaultOpen={this.props.defaultOpen}
        onRequestClose={this.handleCancel}
        open={this.state.open}
        actions={dialogStandardActions}>
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
      </Common.Dialog>
    );
  }
});

