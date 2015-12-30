import React from 'react';
import Reflux from 'reflux';

// Utils
import {Dialog, Form} from '../../mixins';

// Stores and Actions
import Actions from './DevicesActions';
import DeviceDialogStore from './DeviceDialogStore';

// Components
import MUI from 'syncano-material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'DeviceDialog',

  mixins: [
    Reflux.connect(DeviceDialogStore),
    Dialog,
    Form
  ],

  validatorConstraints: {
    label: {
      presence: true
    },
    registration_id: {
      presence: true
    }
  },

  getStyles() {
    return {
      toggle: {
        marginTop: 30
      }
    };
  },

  getParams() {
    return {
      label: this.state.label,
      registration_id: this.state.registration_id,
      user_id: this.state.user_id,
      device_id: this.state.device_id,
      is_active: this.state.is_active
    };
  },

  handleToggle(event, status) {
    this.setState({
      is_active: status
    });
  },

  handleAddSubmit() {
    if (this.props.isAPNs) {
      Actions.createAPNsDevice(this.getParams());
    } else {
      Actions.createGCMDevice(this.getParams());
    }
  },

  handleEditSubmit() {
    if (this.props.isAPNs) {
      Actions.updateAPNsDevice(this.getParams());
    } else {
      Actions.updateGCMDevice(this.getParams());
    }
  },

  render() {
    let styles = this.getStyles();
    let title = this.hasEditMode() ? 'Edit' : 'Create';
    let dialogStandardActions = [
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
        ref='dialog'
        title={`${title} a Device`}
        onRequestClose={this.handleCancel}
        open={this.state.open}
        actions={dialogStandardActions}>
        <div>
          {this.renderFormNotifications()}
          <MUI.TextField
            ref='label'
            name='label'
            valueLink={this.linkState('label')}
            fullWidth={true}
            errorText={this.getValidationMessages('label').join(' ')}
            floatingLabelText='Label of the Device'/>
          <MUI.TextField
            ref='registration_id'
            name='registration_id'
            disabled={this.hasEditMode()}
            valueLink={this.linkState('registration_id')}
            fullWidth={true}
            errorText={this.getValidationMessages('registration_id').join(' ')}
            floatingLabelText="Device's registration ID"/>
          <MUI.TextField
            ref='user_id'
            name='user_id'
            valueLink={this.linkState('user_id')}
            fullWidth={true}
            errorText={this.getValidationMessages('user_id').join(' ')}
            floatingLabelText='User ID'/>
          <MUI.TextField
            ref='device_id'
            name='device_id'
            valueLink={this.linkState('device_id')}
            fullWidth={true}
            errorText={this.getValidationMessages('device_id').join(' ')}
            floatingLabelText='Device ID'/>

          <div style={styles.toggle}>
            <MUI.Toggle
              ref="is_active"
              key="is_active"
              defaultToggled={this.state.is_active}
              onToggle={this.handleToggle}
              label="Active"/>
          </div>
        </div>
        <Common.Loading
          type='linear'
          position='bottom'
          show={this.state.isLoading} />
      </Common.Dialog>
    );
  }
});

