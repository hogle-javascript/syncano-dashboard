import React from 'react';
import Reflux from 'reflux';

// Utils
import { DialogMixin, FormMixin } from '../../mixins';

// Stores and Actions
import Actions from './TemplatesActions';
import DialogStore from './TemplateDialogStore';

// Components
import { TextField, AutoComplete } from 'material-ui';
import { Dialog } from '../../common/';

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

  handleTemplateAutocompleteFilter(searchText, key) {
    if (!searchText) {
      return true;
    }

    return searchText !== '' && key.includes(searchText);
  },

  handleAddSubmit() {
    const { name, content_type } = this.state;

    Actions.createTemplate({ name, content_type });
  },

  handleEditSubmit() {
    const { name, content_type } = this.state;

    Actions.updateTemplate(name, { content_type });
  },

  render() {
    const dataSource = ['text/html', 'text/css', 'text/csv', 'text/plain', 'application/xml', 'application/json'];
    const title = this.hasEditMode() ? 'Edit' : 'Add';
    const { open, isLoading, canSubmit } = this.state;

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={`${title} a Template`}
        actions={
          <Dialog.StandardButtons
            disabled={!canSubmit}
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}
          />
        }
        onRequestClose={this.handleCancel}
        open={open}
        isLoading={isLoading}
      >
        {this.renderFormNotifications()}
        <Dialog.ContentSection>
          <TextField
            ref="name"
            name="name"
            autoFocus={true}
            fullWidth={true}
            disabled={this.hasEditMode()}
            value={this.state.name}
            onChange={(event, value) => this.setState({ name: value })}
            errorText={this.getValidationMessages('name').join(' ')}
            hintText="Name of the Template"
            floatingLabelText="Name"
          />
        </Dialog.ContentSection>
        <Dialog.ContentSection>
          <AutoComplete
            ref="class"
            name="class"
            floatingLabelText="Content type"
            hintText="Start typing to narrow down content types or type a new one"
            filter={this.handleTemplateAutocompleteFilter}
            dataSource={dataSource}
            searchText={this.state.content_type}
            onNewRequest={(value) => this.setState({ content_type: value })}
            onUpdateInput={(value) => this.setState({ content_type: value })}
            fullWidth={true}
            openOnFocus={true}
          />
        </Dialog.ContentSection>
      </Dialog.FullPage>
    );
  }
});
