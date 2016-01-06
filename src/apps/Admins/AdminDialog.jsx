import React from 'react';
import Reflux from 'reflux';

// Utils
import Mixins from '../../mixins';

// Stores and Actions
import AdminsActions from './AdminsActions';
import AdminsInvitationsActions from './AdminsInvitationsActions';
import Store from './AdminDialogStore';

// Components
import {TextField, FlatButton} from 'syncano-material-ui';
import {Dialog, SelectFieldWrapper} from '../../common';

export default React.createClass({
  displayName: 'AdminDialog',

  mixins: [
    Reflux.connect(Store),
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
        key='dialog'
        ref='dialog'
        title={`${title} an Administrator`}
        defaultOpen={this.props.defaultOpen}
        onRequestClose={this.handleCancel}
        open={this.state.open}
        actions={dialogStandardActions}>
        {this.renderFormNotifications()}
        <TextField
          ref='email'
          name='email'
          fullWidth={true}
          disabled={this.hasEditMode()}
          valueLink={this.linkState('email')}
          errorText={this.getValidationMessages('email').join(' ')}
          hintText='Email of the administrator'
          floatingLabelText='Email'/>
        <SelectFieldWrapper
          name="role"
          floatingLabelText="Role of the administrator"
          options={Store.getRoles()}
          value={this.state.role}
          onChange={this.setSelectFieldValue.bind(null, 'role')}
          errorText={this.getValidationMessages('role').join(' ')}/>
      </Dialog>
    );
  }
});

