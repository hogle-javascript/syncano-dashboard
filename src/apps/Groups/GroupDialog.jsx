import React from 'react';
import Reflux from 'reflux';

// Utils
import {DialogMixin, FormMixin} from '../../mixins';

// Stores and Actions
import Actions from './GroupsActions';
import Store from './GroupDialogStore';

// Components
import {TextField} from 'syncano-material-ui';
import {Dialog} from '../../common';

export default React.createClass({
  displayName: 'GroupDialog',

  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints: {
    label: {
      presence: true
    }
  },

  handleAddSubmit() {
    Actions.createGroup(this.state.label);
  },

  handleEditSubmit() {
    const {id, label} = this.state;

    Actions.updateGroup(id, {label});
  },

  render() {
    const title = this.hasEditMode() ? 'Edit' : 'Add';
    const {isLoading, open} = this.state;

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        contentSize="small"
        title={`${title} a Group`}
        onRequestClose={this.handleCancel}
        open={open}
        isLoading={isLoading}
        actions={
          <Dialog.StandardButtons
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}/>
        }
        sidebar={
          <Dialog.SidebarBox>
            <Dialog.SidebarSection>
              Groups are a way of categorizing users. They can be used to construct
              different levels of access to resources stored on the platform.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection last={true}>
              <Dialog.SidebarLink to="http://docs.syncano.io/docs/groups">
                Learn more
              </Dialog.SidebarLink>
            </Dialog.SidebarSection>
          </Dialog.SidebarBox>
        }>
        {this.renderFormNotifications()}
        <TextField
          ref="label"
          label="label"
          autoFocus={true}
          fullWidth={true}
          valueLink={this.linkState('label')}
          errorText={this.getValidationMessages('label').join(' ')}
          hintText="Group's name"
          floatingLabelText="Name"/>
      </Dialog.FullPage>
    );
  }
});
