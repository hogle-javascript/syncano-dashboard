import React from 'react';
import Reflux from 'reflux';

// Utils
import {DialogMixin, FormMixin} from '../../mixins';

// Stores and Actions
import Actions from './SnippetsActions';
import Store from './SnippetDialogStore';

// Components
import MUI from 'syncano-material-ui';
import Common from '../../common';

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
      <MUI.FlatButton
        key="cancel"
        label="Cancel"
        onTouchTap={this.handleCancel}
        ref="cancel"/>,
      <MUI.FlatButton
        key="confirm"
        label="Confirm"
        primary={true}
        onTouchTap={this.handleFormValidation}
        ref="submit"/>
    ];

    return (
      <Common.Dialog
        key='dialog'
        ref='dialog'
        title={`${title} a Snippet`}
        actions={dialogStandardActions}
        onRequestClose={this.handleCancel}
        open={this.state.open}
        contentStyle={{padding: '8px 0 0 0'}}>
        <div>
          {this.renderFormNotifications()}
          <MUI.TextField
            ref='label'
            valueLink={this.linkState('label')}
            errorText={this.getValidationMessages('label').join(' ')}
            name='label'
            style={{width: 500}}
            hintText='Short name for your Snippet'
            floatingLabelText='Label of a Snippet'/>
          <MUI.TextField
            ref='description'
            name='description'
            valueLink={this.linkState('description')}
            errorText={this.getValidationMessages('description').join(' ')}
            style={{width: 500}}
            className='text-field'
            multiLine={true}
            hintText='Multiline Snippet description (optional)'
            floatingLabelText='Description of a Snippet'/>
          <MUI.SelectField
            ref='runtime_name'
            name='runtime_name'
            floatingLabelText='Runtime environment'
            valueLink={this.linkState('runtime_name')}
            errorText={this.getValidationMessages('runtime_name').join(' ')}
            valueMember='payload'
            displayMember='text'
            fullWidth={true}
            menuItems={this.state.runtimes}/>
        </div>
        <Common.Loading
          type='linear'
          position='bottom'
          show={this.state.isLoading}/>
      </Common.Dialog>
    );
  }
});

