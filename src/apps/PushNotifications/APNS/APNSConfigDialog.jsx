import React from 'react';
import Reflux from 'reflux';

// Utils
import {DialogMixin, FormMixin} from '../../../mixins';

// Stores and Actions
import Store from './APNSConfigDialogStore';

// Components
import {FlatButton} from 'syncano-material-ui';
import {Loading} from 'syncano-components';
import {Dialog} from '../../../common';

export default React.createClass({
  displayName: 'APNSConfigDialog',

  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin
  ],

  render() {
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
        ref='dialog'
        title="Configure Push Notification Socket - APNS"
        actions={dialogStandardActions}
        onRequestClose={this.handleCancel}
        open={this.state.open}>
        APNS
        <Loading
          type='linear'
          position='bottom'
          show={this.state.isLoading} />
      </Dialog>
    );
  }
});
