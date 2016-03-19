import React from 'react';
import Reflux from 'reflux';

// Utils
import {DialogMixin, FormMixin} from '../../mixins';

// Stores and Actions
import AdminsActions from './AdminsActions';
import AdminsInvitationsActions from './AdminsInvitationsActions';
import Store from './AdminDialogStore';

// Components
import {TextField} from 'syncano-material-ui';
import {SelectFieldWrapper} from 'syncano-components';
import {Dialog} from '../../common';

export default React.createClass({
  displayName: 'AdminDialog',

  mixins: [
    Reflux.connect(Store),
    DialogMixin,
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
    const {email, role} = this.state;

    AdminsInvitationsActions.createInvitation({email, role});
  },

  handleEditSubmit() {
    const {id, role} = this.state;

    AdminsActions.updateAdmin(id, {role});
  },

  render() {
    const title = this.hasEditMode() ? 'Edit' : 'Invite';

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={`${title} an Administrator`}
        onRequestClose={this.handleCancel}
        open={this.state.open}
        contentSize="small"
        isLoading={this.state.isLoading}
        actions={
          <Dialog.StandardButtons
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}/>
        }>
        {this.renderFormNotifications()}
        <TextField
          ref="email"
          name="email"
          fullWidth={true}
          disabled={this.hasEditMode()}
          valueLink={this.linkState('email')}
          errorText={this.getValidationMessages('email').join(' ')}
          hintText="Administrator's email"
          floatingLabelText="Email"/>
        <SelectFieldWrapper
          style={{width: 200}}
          name="role"
          floatingLabelText="Administrator's role"
          options={Store.getRoles()}
          value={this.state.role}
          onChange={this.setSelectFieldValue.bind(null, 'role')}
          errorText={this.getValidationMessages('role').join(' ')}/>
      </Dialog.FullPage>
    );
  }
});
