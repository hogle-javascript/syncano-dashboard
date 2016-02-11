import React from 'react';
import Reflux from 'reflux';

// Utils
import {DialogMixin, FormMixin} from '../../mixins';

// Stores and Actions
import Actions from './TemplatesActions';
import DialogStore from './TemplateDialogStore';

// Components
import {TextField, FlatButton} from 'syncano-material-ui';
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
    content_type: {
      presence: true
    }
  },

  handleAddSubmit() {
    Actions.createTemplate({
      name: this.state.name,
      content_type: this.state.content_type
    });
  },

  handleEditSubmit() {
    Actions.updateTemplate(this.state.name, {
      content_type: this.state.content_type
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
        title={`${title} a Template Socket`}
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
          hintText="Name of the Template"
          floatingLabelText="Name"/>
        <TextField
          ref="content_type"
          name="content_type"
          fullWidth={true}
          valueLink={this.linkState('content_type')}
          errorText={this.getValidationMessages('content_type').join(' ')}
          hintText="Content type of the Template"
          floatingLabelText="Content type"/>
      </Dialog>
    );
  }
});

