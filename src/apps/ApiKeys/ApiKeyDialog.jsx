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
    const {description, allow_user_create, allow_anonymous_read, ignore_acl} = this.state;

    Actions.createApiKey({description, allow_user_create, allow_anonymous_read, ignore_acl});
  },

  handleEditSubmit() {
    const {id, description, allow_user_create, allow_anonymous_read, ignore_acl} = this.state;

    Actions.updateApiKey(id, {description, allow_user_create, allow_anonymous_read, ignore_acl});
  },

  handleToogle(event, status) {
    let state = {};

    state[event.target.name] = status;
    this.setState(state);
  },

  renderToggles() {
    const toggles = {
      ignore_acl: 'Ignore ACL?',
      allow_user_create: 'User registration?',
      allow_anonymous_read: 'Anonymous usage?'
    };

    return _.map(toggles, (value, key) => {
      return (
        <div
          key={key}
          className="vp-2-b">
          <Toggle
            ref={key}
            name={key}
            defaultToggled={this.state[key]}
            onToggle={this.handleToogle}
            label={value}/>
        </div>
      );
    });
  },

  render() {
    const title = this.hasEditMode() ? 'Edit' : 'Add';
    const {open, isLoading} = this.state;

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={`${title} an API Key`}
        onRequestClose={this.handleCancel}
        open={open}
        isLoading={isLoading}
        actions={
          <Dialog.StandardButtons
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}/>
        }>
        {this.renderFormNotifications()}
        <TextField
          ref="description"
          name="description"
          autoFocus={true}
          fullWidth={true}
          valueLink={this.linkState('description')}
          errorText={this.getValidationMessages('description').join(' ')}
          hintText="API key's description"
          floatingLabelText="Description (optional)"
          className="vm-3-b"/>
        {this.renderToggles()}
      </Dialog.FullPage>
    );
  }
});
