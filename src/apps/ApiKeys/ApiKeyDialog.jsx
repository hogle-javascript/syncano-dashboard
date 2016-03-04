import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';

// Utils
import {DialogMixin, FormMixin} from '../../mixins';

// Stores and Actions
import Actions from './ApiKeysActions';
import Store from './ApiKeyDialogStore';

// Components
import {Toggle, TextField} from 'syncano-material-ui';
import {Dialog} from '../../common';

export default React.createClass({
  displayName: 'ApiKeyDialog',

  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin
  ],

  handleAddSubmit() {
    Actions.createApiKey({
      description: this.state.description,
      allow_user_create: this.state.allow_user_create,
      allow_anonymous_read: this.state.allow_anonymous_read,
      ignore_acl: this.state.ignore_acl
    });
  },

  handleEditSubmit() {
    Actions.updateApiKey(this.state.id, {
      description: this.state.description,
      allow_user_create: this.state.allow_user_create,
      allow_anonymous_read: this.state.allow_anonymous_read,
      ignore_acl: this.state.ignore_acl
    });
  },

  handleToogle(event, status) {
    let state = {};

    state[event.target.name] = status;
    this.setState(state);
  },

  renderToggles() {
    const toggles = {
      acl: {
        name: 'ignore_acl',
        label: 'Ignore ACL?'
      },
      registration: {
        name: 'allow_user_create',
        label: 'User registration?'
      },
      usage: {
        name: 'allow_anonymous_read',
        label: 'Anonymous usage?'
      }
    };

    return _.map(toggles, (value) => {
      return (
        <div className="vp-2-b">
          <Toggle
            ref={value.name}
            name={value.name}
            defaultToggled={this.state[value.name]}
            onToggle={this.handleToogle}
            label={value.label}/>
        </div>
      );
    });
  },

  render() {
    const title = this.hasEditMode() ? 'Edit' : 'Generate';

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={`${title} an API Key`}
        onRequestClose={this.handleCancel}
        open={this.state.open}
        isLoading={this.state.isLoading}
        actions={
          <Dialog.StandardButtons
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}/>
        }>
        {this.renderFormNotifications()}
        <TextField
          ref="description"
          name="description"
          fullWidth={true}
          valueLink={this.linkState('description')}
          errorText={this.getValidationMessages('description').join(' ')}
          floatingLabelText="Description of an API Key"
          className="vm-3-b"/>
        {this.renderToggles()}
      </Dialog.FullPage>
    );
  }
});

