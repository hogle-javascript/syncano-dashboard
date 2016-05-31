import React from 'react';
import Reflux from 'reflux';

import {DialogMixin, FormMixin} from '../../mixins';

import Actions from './RestoreFromFileDialogActions';
import Store from './RestoreFromFileDialogStore';
import SessionStore from '../Session/SessionStore';

import {FontIcon} from 'material-ui';
import DropZone from 'react-dropzone';
import {Dialog} from '../../common';

export default React.createClass({
  displayName: 'RestoreFromFileDialog',

  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin
  ],

  getStyles() {
    return {
      dropZone: {
        height: 140,
        width: '60%',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#AAA',
        color: '#AAA',
        backgroundColor: '#EEE'
      },
      dropZoneContainer: {
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

  handleDropBackupFile(file) {
    this.setState({
      backupFile: file[0]
    });
  },

  render() {
    const styles = this.getStyles();
    const {isLoading, open, backupFile} = this.state;
    const instanceName = SessionStore.getInstance() ? SessionStore.getInstance().name : '';
    const backupLabel = backupFile ? backupFile.name : null;

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        contentSize="medium"
        title={`Restore instance from file`}
        onRequestClose={this.handleCancel}
        open={open}
        isLoading={isLoading}
        actions={
          <Dialog.StandardButtons
            disabled={isLoading}
            handleCancel={this.handleCancel}
            handleConfirm={() => Actions.restoreFromFile(backupFile)}/>
        }>
        <div style={styles.dropZoneContainer}>
          <div className="vm-3-b">
            This action will restore instance
            <strong> {instanceName}</strong> to previous state.
          </div>
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
          <div className="vm-2-t">
            {this.renderFormNotifications()}
          </div>
        </div>
      </Dialog.FullPage>
    );
  }
});
