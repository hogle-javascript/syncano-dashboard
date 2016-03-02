import React from 'react';
import Reflux from 'reflux';
import Select from 'react-select';
import _ from 'lodash';

// Utils
import {DialogMixin, FormMixin} from '../../mixins';

// Stores and Actions
import Store from './UserDialogStore';
import UsersActions from './UsersActions';
import {GroupsStore} from './../Groups';

// Components
import {TextField} from 'syncano-material-ui';
import {Loading} from 'syncano-components';
import {Dialog} from '../../common';

import 'react-select/dist/react-select.min.css';

export default React.createClass({
  displayName: 'UserDialog',

  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints() {
    let addFormConstraints = {
      username: {
        presence: true
      },
      password: {
        presence: true
      }
    };
    let editFormConstraints = {
      username: {
        presence: true
      }
    };

    return this.hasEditMode() ? editFormConstraints : addFormConstraints;
  },

  getSelectValueSource() {
    if (this.state.newUserGroups) {
      return this.linkState('newUserGroups');
    } else if (this.state.groups) {
      return this.linkState('groups');
    } else if (this.state.secondInstance && this.state.secondInstance.value) {
      return this.state.secondInstance;
    }

    return null;
  },

  handleAddSubmit() {
    let userGroups = this.state.newUserGroups || this.state.secondInstance;

    UsersActions.createUser(
      {
        username: this.state.username,
        password: this.state.password
      },
      {
        newGroups: userGroups
      }
    );
  },

  handleEditSubmit() {
    let userGroups = this.getSelectValueSource().value;
    let credentials = {
      username: this.state.username
    };

    if (this.state.password) {
      credentials.password = this.state.password;
    }

    UsersActions.updateUser(
      this.state.id,
      credentials,
      {
        groups: this.state.groups,
        newGroups: userGroups
      }
    );
  },

  handleSelectFieldChange(newValue, selectedGroups) {
    this.setState({
      newUserGroups: selectedGroups
    });
  },

  render() {
    let title = this.hasEditMode() ? 'Edit' : 'Create';
    let selectValueSource = this.getSelectValueSource();
    let selectValue = '';
    let allGroups = GroupsStore.getGroups().map((group) => {
      group.value = group.id.toString();
      return group;
    });

    if (selectValueSource && _.isArray(selectValueSource.value)) {
      selectValue = selectValueSource.value.map((value) => value.id).join(',');
    } else if (selectValueSource && selectValueSource.value) {
      selectValue = selectValueSource.value;
    }

    return (
      <Dialog
        key='dialog'
        ref='dialog'
        title={`${title} a User`}
        onRequestClose={this.handleCancel}
        open={this.state.open}
        actions={
          <Dialog.StandardButtons
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}/>
        }>
        <div>
          {this.renderFormNotifications()}
          <TextField
            ref='username'
            fullWidth={true}
            valueLink={this.linkState('username')}
            errorText={this.getValidationMessages('username').join(' ')}
            hintText='Username'
            floatingLabelText='Username' />
          <TextField
            ref='password'
            type='password'
            fullWidth={true}
            valueLink={this.linkState('password')}
            errorText={this.getValidationMessages('password').join(' ')}
            hintText='User password'
            floatingLabelText='Password'
            className='vm-4-b' />
          <Select
            name='group'
            multi={true}
            value={selectValue}
            placeholder='User groups'
            options={allGroups}
            onChange={this.handleSelectFieldChange} />
          <Loading
            type="linear"
            position="bottom"
            show={this.state.isLoading} />
        </div>
      </Dialog>
    );
  }
});
