import React from 'react';
import Reflux from 'reflux';

// Utils
import Mixins from '../../mixins';

// Stores and Actions
import GroupsActions from './GroupsActions';
import GroupDialogStore from './GroupDialogStore';
import GroupsStore from './GroupsStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'GroupDialog',

  mixins: [
    Reflux.connect(GroupDialogStore),
    React.addons.LinkedStateMixin,
    Mixins.Dialog,
    Mixins.Form
  ],

  validatorConstraints: {
    label: {
      presence: true
    }
  },

  handleAddSubmit() {
    GroupsActions.createGroup(this.state.label);
  },

  handleEditSubmit() {
    GroupsActions.updateGroup(this.state.id, {
      label: this.state.label
    });
  },

  render() {
    let title = this.hasEditMode() ? 'Edit' : 'Add';
    let submitLabel = this.hasEditMode() ? 'Confirm' : 'Confirm';
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
        ref="dialog"
        title={title + " a Group"}
        openImmediately={this.props.openImmediately}
        actions={dialogStandardActions}
        onDismiss={this.resetDialogState}>
        <div>
          {this.renderFormNotifications()}
          <form
            onSubmit={this.handleFormValidation}
            acceptCharset="UTF-8"
            method="post">
            <MUI.TextField
              ref="label"
              label="label"
              fullWidth={true}
              valueLink={this.linkState('label')}
              errorText={this.getValidationMessages('label').join(' ')}
              hintText="Name of the group"
              floatingLabelText="Group Name"/>
          </form>
          <Common.Loading
            type="linear"
            position="bottom"
            show={this.state.isLoading}/>
        </div>
      </Common.Dialog>
    );
  }
});

