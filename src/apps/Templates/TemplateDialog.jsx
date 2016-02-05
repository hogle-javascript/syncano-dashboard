import React from 'react';
import Reflux from 'reflux';

// Utils
import {DialogMixin, FormMixin} from '../../mixins';

// Stores and Actions
import Actions from './TemplatesActions';
import DialogStore from './TemplateDialogStore';
import SnippetsActions from '../Snippets/SnippetsActions';

// Components
import {TextField, Toggle, FlatButton} from 'syncano-material-ui';
import {SelectFieldWrapper} from 'syncano-components';
import {Dialog} from '../../common';

export default React.createClass({
  displayName: 'TemplateDialog',

  mixins: [
    Reflux.connect(DialogStore),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints: {
    name: {
      presence: true
    },
    codebox: {
      presence: {
        message: `^Snippet can't be blank`
      }
    }
  },

  handleDialogShow() {
    console.info('CodeBoxDialog::handleDialogShow');
    SnippetsActions.fetch();
  },

  handleAddSubmit() {
    Actions.createCodeBox({
      name: this.state.name,
      codebox: this.state.codebox,
      description: this.state.description,
      public: this.state.public
    });
  },

  handleEditSubmit() {
    Actions.updateCodeBox(this.state.name, {
      codebox: this.state.codebox,
      description: this.state.description,
      public: this.state.public
    });
  },

  handleToogle(event, status) {
    let state = {};

    state[event.target.name] = status;
    this.setState(state);
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
        key='dialog'
        ref='dialog'
        title={`${title} a CodeBox Socket`}
        defaultOpen={this.props.defaultOpen}
        actions={dialogStandardActions}
        open={this.state.open}
        modal={true}>
        {this.renderFormNotifications()}
        <TextField
          ref="name"
          name="name"
          fullWidth={true}
          disabled={this.hasEditMode()}
          valueLink={this.linkState('name')}
          errorText={this.getValidationMessages('name').join(' ')}
          hintText="Name of the CodeBox"
          floatingLabelText="Name"/>
        <TextField
          ref="description"
          name="description"
          fullWidth={true}
          valueLink={this.linkState('description')}
          errorText={this.getValidationMessages('description').join(' ')}
          hintText="Description of the CodeBox"
          floatingLabelText="Description"/>
        <SelectFieldWrapper
          name="snippet"
          options={this.state.snippets}
          value={this.state.codebox}
          onChange={this.setSelectFieldValue.bind(null, 'codebox')}
          errorText={this.getValidationMessages('codebox').join(' ')}/>
        <Toggle
          ref='public'
          name='public'
          onToggle={this.handleToogle}
          style={{marginTop: 20}}
          defaultToggled={this.state.public}
          label='Make this CodeBox public?'/>
      </Dialog>
    );
  }
});

