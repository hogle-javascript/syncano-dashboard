import React from 'react';
import Reflux from 'reflux';

import Mixins from '../../mixins';

import Actions from './InstanceDialogActions';
import Store from './InstanceDialogStore';

import MUI from 'syncano-material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'InstanceDialog',

  mixins: [
    Reflux.connect(Store),
    Mixins.Dialog,
    Mixins.Form
  ],

  validatorConstraints: {
    name: {
      presence: true,
      length: {
        minimum: 5
      }
    }
  },

  handleDialogShow() {
    if (!this.hasEditMode()) {
      this.setState({
        name: Store.genUniqueName()
      });
    }
  },

  handleEditSubmit() {
    Actions.updateInstance(
      this.state.name,
      {description: this.state.description}
    );
  },

  handleAddSubmit() {
    Actions.createInstance({
      name: this.state.name,
      description: this.state.description,
      metadata: {
        color: Common.Color.getRandomColorName(),
        icon: Common.Icon.Store.getRandomIconPickerIcon()
      }
    });
  },

  render() {
    let title = this.hasEditMode() ? 'Update an Instance' : 'Create an Instance';
    let dialogCustomActions = [
      <MUI.FlatButton
        key="cancel"
        label="Cancel"
        onTouchTap={this.handleCancel}
        ref="cancel"/>,
      <MUI.FlatButton
        type="submit"
        key="confirm"
        label="Confirm"
        primary={true}
        ref="submit"/>
    ];

    return (
      <form
        onSubmit={this.handleFormValidation}
        acceptCharset="UTF-8"
        method="post">
        <Common.Dialog
          ref="dialog"
          title={title}
          openImmediately={this.props.openImmediately}
          actions={dialogCustomActions}
          onDismiss={this.resetDialogState}
          onShow={this.handleDialogShow}>
          <div>
            {this.renderFormNotifications()}
            <MUI.TextField
              ref="name"
              name="name"
              fullWidth={true}
              disabled={true}
              valueLink={this.linkState('name')}
              errorText={this.getValidationMessages('name').join(' ')}
              hintText="Short name for your Instance"
              floatingLabelText="Name"/>
            <MUI.TextField
              ref="description"
              name="description"
              fullWidth={true}
              valueLink={this.linkState('description')}
              errorText={this.getValidationMessages('description').join(' ')}
              hintText="Multiline description of Instance (optional)"
              floatingLabelText="Description"/>
          </div>
          <Common.Loading
            type="linear"
            position="bottom"
            show={this.state.isLoading} />
        </Common.Dialog>
      </form>
    );
  }
});

