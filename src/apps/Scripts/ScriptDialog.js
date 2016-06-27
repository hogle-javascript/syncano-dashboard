import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';

// Utils
import { DialogMixin, FormMixin } from '../../mixins';

// Stores and Actions
import Actions from './ScriptsActions';
import Store from './ScriptDialogStore';

// Components
import { TextField, SelectField, Divider, MenuItem } from 'material-ui';
import { Dialog } from '../../common/';

export default React.createClass({
  displayName: 'ScriptDialog',

  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints: {
    label: {
      presence: true
    },
    runtime_name: {
      presence: true
    }
  },

  handleDialogShow() {
    console.info('ScriptDialog::handleDialogShow');
    Actions.fetchScriptRuntimes();
  },

  handleEditSubmit() {
    const { id, label, description, runtime_name } = this.state;

    Actions.updateScript(id, { label, description, runtime_name });
  },

  handleAddSubmit() {
    const { label, description, runtime_name } = this.state;

    Actions.createScript({ label, description, runtime_name });
  },

  renderRuntimeOption(item) {
    return (
      <MenuItem
        key={`select-${item.payload}`}
        value={item.payload}
        primaryText={item.text}
      />
    );
  },

  renderRuntimesSelectOptions() {
    const { current, deprecated } = this.state.runtimes;
    const currentOptions = _.map(current, this.renderRuntimeOption);
    const deprecatedOptions = _.map(deprecated, this.renderRuntimeOption);

    return [...currentOptions, <Divider />, ...deprecatedOptions];
  },

  render() {
    const title = this.hasEditMode() ? 'Edit' : 'Add';
    const { isLoading, runtime_name, open } = this.state;

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={`${title} a Script`}
        onRequestClose={this.handleCancel}
        open={open}
        isLoading={isLoading}
        actions={
          <Dialog.StandardButtons
            disabled={!this.state.canSubmit}
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}
          />
        }
        sidebar={
          <Dialog.SidebarBox>
            <Dialog.SidebarSection>
              A Script is an object that contains code that can be run on Syncano&#39;s servers. A Script is a very
               powerful tool. Just like with code, you can do a lot with it. Additionally, Syncano gives you many
               ways to run Scripts.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection title="Runtime environment">
              {`The runtime environment that the Script will run in (i.e. <strong>Ruby, Python, NodeJS, Golang,
               Swift</strong> and <strong>PHP</strong>). Every runtime environment supports different language and
               several libraries for each language. For example: The Python runtime has a <strong>requests </strong>
               library.`}
            </Dialog.SidebarSection>
            <Dialog.SidebarSection last={true}>
              <Dialog.SidebarLink to="http://docs.syncano.io/docs/snippets-scripts">
                Learn more
              </Dialog.SidebarLink>
            </Dialog.SidebarSection>
          </Dialog.SidebarBox>
        }
      >
        {this.renderFormNotifications()}
        <TextField
          ref="label"
          autoFocus={true}
          value={this.state.label}
          onChange={(event, value) => this.setState({ label: value })}
          errorText={this.getValidationMessages('label').join(' ')}
          name="label"
          style={{ width: 500 }}
          hintText="Script's label"
          floatingLabelText="Label"
        />
        <TextField
          ref="description"
          name="description"
          value={this.state.description}
          onChange={(event, value) => this.setState({ description: value })}
          errorText={this.getValidationMessages('description').join(' ')}
          style={{ width: 500 }}
          multiLine={true}
          hintText="Script's description"
          floatingLabelText="Description (optional)"
        />
        <SelectField
          name="runtime_name"
          value={runtime_name}
          floatingLabelText="Runtime environment"
          onChange={(event, index, value) => this.setSelectFieldValue('runtime_name', value)}
          errorText={this.getValidationMessages('runtime_name').join(' ')}
        >
          {this.renderRuntimesSelectOptions()}
        </SelectField>
      </Dialog.FullPage>
    );
  }
});
