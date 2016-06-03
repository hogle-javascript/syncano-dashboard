import React from 'react';
import Reflux from 'reflux';

import {DialogMixin, FormMixin} from '../../mixins';

import Actions from './RestoreDialogActions';
import Store from './RestoreDialogStore';

import {FontIcon, TextField} from 'material-ui';
import {colors as Colors} from 'material-ui/styles';
import {Dialog} from '../../common';

export default React.createClass({
  displayName: 'RestoreDialog',

  contextTypes: {
    params: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints() {
    return {
      instanceNameValidation: {
        presence: {
          message: '^Type current Instance name to continue'
        },
        inclusion: {
          within: [this.context.params.instanceName],
          message: '^Incorrect Instance name'
        }
      }
    };
  },

  handleAddSubmit() {
    const {clickedItem} = this.state;

    Actions.restoreFromBackup(clickedItem);
  },

  render() {
    const {isLoading, open, clickedItem, instanceNameValidation} = this.state;
    const instanceName = this.context.params.instanceName;
    const backupLabel = clickedItem ? clickedItem.label : '';

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        contentSize="small"
        title={`Restore Instance from backup`}
        onRequestClose={this.handleCancel}
        open={open}
        isLoading={isLoading}
        actions={
          <Dialog.StandardButtons
            disabled={isLoading}
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}/>
        }>
        <div
          style={{lineHeight: '1.4'}}
          className="row align-middle">
          <FontIcon
            style={{fontSize: 60, color: Colors.orange400}}
            className="synicon-alert col-sm-7"/>
          <div className="vm-1-t col-sm-28">
            <div className="vm-1-b">
              <strong>This action cannot be undone or stopped.</strong>
            </div>
            <div className="vm-1-b">
              This will restore Instance
              <strong> {instanceName}</strong> from backup <strong>{backupLabel}</strong>.
            </div>
            <div>
              All current application data for <strong>{instanceName}</strong> will be lost.
            </div>
            <div className="vm-4-t">
              To confirm restoring type your Instance name.
            </div>
            <TextField
              value={instanceNameValidation}
              onChange={(event, value) => this.setState({instanceNameValidation: value})}
              errorText={this.getValidationMessages('instanceNameValidation').join(' ')}
              fullWidth={true}
              floatingLabelText="Instance name"
              hintText="Instance name" />
          </div>
        </div>
      </Dialog.FullPage>
    );
  }
});
