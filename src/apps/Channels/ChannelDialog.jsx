import React from 'react';
import Reflux from 'reflux';

// Utils
import {DialogMixin, FormMixin} from '../../mixins';

// Stores and Actions
import ChannelsStore from './ChannelsStore';
import Actions from './ChannelsActions';
import Store from './ChannelDialogStore';

// Components
import {TextField, Toggle} from 'syncano-material-ui';
import {SelectFieldWrapper} from 'syncano-components';
import {Dialog} from '../../common';

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
    const title = this.hasEditMode() ? 'Edit' : 'Create';

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={`${title} a Channel Socket`}
        onRequestClose={this.handleCancel}
        open={this.state.open}
        isLoading={this.state.isLoading}
        actions={
          <Dialog.StandardButtons
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}/>
        }>
        {this.renderFormNotifications()}
        <div className="row">
          <Dialog.Sidebar>
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
              It allows your Users to be able to send custom messages on a Channel. This functionality might come in
              handy when you’d like.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection last={true}>
              <a
                href="http://docs.syncano.io/docs/realtime-communication"
                style={{textDecoration: 'underline', color: 'rgba(68,68,68,.5)'}}
                target="_blank">
                <strong>Learn more</strong>
              </a>
            </Dialog.SidebarSection>
          </Dialog.Sidebar>
          <Dialog.Content>
            <Dialog.ContentSection>
              <div className="col-md-12">
                <TextField
                  ref="name"
                  valueLink={this.linkState('name')}
                  errorText={this.getValidationMessages('name').join(' ')}
                  name="name"
                  disabled={this.hasEditMode()}
                  fullWidth={true}
                  hintText="Short name for your Channel Socket"
                  floatingLabelText="Name of a Channel Socket" />
              </div>
              <div className="col-flex-1">
                <SelectFieldWrapper
                  name="type"
                  floatingLabelText="Channel type"
                  options={ChannelsStore.getChannelTypesDropdown()}
                  disabled={this.hasEditMode()}
                  value={this.state.type}
                  onChange={this.setSelectFieldValue.bind(null, 'type')}
                  errorText={this.getValidationMessages('type').join(' ')}/>
              </div>
              <div className="col-flex-0">
                <TextField
                  ref="description"
                  name="description"
                  valueLink={this.linkState('description')}
                  errorText={this.getValidationMessages('description').join(' ')}
                  fullWidth={true}
                  multiLine={true}
                  maxRows={2}
                  hintText="Description of a Channel Socket (optional)"
                  floatingLabelText="Description of a Channel Socket" />
              </div>
            </Dialog.ContentSection>
            <Dialog.ContentSection title="Permissions">
              <div className="col-flex-1">
                <TextField
                  ref="group"
                  name="group"
                  fullWidth={true}
                  errorText={this.getValidationMessages('group').join(' ')}
                  hintText="ID of the Group"
                  floatingLabelText="Group (ID)" />
              </div>
              <div className="col-flex-1">
                <SelectFieldWrapper
                  name="group_permissions"
                  floatingLabelText="Group permissions"
                  options={ChannelsStore.getChannelPermissionsDropdown()}
                  value={this.state.group_permissions}
                  onChange={this.setSelectFieldValue.bind(null, 'group_permissions')}
                  errorText={this.getValidationMessages('group_permissions').join(' ')}/>
              </div>
              <div className="col-flex-1">
                <SelectFieldWrapper
                  name="other_permissions"
                  floatingLabelText="Other permissions"
                  options={ChannelsStore.getChannelPermissionsDropdown()}
                  value={this.state.other_permissions}
                  onChange={this.setSelectFieldValue.bind(null, 'other_permissions')}
                  errorText={this.getValidationMessages('other_permissions').join(' ')}/>
              </div>
            </Dialog.ContentSection>
            <Dialog.ContentSection last="true">
              <div
                className="col-flex-1"
                style={{maxWidth: 320}}>
                <Toggle
                  ref="custom_publish"
                  name="custom_publish"
                  defaultToggled={this.state.custom_publish}
                  onToggle={this.handleToogle}
                  label="Custom publishing in this channel?"
                  labelStyle={{fontSize: 15}}/>
              </div>
            </Dialog.ContentSection>
          </Dialog.Content>
        </div>
      </Dialog.FullPage>
    );
  }
});
