import React from 'react';
import Reflux from 'reflux';

// Utils
import {DialogMixin, FormMixin} from '../../mixins';

// Stores and Actions
import Actions from './ScriptsActions';
import Store from './ScriptDialogStore';

// Components
import {TextField, FlatButton} from 'syncano-material-ui';
import {Loading, SelectFieldWrapper} from 'syncano-components';
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
    Actions.updateScript(this.state.id, {
      label: this.state.label,
      description: this.state.description,
      runtime_name: this.state.runtime_name
    });
  },

  handleAddSubmit() {
    Actions.createScript({
      label: this.state.label,
      description: this.state.description,
      runtime_name: this.state.runtime_name
    });
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
        key="dialog"
        ref="dialog"
        title={`${title} a Script`}
        actions={dialogStandardActions}
        onRequestClose={this.handleCancel}
        open={this.state.open}
        contentStyle={{padding: '8px 0 0 0'}}>
        <div>
          {this.renderFormNotifications()}
          <TextField
            ref='label'
            valueLink={this.linkState('label')}
            errorText={this.getValidationMessages('label').join(' ')}
            name='label'
            style={{width: 500}}
            hintText='Short name for your Script'
            floatingLabelText='Label of a Script'/>
          <TextField
            ref='description'
            name='description'
            valueLink={this.linkState('description')}
            errorText={this.getValidationMessages('description').join(' ')}
            style={{width: 500}}
            multiLine={true}
            hintText='Multiline Script description (optional)'
            floatingLabelText='Description of a Script'/>
          <SelectFieldWrapper
            name="runtime_name"
            options={this.state.runtimes}
            value={this.state.runtime_name}
            floatingLabelText='Runtime environment'
            onChange={this.setSelectFieldValue.bind(null, 'runtime_name')}
            errorText={this.getValidationMessages('runtime_name').join(' ')}/>
        </div>
        <Loading
          type='linear'
          position='bottom'
          show={this.state.isLoading}/>
      </Dialog>
    );
  }
});

