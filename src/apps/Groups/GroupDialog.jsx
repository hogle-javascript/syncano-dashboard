import React from 'react';
import Reflux from 'reflux';

// Utils
import {DialogMixin, FormMixin} from '../../mixins';

// Stores and Actions
import Actions from './GroupsActions';
import Store from './GroupDialogStore';

// Components
import {TextField, FlatButton} from 'syncano-material-ui';
import {Loading} from 'syncano-components';
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
    Actions.updateGroup(this.state.id, {
      label: this.state.label
    });
  },

  render() {
    let title = this.hasEditMode() ? 'Edit' : 'Create';
    let dialogStandardActions = [
      <FlatButton
        key="cancel"
        label="Cancel"
        onTouchTap={this.handleCancel}
        ref="cancel"/>,
      <FlatButton
        key="confirm"
        label="Confirm"
        primary={true}
        onTouchTap={this.handleFormValidation}
        ref="submit"/>
    ];

    return (
      <Dialog
        key='dialog'
        ref="dialog"
        title={`${title} a Group`}
        defaultOpen={this.props.defaultOpen}
        onRequestClose={this.handleCancel}
        open={this.state.open}
        actions={dialogStandardActions}>
        {this.renderFormNotifications()}
        <TextField
          ref="label"
          label="label"
          fullWidth={true}
          valueLink={this.linkState('label')}
          errorText={this.getValidationMessages('label').join(' ')}
          hintText="Name of the group"
          floatingLabelText="Group Name"/>
        <Loading
          type="linear"
          position="bottom"
          show={this.state.isLoading}/>
      </Dialog>
    );
  }
});

