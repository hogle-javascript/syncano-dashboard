import React from 'react';
import Reflux from 'reflux';

// Utils
import {DialogMixin, FormMixin} from '../../mixins';

// Stores and Actions
import Actions from './SnippetsActions';
import Store from './SnippetDialogStore';

// Components
import {TextField, FlatButton} from 'syncano-material-ui';
import {SelectFieldWrapper, Dialog, Loading} from '../../common';

export default React.createClass({
  displayName: 'SnippetDialog',

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
    console.info('SnippetDialog::handleDialogShow');
    Actions.fetchSnippetRuntimes();
  },

  handleEditSubmit() {
    Actions.updateSnippet(this.state.id, {
      label: this.state.label,
      description: this.state.description,
      runtime_name: this.state.runtime_name
    });
  },

  handleAddSubmit() {
    Actions.createSnippet({
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
        title={`${title} a Snippet`}
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
            hintText='Short name for your Snippet'
            floatingLabelText='Label of a Snippet'/>
          <TextField
            ref='description'
            name='description'
            valueLink={this.linkState('description')}
            errorText={this.getValidationMessages('description').join(' ')}
            style={{width: 500}}
            className='text-field'
            multiLine={true}
            hintText='Multiline Snippet description (optional)'
            floatingLabelText='Description of a Snippet'/>
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

