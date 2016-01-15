import React from 'react';
import Reflux from 'reflux';

import {DialogMixin, FormMixin} from '../../mixins';

import Actions from './RenameDialogActions';
import Store from './RenameDialogStore';

import {TextField, FlatButton} from 'syncano-material-ui';
import {Loading} from 'syncano-components';
import {Dialog} from '../../common';

export default React.createClass({
  displayName: 'RenameDialog',

  mixins: [
    Reflux.connect(Store),
    Reflux.ListenerMixin,
    DialogMixin,
    FormMixin
  ],

  validatorConstraints: {
    new_name: {
      presence: true,
      length: {
        minimum: 5
      }
    }
  },

  handleEditSubmit() {
    Actions.renameInstance(
      this.state.name,
      {new_name: this.state.new_name}
    );
  },


  render() {
    let dialogCustomActions = [
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
        key="dialog"
        ref="dialog"
        title="Rename an Instance"
        defaultOpen={this.props.defaultOpen}
        onRequestClose={this.handleCancel}
        open={this.state.open}
        actions={dialogCustomActions}>
        {this.renderFormNotifications()}
        Renaming this Instance can cause problems with your applications that are connected to it.
        <TextField
          ref="name"
          name="name"
          fullWidth={true}
          valueLink={this.linkState('new_name')}
          errorText={this.getValidationMessages('new_name').join(' ')}
          hintText="Short name for your Instance"
          floatingLabelText="Name"/>
        <Loading
          type="linear"
          position="bottom"
          show={this.state.isLoading} />
      </Dialog>
    );
  }
});

