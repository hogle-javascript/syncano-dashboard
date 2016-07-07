import React from 'react';
import Reflux from 'reflux';

// Utils
import { DialogMixin, FormMixin } from '../../mixins';

// Stores and Actions
import ChannelsStore from './ChannelsStore';
import Actions from './ChannelsActions';
import Store from './ChannelDialogStore';

// Components
import { TextField, Toggle } from 'material-ui';
import { Dialog, SelectFieldWrapper } from '../../common/';

export default React.createClass({
  displayName: 'ChannelDialog',

  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints: {
    name: {
      presence: true
    },
    type: {
      presence: true
    }
  },

  getParams() {
    return {
      name: this.state.name,
      description: this.state.description,
      type: this.state.type,
      group: this.state.group,
      custom_publish: this.state.custom_publish,
      other_permissions: this.state.other_permissions,
      group_permissions: this.state.group_permissions
    };
  },

  handleEditSubmit() {
    Actions.updateChannel(this.state.name, this.getParams());
  },

  handleAddSubmit() {
    Actions.createChannel(this.getParams());
  },

  handleToogle(event, status) {
    let state = {};

    state[event.target.name] = status;
    this.setState(state);
  },

  render() {
    const {
      group,
      name,
      description,
      type,
      canSubmit,
      isLoading,
      open,
      group_permissions,
      other_permissions,
      custom_publish
    } = this.state;
    const title = this.hasEditMode() ? 'Edit' : 'Add';

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={`${title} a Channel Socket`}
        onRequestClose={this.handleCancel}
        open={open}
        isLoading={isLoading}
        actions={
          <Dialog.StandardButtons
            disabled={!canSubmit}
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}
          />
        }
        sidebar={
          <Dialog.SidebarBox>
            <Dialog.SidebarSection>
              Channels are a way of providing realtime communication functionality in Syncano. Users can subscribe to
              Channels in order to get notifications about changes that happen to Data Objects connected to those
              Channels.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection title="Channel type">
              It allows your Users to be able to send custom messages on a Channel. This functionality might come in
              handy when you’d like to create e.g. a chat application.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection title="Custom publishing">
              It allows your Users to be able to send custom messages on a Channel.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection last={true}>
              <Dialog.SidebarLink to="http://docs.syncano.io/docs/realtime-communication">
                Learn more
              </Dialog.SidebarLink>
            </Dialog.SidebarSection>
          </Dialog.SidebarBox>
        }
      >
        {this.renderFormNotifications()}
        <Dialog.ContentSection>
          <div className="col-md-20">
            <TextField
              ref="name"
              autoFocus={true}
              value={name}
              onChange={(event, value) => this.setState({ name: value })}
              errorText={this.getValidationMessages('name').join(' ')}
              name="name"
              disabled={this.hasEditMode()}
              fullWidth={true}
              hintText="Channel's name"
              floatingLabelText="Name"
            />
          </div>
          <div className="col-flex-1">
            <SelectFieldWrapper
              name="type"
              floatingLabelText="Channel type"
              options={ChannelsStore.getChannelTypesDropdown()}
              disabled={this.hasEditMode()}
              value={type}
              onChange={(event, index, value) => this.setSelectFieldValue('type', value)}
              errorText={this.getValidationMessages('type').join(' ')}
            />
          </div>
          <div className="col-flex-0">
            <TextField
              ref="description"
              name="description"
              value={description}
              onChange={(event, value) => this.setState({ description: value })}
              errorText={this.getValidationMessages('description').join(' ')}
              fullWidth={true}
              multiLine={true}
              maxRows={2}
              floatingLabelText="Description (optional)"
              hintText="Channel Socket's description"
            />
          </div>
        </Dialog.ContentSection>
        <Dialog.ContentSection title="Permissions">
          <div className="col-flex-1">
            <TextField
              ref="group"
              name="group"
              fullWidth={true}
              value={group}
              onChange={(event, value) => this.setState({ group: value })}
              errorText={this.getValidationMessages('group').join(' ')}
              hintText="Group's ID"
              floatingLabelText="Group ID"
            />
          </div>
          <div className="col-flex-1">
            <SelectFieldWrapper
              name="group_permissions"
              floatingLabelText="Group permissions"
              options={ChannelsStore.getChannelPermissionsDropdown()}
              value={group_permissions}
              onChange={(event, index, value) => this.setSelectFieldValue('group_permissions', value)}
              errorText={this.getValidationMessages('group_permissions').join(' ')}
            />
          </div>
          <div className="col-flex-1">
            <SelectFieldWrapper
              name="other_permissions"
              floatingLabelText="Other permissions"
              options={ChannelsStore.getChannelPermissionsDropdown()}
              value={other_permissions}
              onChange={(event, index, value) => this.setSelectFieldValue('other_permissions', value)}
              errorText={this.getValidationMessages('other_permissions').join(' ')}
            />
          </div>
        </Dialog.ContentSection>
        <Dialog.ContentSection last="true">
          <div
            className="col-flex-1"
            style={{ maxWidth: 320 }}
          >
            <Toggle
              ref="custom_publish"
              name="custom_publish"
              defaultToggled={custom_publish}
              onToggle={this.handleToogle}
              label="Custom publishing in this channel?"
              labelStyle={{ fontSize: 15 }}
            />
          </div>
        </Dialog.ContentSection>
      </Dialog.FullPage>
    );
  }
});
