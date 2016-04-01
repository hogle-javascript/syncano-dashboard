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
        actions={
          <Dialog.StandardButtons
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}/>
        }
        onRequestClose={this.handleCancel}
        open={open}
        isLoading={isLoading}>
        <div>
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
            onChange={this.setSelectFieldValue.bind(null, 'runtime_name')}
            errorText={this.getValidationMessages('runtime_name').join(' ')}/>
        </div>
      </Dialog.FullPage>
    );
  }
});
