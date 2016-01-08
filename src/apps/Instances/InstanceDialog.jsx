import React from 'react';
import Reflux from 'reflux';

import {DialogsMixin, FormMixin} from '../../mixins';

import Actions from './InstanceDialogActions';
import Store from './InstanceDialogStore';

import MUI from 'syncano-material-ui';
import Common from '../../common';

export default React.createClass({
  displayName: 'InstanceDialog',

  mixins: [
    Reflux.connect(Store),
    Reflux.ListenerMixin,
    DialogsMixin,
    FormMixin
  ],

  validatorConstraints: {
    name: {
      presence: true,
      length: {
        minimum: 5
      }
    }
  },

  componentWillUpdate(nextProps, nextState) {
    if (!this.state._dialogVisible && nextState._dialogVisible && nextState._dialogMode !== 'edit') {
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
    if (this.props.handleSubmit) {
      this.listenTo(Actions.createInstance.completed, this.extendSubmit);
    }
    Actions.createInstance({
      name: this.state.name,
      description: this.state.description,
      metadata: {
        color: Common.Color.getRandomColorName(),
        icon: Common.Icon.Store.getRandomIconPickerIcon()
      }
    });
  },

  extendSubmit() {
    this.props.handleSubmit();
    this.stopListeningTo(Actions.createInstance.completed);
  },

  render() {
    let title = this.hasEditMode() ? 'Update' : 'Create';
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

    return (
      <Common.Dialog
        key='dialog'
        ref="dialog"
        title={`${title} an Instance`}
        defaultOpen={this.props.defaultOpen}
        onRequestClose={this.handleCancel}
        open={this.state.open}
        actions={dialogCustomActions}>
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
        <Common.Loading
          type="linear"
          position="bottom"
          show={this.state.isLoading} />
      </Common.Dialog>
    );
  }
});

