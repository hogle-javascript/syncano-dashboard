import React from 'react';
import Reflux from 'reflux';
import Select from 'react-select';
import _ from 'lodash';

// Utils
import Mixins from '../../mixins';

// Stores and Actions
import Store from './UserDialogStore';
import UsersActions from './UsersActions';
import GroupsStore from './GroupsStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';

require('react-select/dist/default.css');

export default React.createClass({

  displayName: 'UserDialog',

  mixins: [
    Reflux.connect(Store),
    Mixins.Form,
    Mixins.Dialog
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
    let editFormmConstraints = {
      username: {
        presence: true
      }
    };

    return this.hasEditMode() ? editFormmConstraints : addFormConstraints;
  },

  componentWillUnmount() {
    GroupsStore.resetActiveGroup();
  },

  handleAddSubmit() {
    let activeGroup = GroupsStore.getActiveGroup();
    let userGroups = this.state.newUserGroups || this.state.secondInstance || activeGroup;

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

    UsersActions.updateUser(
      this.state.id,
      {
        username: this.state.username,
        password: this.state.password
      },
      {
        groups: this.state.groups,
        newGroups: userGroups
      }
    );
  },

  handleSelectFieldChange(newValue, selectedGroups) {
    this.setState({
      newUserGroups: selectedGroups
    })
  },

  getSelectValueSource() {
    let activeGroup = GroupsStore.getActiveGroup();

    if (this.state.newUserGroups) {
      return this.linkState('newUserGroups');
    } else if (this.state.groups) {
      return this.linkState('groups');
    } else if (this.state.secondInstance && this.state.secondInstance.value) {
      return this.state.secondInstance;
    } else if (activeGroup) {
      return activeGroup;
    }
    return null;
  },

  render() {
    let title = this.hasEditMode() ? 'Edit' : 'Add';
    let submitLabel = 'Confirm';
    let selectValueSource = this.getSelectValueSource();
    let selectValue = '';
    let allGroups = GroupsStore.getGroups().map((group) => {
      group.value = group.id + '';
      return group;
    });
    let dialogStandardActions = [
      {
        ref: 'cancel',
        text: 'Cancel',
        onTouchTap: this.handleCancel
      },
      {
        ref: 'submit',
        text: {submitLabel},
        onTouchTap: this.handleFormValidation
      }
    ];

    if (selectValueSource && _.isArray(selectValueSource.value)) {
      selectValue = selectValueSource.value.map((value) => value.id).join(',');
    } else if (selectValueSource && selectValueSource.value) {
      selectValue = selectValueSource.value;
    }

    return (
      <Common.Dialog
        ref='dialog'
        title={title + ' a User'}
        actions={dialogStandardActions}
        onDismiss={this.resetDialogState}>
        <div>
          {this.renderFormNotifications()}
          <form
            onSubmit={this.handleFormValidation}
            acceptCharset="UTF-8"
            method="post">
            <MUI.TextField
              ref='username'
              fullWidth={true}
              valueLink={this.linkState('username')}
              errorText={this.getValidationMessages('username').join(' ')}
              hintText='Username'
              floatingLabelText='Username'/>
            <MUI.TextField
              ref='password'
              type='password'
              fullWidth={true}
              valueLink={this.linkState('password')}
              errorText={this.getValidationMessages('password').join(' ')}
              hintText='User password'
              floatingLabelText='Password'
              className='vm-4-b'/>
            <Select
              name='group'
              multi={true}
              value={selectValue}
              placeholder='User groups'
              options={allGroups}
              onChange={this.handleSelectFieldChange}/>
          </form>
          <Common.Loading
            type="linear"
            position="bottom"
            show={this.state.isLoading}/>
        </div>
      </Common.Dialog>
    );
  }
});
