import React from 'react';
import Reflux from 'reflux';

// Utils
import {DialogMixin, FormMixin} from '../../mixins';

// Stores and Actions
import Actions from './TemplatesActions';
import DialogStore from './TemplateDialogStore';

// Components
import {TextField} from 'syncano-material-ui';
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
    const {name, content_type} = this.state;

    Actions.createTemplate({name, content_type});
  },

  handleEditSubmit() {
    const {name, content_type} = this.state;

    Actions.updateTemplate(name, {content_type});
  },

  render() {
    const title = this.hasEditMode() ? 'Edit' : 'Add';
    const {open, isLoading} = this.state;

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={`${title} a Template`}
        actions={
          <Dialog.StandardButtons
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}/>
        }
        onRequestClose={this.handleCancel}
        open={open}
        isLoading={isLoading}>
        {this.renderFormNotifications()}
        <TextField
          ref="name"
          name="name"
          autoFocus={true}
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
      </Dialog.FullPage>
    );
  }
});
