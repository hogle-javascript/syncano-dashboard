import React from 'react';
import Reflux from 'reflux';

import { DialogMixin, FormMixin } from '../../../mixins';

import Actions from './FullBackupsActions';
import Store from './FullBackupsDialogStore';

import { TextField } from 'material-ui';
import { Dialog } from '../../../common';

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
    const { label, description } = this.state;

    Actions.createFullBackup({ label, description });
  },

  handleChange(value, key) {
    this.setState({
      [key]: value
    });
  },

  render() {
    const { isLoading, open, label, description } = this.state;

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        contentSize="small"
        title="Create Instance Full Backup"
        onRequestClose={this.handleCancel}
        open={open}
        isLoading={isLoading}
        actions={
          <Dialog.StandardButtons
            disabled={isLoading}
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}
          />
        }
        sidebar={
          <Dialog.SidebarBox>
            <Dialog.SidebarSection>
              Full backups work like snapshots. They allow you to save the current
              state of your Instance and files into a backup object.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection last>
              <Dialog.SidebarLink to="http://docs.syncano.io/v1.1/docs/full-backups">
                Learn more
              </Dialog.SidebarLink>
            </Dialog.SidebarSection>
          </Dialog.SidebarBox>
        }
      >
        <div>
          <TextField
            autoFocus
            fullWidth
            value={label}
            onChange={(event, value) => this.handleChange(value, 'label')}
            errorText={this.getValidationMessages('label').join(' ')}
            hintText="Backup's label"
            floatingLabelText="Label"
          />
          <TextField
            fullWidth
            value={description}
            onChange={(event, value) => this.handleChange(value, 'description')}
            errorText={this.getValidationMessages('description').join(' ')}
            hintText="Backup's description"
            floatingLabelText="Description"
          />
        </div>
        <div className="vm-2-t">
          {this.renderFormNotifications()}
        </div>
      </Dialog.FullPage>
    );
  }
});
