import React from 'react';
import Reflux from 'reflux';

// Utils
import Mixins from '../../mixins';

// Stores and Actions
import Actions from './GroupsActions';
import Store from './GroupDialogStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'GroupDialog',

  mixins: [
    Reflux.connect(Store),
    Mixins.Dialog,
    Mixins.Form
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
    Actions.updateGroup(this.state.id, {
      label: this.state.label
    });
  },

  render() {
    let title = this.hasEditMode() ? 'Edit' : 'Add';
    let dialogStandardActions = [
      <MUI.FlatButton
        key="cancel"
        label="Cancel"
        onTouchTap={this.handleCancel}
        ref="cancel"/>,
      <MUI.FlatButton
        type="submit"
        key="confirm"
        label="Confirm"
        primary={true}
        onTouchTap={this.handleFormValidation}
        ref="submit"/>
    ];

    return (
      <Common.Dialog
        ref="dialog"
        title={`${title} a Group`}
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

