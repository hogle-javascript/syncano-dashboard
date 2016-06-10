import React from 'react';
import _ from 'lodash';
import Reflux from 'reflux';

// Utils
import {DialogMixin, FormMixin} from '../../mixins';

// Components
import {TextField, Toggle} from 'material-ui';
import {Dialog, Editor} from '../../common/';

export default (type, Store, Actions, sidebar) => {
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
          presence: true,
          length: {
            maximum: 64
          }
        },
        registration_id: {
          presence: true
        }
      };
    },

    getInitialState() {
      return {
        is_active: true
      };
    },

    getParams() {
      const {label, registration_id, user, device_id, is_active, metadata} = this.state;
      const params = {
        label,
        registration_id,
        user,
        device_id,
        is_active,
        metadata
      };

      return this.removeEmptyKeys(params);
    },

    handleAddSubmit() {
      if (_.isFunction(Actions.createDevice)) {
        Actions.createDevice(this.getParams());
      }
    },

    handleEditSubmit() {
      if (_.isFunction(Actions.updateDevice)) {
        const {registration_id} = this.state;

        Actions.updateDevice(registration_id, this.getParams());
      }
    },

    removeEmptyKeys(params) {
      return _.omit(params, _.isEmpty);
    },

    render() {
      const {open, isLoading, is_active, metadata} = this.state;
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
              disabled={!this.state.canSubmit}
              handleCancel={this.handleCancel}
              handleConfirm={this.handleFormValidation}/>
          }
          sidebar={sidebar}>
          <div className="vp-2-t">
            {this.renderFormNotifications()}
            <Dialog.ContentSection>
              <div className="col-flex-1">
                <div style={{width: 100}}>
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
              value={this.state.label}
              onChange={(event, value) => this.setState({label: value})}
              fullWidth={true}
              errorText={this.getValidationMessages('label').join(' ')}
              floatingLabelText="Label of the Device" />
            <TextField
              ref="registration_id"
              name="registration_id"
              disabled={this.hasEditMode()}
              value={this.state.registration_id}
              onChange={(event, value) => this.setState({registration_id: value})}
              fullWidth={true}
              errorText={this.getValidationMessages('registration_id').join(' ')}
              floatingLabelText="Device's registration ID" />
            <TextField
              ref="user"
              name="user"
              value={this.state.user}
              onChange={(event, value) => this.setState({user: value})}
              fullWidth={true}
              errorText={this.getValidationMessages('user').join(' ')}
              floatingLabelText="User ID" />
            <TextField
              className="vm-4-b"
              ref="device_id"
              name="device_id"
              value={this.state.device_id}
              onChange={(event, value) => this.setState({device_id: value})}
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
