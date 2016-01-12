import React from 'react';
import Reflux from 'reflux';

// Utils
import {DialogMixin, FormMixin} from '../../mixins';

// Stores and Actions
import ChannelsStore from './ChannelsStore';
import Actions from './ChannelsActions';
import Store from './ChannelDialogStore';

// Components
import {TextField, FlatButton, Toggle} from 'syncano-material-ui';
import {Loading, SelectFieldWrapper} from 'syncano-components';
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
        key='dialog'
        ref='dialog'
        title={`${title} a Channel Socket`}
        actions={dialogStandardActions}
        onRequestClose={this.handleCancel}
        open={this.state.open}
        contentStyle={{padding: '8px 0 0 0'}}>
        {this.renderFormNotifications()}
        <div className="row">
          <div className="col-md-12">
            <TextField
              ref='name'
              valueLink={this.linkState('name')}
              errorText={this.getValidationMessages('name').join(' ')}
              name='name'
              disabled={this.hasEditMode()}
              fullWidth={true}
              hintText='Short name for your Channel Socket'
              floatingLabelText='Name of a Channel Socket' />
          </div>
          <div className="col-flex-1">
            <TextField
              ref='description'
              name='description'
              valueLink={this.linkState('description')}
              errorText={this.getValidationMessages('description').join(' ')}
              fullWidth={true}
              hintText='Description of a Channel Socket (optional)'
              floatingLabelText='Description of a Channel Socket' />
          </div>
        </div>
        <SelectFieldWrapper
          name="type"
          floatingLabelText="Channel type"
          options={ChannelsStore.getChannelTypesDropdown()}
          disabled={this.hasEditMode()}
          value={this.state.type}
          onChange={this.setSelectFieldValue.bind(null, 'type')}
          errorText={this.getValidationMessages('type').join(' ')}/>
        <div className="vm-5-t">Permissions</div>
        <div className="row">
          <div className="col-flex-1">
            <TextField
              ref='group'
              name='group'
              fullWidth={true}
              errorText={this.getValidationMessages('group').join(' ')}
              hintText='ID of the Group'
              floatingLabelText='Group (ID)' />
          </div>
          <div className="col-flex-1">
            <SelectFieldWrapper
              name='group_permissions'
              floatingLabelText='Group permissions'
              options={ChannelsStore.getChannelPermissionsDropdown()}
              value={this.state.group_permissions}
              onChange={this.setSelectFieldValue.bind(null, 'group_permissions')}
              errorText={this.getValidationMessages('group_permissions').join(' ')}/>
          </div>
          <div className="col-flex-1">
            <SelectFieldWrapper
              name='other_permissions'
              floatingLabelText='Other permissions'
              options={ChannelsStore.getChannelPermissionsDropdown()}
              value={this.state.other_permissions}
              onChange={this.setSelectFieldValue.bind(null, 'other_permissions')}
              errorText={this.getValidationMessages('other_permissions').join(' ')}/>
          </div>
        </div>
        <Toggle
          ref='custom_publish'
          name='custom_publish'
          defaultToggled={this.state.custom_publish}
          onToggle={this.handleToogle}
          style={{marginTop: 20}}
          label='Custom publishing in this channel?' />
        <Loading
          type='linear'
          position='bottom'
          show={this.state.isLoading} />
      </Dialog>
    );
  }
});
