import React from 'react';
import _ from 'lodash';
import Reflux from 'reflux';

// Utils
import {DialogMixin, FormMixin} from '../../mixins';

// Components
import {FlatButton, TextField, Toggle} from 'syncano-material-ui';
import {Dialog, Loading} from '../../common';

export default function(displayName, Store, Actions) {
  return React.createClass({

    displayName,

    mixins: [
      Reflux.connect(Store),
      DialogMixin,
      FormMixin
    ],

    validatorConstraints: {
      label: {
        presence: true
      },
      registration_id: {
        presence: true
      }
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
      if (_.isFunction(Actions.createDevice)) {
        Actions.createDevice(this.getParams());
      }
    },

    handleEditSubmit() {
      if (_.isFunction(Actions.updateDevice)) {
        Actions.updateDevice(this.getParams());
      }
    },

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
          key="dialog"
          ref="dialog"
          title={`${title} a Device`}
          onRequestClose={this.handleCancel}
          open={this.state.open}
          actions={dialogStandardActions}>
          <div>
            {this.renderFormNotifications()}
            <TextField
              ref="label"
              name="label"
              valueLink={this.linkState('label')}
              fullWidth={true}
              errorText={this.getValidationMessages('label').join(' ')}
              floatingLabelText="Label of the Device"/>
            <TextField
              ref="registration_id"
              name="registration_id"
              disabled={this.hasEditMode()}
              valueLink={this.linkState('registration_id')}
              fullWidth={true}
              errorText={this.getValidationMessages('registration_id').join(' ')}
              floatingLabelText="Device's registration ID"/>
            <TextField
              ref="user_id"
              name="user_id"
              valueLink={this.linkState('user_id')}
              fullWidth={true}
              errorText={this.getValidationMessages('user_id').join(' ')}
              floatingLabelText="User ID"/>
            <TextField
              ref="device_id"
              name="device_id"
              valueLink={this.linkState('device_id')}
              fullWidth={true}
              errorText={this.getValidationMessages('device_id').join(' ')}
              floatingLabelText="Device ID"/>

            <div className="vm-4-t">
              <Toggle
                ref="is_active"
                key="is_active"
                defaultToggled={this.state.is_active}
                onToggle={this.handleToggle}
                label="Active"/>
            </div>
          </div>
          <Loading
            type="linear"
            position="bottom"
            show={this.state.isLoading} />
        </Dialog>
      );
    }
  });
}
