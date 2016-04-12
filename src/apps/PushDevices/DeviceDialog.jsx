import React from 'react';
import _ from 'lodash';
import Reflux from 'reflux';

// Utils
import {DialogMixin, FormMixin} from '../../mixins';

// Components
import {TextField, Toggle} from 'syncano-material-ui';
import {Dialog} from '../../common';

export default (type, Store, Actions) => {
  return React.createClass({
    displayName: `${type}DeviceDialog`,

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
      },
      device_id: {
        presence: true
      }
    },

    getParams() {
      const {label, registration_id, user_id, device_id, is_active} = this.state;

      return {
        user_id: user_id === '' ? null : user_id,
        label,
        registration_id,
        device_id,
        is_active
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
      const {open, isLoading, is_active} = this.state;
      const title = this.hasEditMode() ? 'Edit' : 'Add';

      return (
        <Dialog.FullPage
          key="dialog"
          ref="dialog"
          title={`${title} a ${type} Device`}
          onRequestClose={this.handleCancel}
          open={open}
          isLoading={isLoading}
          actions={
            <Dialog.StandardButtons
              handleCancel={this.handleCancel}
              handleConfirm={this.handleFormValidation}/>
          }>
          <div>
            {this.renderFormNotifications()}
            <TextField
              ref="label"
              name="label"
              autoFocus={true}
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

            <div
              style={{width: 180}}
              className="vm-4-t">
              <Toggle
                ref="is_active"
                key="is_active"
                defaultToggled={is_active}
                onToggle={this.handleToggle}
                label="Active"/>
            </div>
          </div>
        </Dialog.FullPage>
      );
    }
  });
};
