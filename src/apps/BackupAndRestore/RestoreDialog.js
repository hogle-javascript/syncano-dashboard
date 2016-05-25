import React from 'react';
import Reflux from 'reflux';

import {DialogMixin} from '../../mixins';

import Actions from './RestoreDialogActions';
import Store from './RestoreDialogStore';
import SessionStore from '../Session/SessionStore';

import {FontIcon, Styles} from 'syncano-material-ui';
import {Dialog} from '../../common';

export default React.createClass({
  displayName: 'RestoreDialog',

  mixins: [
    Reflux.connect(Store),
    DialogMixin
  ],

  render() {
    const {isLoading, open, clickedItem} = this.state;
    const instanceName = SessionStore.getInstance() ? SessionStore.getInstance().name : '';
    const backupLabel = clickedItem ? clickedItem.label : '';

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        contentSize="small"
        title={`Restore instance from backup`}
        onRequestClose={this.handleCancel}
        open={open}
        isLoading={isLoading}
        actions={
          <Dialog.StandardButtons
            disabled={isLoading}
            handleCancel={this.handleCancel}
            handleConfirm={() => Actions.restoreFromBackup(clickedItem)}/>
        }>
        <div className="row">
          <FontIcon
            style={{fontSize: 60, color: Styles.Colors.orange400}}
            className="synicon-alert col-sm-7"/>
          <div className="vm-1-t col-sm-28">
            This action will restore instance
            <strong> {instanceName}</strong> from backup <strong>{backupLabel}</strong>.
          </div>
        </div>
      </Dialog.FullPage>
    );
  }
});
