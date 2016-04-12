import React from 'react';
import _ from 'lodash';
import Reflux from 'reflux';

// Utils
import {DialogMixin, FormMixin} from '../../mixins';

// Components
import {TextField, Toggle} from 'syncano-material-ui';
import {Dialog, Editor} from '../../common';

export default (type, Store, Actions) => {
  return React.createClass({
    displayName: `${type}Dialog`,

    mixins: [
      Reflux.connect(Store),
      DialogMixin,
      FormMixin
    ],

    validatorConstraints() {
      return {
        label: {
          presence: true
        },
        registration_id: {
          presence: true
        }
      };
    },

    getParams() {
      const {label, registration_id, user_id, device_id, is_active, metadata} = this.state;

      return {
        label,
        registration_id,
        user_id,
        device_id,
        is_active,
        metadata
      };
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
      const {open, isLoading, is_active, metadata} = this.state;
      const title = this.hasEditMode() ? 'Edit' : 'Add';

      console.error(metadata);

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
            <Dialog.ContentSection>
              <div className="col-flex-1">
                <div
                  style={{width: 100}}>
                  <Toggle
                    ref="is_active"
                    key="is_active"
                    defaultToggled={is_active}
                    onToggle={(event, value) => this.setState({is_active: value})}
                    label="Active"/>
                </div>
              </div>
            </Dialog.ContentSection>
            <TextField
              ref="label"
              name="label"
              autoFocus={true}
              valueLink={this.linkState('label')}
              fullWidth={true}
              errorText={this.getValidationMessages('label').join(' ')}
              floatingLabelText="Label of the Device" />
            <TextField
              ref="registration_id"
              name="registration_id"
              disabled={this.hasEditMode()}
              valueLink={this.linkState('registration_id')}
              fullWidth={true}
              errorText={this.getValidationMessages('registration_id').join(' ')}
              floatingLabelText="Device's registration ID" />
            <TextField
              ref="user_id"
              name="user_id"
              valueLink={this.linkState('user_id')}
              fullWidth={true}
              errorText={this.getValidationMessages('user_id').join(' ')}
              floatingLabelText="User ID" />
            <TextField
              className="vm-4-b"
              ref="device_id"
              name="device_id"
              valueLink={this.linkState('device_id')}
              fullWidth={true}
              errorText={this.getValidationMessages('device_id').join(' ')}
              floatingLabelText="Device ID" />
            <Dialog.ContentSection
              title="metadata"
              last={true}>
              <div className="col-flex-1 vm-2-t">
                <Editor
                  ref="metadata"
                  mode="json"
                  height="200px"
                  onChange={(value) => this.setState({metadata: value})}
                  value={JSON.stringify(metadata, null, '\t')}/>
              </div>
            </Dialog.ContentSection>
          </div>
        </Dialog.FullPage>
      );
    }
  });
};
