import React from 'react';
import Reflux from 'reflux';

// Utils
import {DialogMixin, FormMixin} from '../../../mixins';

// Stores and Actions
import Store from './GCMConfigDialogStore';

// Components
import {FlatButton} from 'syncano-material-ui';
import {Loading} from 'syncano-components';
import {Dialog} from '../../../common';

export default React.createClass({
  displayName: 'GCMConfigDialog',

  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin
  ],

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
        ref='dialog'
        title={`${title} a Channel Socket`}
        actions={dialogStandardActions}
        onRequestClose={this.handleCancel}
        open={this.state.open}
        contentStyle={{padding: '8px 0 0 0'}}>
        GCM
        <Loading
          type='linear'
          position='bottom'
          show={this.state.isLoading} />
      </Dialog>
    );
  }
});
