import React from 'react';
import Reflux from 'reflux';

import {DialogMixin, FormMixin} from '../../../mixins';

import Actions from './FullBackupsActions';
import Store from './FullBackupsDialogStore';

import {TextField} from 'syncano-material-ui';
import {Dialog} from '../../../common';

export default React.createClass({
  displayName: 'CreateFullBackupDialog',

  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints: {
    label: {
      presence: true,
      length: {
        minimum: 5,
        maximum: 64
      }
    },
    description: {
      length: {
        maximum: 256
      }
    }
  },

  handleAddSubmit() {
    const {label, description} = this.state;

    Actions.createFullBackup({label, description});
  },

  render() {
    const {isLoading, open} = this.state;

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        contentSize="medium"
        title="Create Instance Full Backup"
        onRequestClose={this.handleCancel}
        open={open}
        isLoading={isLoading}
        actions={
          <Dialog.StandardButtons
            disabled={isLoading}
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}/>
        }>
        <div>
          <TextField
            autoFocus={true}
            fullWidth={true}
            valueLink={this.linkState('label')}
            errorText={this.getValidationMessages('label').join(' ')}
            hintText="Backup's label"
            floatingLabelText="Label" />
          <TextField
            fullWidth={true}
            valueLink={this.linkState('description')}
            errorText={this.getValidationMessages('description').join(' ')}
            hintText="Backup's description"
            floatingLabelText="Description" />
        </div>
        <div className="vm-2-t">
          {this.renderFormNotifications()}
        </div>
      </Dialog.FullPage>
    );
  }
});
