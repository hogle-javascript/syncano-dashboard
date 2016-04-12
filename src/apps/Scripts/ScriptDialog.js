import React from 'react';
import Reflux from 'reflux';

// Utils
import {DialogMixin, FormMixin} from '../../mixins';

// Stores and Actions
import Actions from './ScriptsActions';
import Store from './ScriptDialogStore';

// Components
import {TextField} from 'syncano-material-ui';
import {SelectFieldWrapper} from 'syncano-components';
import {Dialog} from '../../common';

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
    const {label, description, runtime_name} = this.state;

    Actions.updateScript(this.state.id, {label, description, runtime_name});
  },

  handleAddSubmit() {
    const {label, description, runtime_name} = this.state;

    Actions.createScript({label, description, runtime_name});
  },

  render() {
    const title = this.hasEditMode() ? 'Edit' : 'Add';
    const {isLoading, runtimes, runtime_name, open} = this.state;

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
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}/>
        }
        sidebar={
          <Dialog.SidebarBox>
            <Dialog.SidebarSection>
              A Script is an object that contains code that can be run on Syncano&#39;s servers. A Script is a very
               powerful tool. Just like with code, you can do a lot with it. Additionally, Syncano gives you many
               ways to run Scripts.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection title="Runtime environment">
              The runtime environment that the Script will run in (i.e. <strong>Ruby, Python, NodeJS, Golang,
               Swift</strong> and <strong>PHP</strong>). Every runtime environment supports different language and
               several libraries for each language. For example: The Python runtime has a <strong>requests </strong>
               library.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection last={true}>
              <Dialog.SidebarLink to="http://docs.syncano.io/docs/snippets-scripts">
                Learn more
              </Dialog.SidebarLink>
            </Dialog.SidebarSection>
          </Dialog.SidebarBox>
        }>
        {this.renderFormNotifications()}
        <TextField
          ref="label"
          autoFocus={true}
          valueLink={this.linkState('label')}
          errorText={this.getValidationMessages('label').join(' ')}
          name="label"
          style={{width: 500}}
          hintText="Script's label"
          floatingLabelText="Label"/>
        <TextField
          ref="description"
          name="description"
          valueLink={this.linkState('description')}
          errorText={this.getValidationMessages('description').join(' ')}
          style={{width: 500}}
          multiLine={true}
          hintText="Script's description"
          floatingLabelText="Description (optional)"/>
        <SelectFieldWrapper
          name="runtime_name"
          options={runtimes}
          value={runtime_name}
          floatingLabelText="Runtime environment"
          onChange={(event, index, value) => this.setSelectFieldValue('runtime_name', value)}
          errorText={this.getValidationMessages('runtime_name').join(' ')}/>
      </Dialog.FullPage>
    );
  }
});
