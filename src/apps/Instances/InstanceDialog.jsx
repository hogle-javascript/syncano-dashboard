import React from 'react';
import Reflux from 'reflux';

import {DialogMixin, FormMixin} from '../../mixins';

import Actions from './InstanceDialogActions';
import Store from './InstanceDialogStore';

import {FlatButton, TextField} from 'syncano-material-ui';
import {Color} from 'syncano-components';
import {Dialog, Loading, Icon} from '../../common';

export default React.createClass({
  displayName: 'InstanceDialog',

  mixins: [
    Reflux.connect(Store),
    Reflux.ListenerMixin,
    DialogMixin,
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
        color: Color.getRandomColorName(),
        icon: Icon.Store.getRandomIconPickerIcon()
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
        title={`${title} an Instance`}
        defaultOpen={this.props.defaultOpen}
        onRequestClose={this.handleCancel}
        open={this.state.open}
        actions={dialogCustomActions}>
        {this.renderFormNotifications()}
        <TextField
          ref="name"
          name="name"
          fullWidth={true}
          disabled={true}
          valueLink={this.linkState('name')}
          errorText={this.getValidationMessages('name').join(' ')}
          hintText="Short name for your Instance"
          floatingLabelText="Name"/>
        <TextField
          ref="description"
          name="description"
          fullWidth={true}
          valueLink={this.linkState('description')}
          errorText={this.getValidationMessages('description').join(' ')}
          hintText="Multiline description of Instance (optional)"
          floatingLabelText="Description"/>
        <Loading
          type="linear"
          position="bottom"
          show={this.state.isLoading} />
      </Dialog>
    );
  }
});

