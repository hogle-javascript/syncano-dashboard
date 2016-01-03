import React from 'react';
import Reflux from 'reflux';

import Mixins from '../../mixins';

import Actions from './RenameDialogActions';
import Store from './RenameDialogStore';

import MUI from 'syncano-material-ui';
import Common from '../../common';

export default React.createClass({
  displayName: 'RenameDialog',

  mixins: [
    Reflux.connect(Store),
    Reflux.ListenerMixin,
    Mixins.Dialog,
    Mixins.Form
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
      <MUI.FlatButton
        key="cancel"
        label="Cancel"
        onTouchTap={this.handleCancel}
        ref="cancel"/>,
      <MUI.FlatButton
        key="confirm"
        label="Confirm"
        primary={true}
        onTouchTap={this.handleFormValidation}
        ref="submit"/>
    ];

    console.error(this.state);

    return (
      <Common.Dialog
        key="dialog"
        ref="dialog"
        title="Rename an Instance"
        defaultOpen={this.props.defaultOpen}
        onRequestClose={this.handleCancel}
        open={this.state.open}
        actions={dialogCustomActions}>
        {this.renderFormNotifications()}
        Renaming this Instance can cause problems with your applications that are connected to it.
        <MUI.TextField
          ref="name"
          name="name"
          fullWidth={true}
          valueLink={this.linkState('new_name')}
          errorText={this.getValidationMessages('new_name').join(' ')}
          hintText="Short name for your Instance"
          floatingLabelText="Name"/>
        <Common.Loading
          type="linear"
          position="bottom"
          show={this.state.isLoading} />
      </Common.Dialog>
    );
  }
});

