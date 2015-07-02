var React               = require('react'),
    Reflux              = require('reflux'),

    // Utils
    DialogMixin         = require('../../mixins/DialogMixin'),
    FormMixin           = require('../../mixins/FormMixin'),

    // Stores and Actions
    CodeBoxesActions    = require('./CodeBoxesActions'),
    CodeBoxDialogStore  = require('./CodeBoxDialogStore'),

    // Components
    mui                 = require('material-ui'),
    TextField           = mui.TextField,
    DropDownMenu        = mui.DropDownMenu,
    SelectField         = mui.SelectField,
    Dialog              = mui.Dialog,
    Loading             = require('../../common/Loading/Loading.react.jsx');


module.exports = React.createClass({

  displayName: 'CodeBoxDialog',

  mixins: [
    React.addons.LinkedStateMixin,

    Reflux.connect(CodeBoxDialogStore),
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

  handleDialogShow: function() {
    console.info('ScheduleDialog::handleDialogShow');
    CodeBoxesActions.fetchCodeBoxRuntimes();
  },

  handleEditSubmit: function () {
    CodeBoxesActions.updateCodeBox(this.state.id, {
      label        : this.state.label,
      description  : this.state.description,
      runtime_name : this.state.runtime_name
    });
  },

  handleAddSubmit: function () {
    CodeBoxesActions.createCodeBox({
      label        : this.state.label,
      description  : this.state.description,
      runtime_name : this.state.runtime_name
    });
  },

  render: function () {
    var title       = this.hasEditMode() ? 'Edit': 'Add',
        submitLabel = this.hasEditMode() ? 'Save changes': 'Create Codebox',
        dialogStandardActions = [
          {
            text    : 'Cancel',
            onClick : this.handleCancel,
            ref     : 'cancel'
          }, {
            text    : submitLabel,
            onClick : this.handleFormValidation,
            ref     : 'submit'
          }
        ];

    return (
      <div>
        <Dialog
          ref          = 'dialog'
          title        = {title + ' CodeBox'}
          actions      = {dialogStandardActions}
          modal        = {true}
          onShow       = {this.handleDialogShow}
          contentStyle = {{padding: '8px 0 0 0'}}  >
          <div>
            {this.renderFormNotifications()}
            <form
                onSubmit      = {this.handleFormValidation}
                acceptCharset = 'UTF-8'
                method        = 'post'>

              <TextField
                  ref               = 'label'
                  valueLink         = {this.linkState('label')}
                  errorText         = {this.getValidationMessages('label').join(' ')}
                  name              = 'label'
                  style             = {{width:500}}
                  hintText          = 'Short name for your CodeBox'
                  floatingLabelText = 'Label of CodeBox' />

              <TextField
                  ref               = 'description'
                  name              = 'description'
                  valueLink         = {this.linkState('description')}
                  errorText         = {this.getValidationMessages('description').join(' ')}
                  style             = {{width:500}}
                  className         = 'text-field'
                  multiLine         = {true}
                  hintText          = 'Multiline description of CodeBox (optional)'
                  floatingLabelText = 'Description of CodeBox' />

              <SelectField
                ref               = 'runtime_name'
                name              = 'runtime_name'
                floatingLabelText = 'Runtime name'
                valueLink         = {this.linkState('runtime_name')}
                errorText         = {this.getValidationMessages('runtime_name').join(' ')}
                valueMember       = 'payload'
                displayMember     = 'text'
                fullWidth         = {true}
                menuItems         = {this.state.runtimes} />

            </form>
          </div>
          <Loading
            type     = 'linear'
            position = 'bottom'
            show     = {this.state.isLoading} />
        </Dialog>
      </div>
    );
  }

});

