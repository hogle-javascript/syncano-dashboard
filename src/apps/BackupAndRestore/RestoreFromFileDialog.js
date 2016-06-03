import React from 'react';
import Reflux from 'reflux';

import {DialogMixin, FormMixin} from '../../mixins';

import Actions from './RestoreFromFileDialogActions';
import Store from './RestoreFromFileDialogStore';

import {FontIcon, TextField} from 'material-ui';
import {colors as Colors} from 'material-ui/styles';
import DropZone from 'react-dropzone';
import {Dialog, Show} from '../../common';

export default React.createClass({
  displayName: 'RestoreFromFileDialog',

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

  getStyles() {
    return {
      dropZone: {
        height: 140,
        width: '100%',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#AAA',
        color: '#AAA',
        backgroundColor: '#EEE'
      },
      dropZoneContainer: {
        lineHeight: '1.4',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      },
      dropZoneDescription: {
        padding: 15,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        minHeight: '100%'
      },
      uploadIcon: {
        fontSize: 56,
        color: '#AAA'
      }
    };
  },

  handleAddSubmit() {
    const {backupFile} = this.state;

    Actions.restoreFromFile(backupFile);
  },

  handleDropBackupFile(file) {
    this.setState({
      backupFile: file[0]
    });
  },

  render() {
    const styles = this.getStyles();
    const {isLoading, open, backupFile, instanceNameValidation} = this.state;
    const instanceName = this.context.params.instanceName;
    const backupLabel = backupFile ? backupFile.name : null;

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        contentSize="medium"
        title={`Restore Instance from file`}
        onRequestClose={this.handleCancel}
        open={open}
        isLoading={isLoading}
        actions={
          <Dialog.StandardButtons
            disabled={isLoading}
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}/>
        }>
        <div style={styles.dropZoneContainer}>
          <div className="row align-top vm-4-b">
            <div className="hp-2-r vm-1-t">
              <FontIcon
                style={{fontSize: 60, color: Colors.orange400}}
                className="synicon-alert col-sm-7"/>
            </div>
            <div>
              <div className="vm-1-b">
                <strong>This action cannot be undone or stopped.</strong>
              </div>
              <div className="vm-1-b">
                This will restore Instance
                <strong> {instanceName}</strong> to previous state.
              </div>
              <div>
                All current application data for <strong>{instanceName}</strong> will be lost.
              </div>
              <div className="vm-3-t">
                <DropZone
                  onDrop={this.handleDropBackupFile}
                  style={styles.dropZone}>
                  <div style={styles.dropZoneDescription}>
                    <FontIcon
                      style={styles.uploadIcon}
                      className={backupFile ? 'synicon-file' : 'synicon-cloud-upload'} />
                    <div>
                      {backupLabel || 'Click or Drag & Drop to upload partial backup file'}
                    </div>
                  </div>
                </DropZone>
              </div>
              <Show if={this.state.backupFile}>
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
              </Show>
            </div>
          </div>
          <div className="vm-2-t">
            {this.renderFormNotifications()}
          </div>
        </div>
      </Dialog.FullPage>
    );
  }
});
