import React from 'react';
import Reflux from 'reflux';

// Utils
import Mixins from '../../mixins';

// Stores and Actions
import Actions from './GroupsActions';
import Store from './GroupDialogStore';

// Components
import MUI from 'syncano-material-ui';
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
    let title = this.hasEditMode() ? 'Edit' : 'Create';
    let dialogStandardActions = [
      <MUI.FlatButton
        key="cancel"
        label="Cancel"
        onTouchTap={this.handleCancel}
        ref="cancel"/>,
      <MUI.FlatButton
        key="confirm"
        label="Confirm"
        primary={true}
        onTouchTap={this.handleFormValidation}
        ref="submit"/>
    ];

    return (
      <Common.Dialog
        key='dialog'
        ref="dialog"
        title={`${title} a Group`}
        defaultOpen={this.props.defaultOpen}
        onRequestClose={this.handleCancel}
        actions={dialogStandardActions}>
        {this.renderFormNotifications()}
        <MUI.TextField
          ref="label"
          label="label"
          fullWidth={true}
          valueLink={this.linkState('label')}
          errorText={this.getValidationMessages('label').join(' ')}
          hintText="Name of the group"
          floatingLabelText="Group Name"/>
        <Common.Loading
          type="linear"
          position="bottom"
          show={this.state.isLoading}/>
      </Common.Dialog>
    );
  }
});

