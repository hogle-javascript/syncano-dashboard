var React               = require('react'),
    Reflux              = require('reflux'),

    // Utils
    ValidationMixin     = require('../../mixins/ValidationMixin'),
    DialogFormMixin     = require('../../mixins/DialogFormMixin'),
    FormMixin           = require('../../mixins/FormMixin'),

    // Stores and Actions
    CodeBoxesActions    = require('./CodeBoxesActions'),
    CodeBoxesStore      = require('./CodeBoxesStore'),

    // Components
    mui                 = require('material-ui'),
    TextField           = mui.TextField,
    DropDownMenu        = mui.DropDownMenu,
    Dialog              = mui.Dialog;


module.exports = React.createClass({

  displayName: 'CodeBoxesAddDialog',

  mixins: [
    React.addons.LinkedStateMixin,

    Reflux.connect(CodeBoxesStore),
    DialogFormMixin,
    ValidationMixin,
    FormMixin
  ],

  validatorConstraints: {
    label: {
      presence: true
    },
    description: {
      presence: true
    }
  },

  clearData: function() {
    this.setState({
      errors : {}
    })
  },

  editShow: function() {
    this.setState({
      label       : '',
      description : '',
      errors      : {}
    });

    var checkedItem = CodeBoxesStore.getCheckedItem();
    if (checkedItem) {
      this.setState({
          label                : checkedItem.label,
          description          : checkedItem.description,
          selectedRuntimeIndex : CodeBoxesStore.getRuntimeIndex(checkedItem.runtime_name)
      });
    }
  },

  handleEditSubmit: function () {
    CodeBoxesActions.updateCodeBox(CodeBoxesStore.getCheckedItem().id, {
      label        : this.state.label,
      description  : this.state.description,
      runtime_name : this.state.runtimes[this.state.selectedRuntimeIndex].text
    });
  },

  handleAddSubmit: function () {
    CodeBoxesActions.addCodeBox({
      label        : this.state.label,
      description  : this.state.description,
      runtime_name : this.state.runtimes[this.state.selectedRuntimeIndex].text
    });
  },

  handleRuntimeChange: function (event, selectedIndex, menuItem){
    this.setState({selectedRuntimeIndex: selectedIndex});
  },

  render: function () {

    var modalState = true;

    var runtimesMenu = null;
    if (this.state.runtimes) {
      runtimesMenu = <DropDownMenu
        ref               = "runtime"
        name              = "runtime"
        autoWidth         = {true}
        floatingLabelText = "Description of CodeBox"
        style             = {{width:500}}
        selectedIndex     = {this.state.selectedRuntimeIndex}
        onChange          = {this.handleRuntimeChange}
        menuItems         = {this.state.runtimes} />;
    }

    var floatingLabel = {
      color      : 'grey',
      fontSize   : '16px',
      fontFamily : 'Roboto, sans-serif'
    };

    var title       = this.props.mode === 'edit' ? 'Edit': 'Add',
        submitLabel = this.props.mode === 'edit' ? 'Save changes': 'Create Codebox';

    var dialogStandardActions = [
      {
        text    : 'Cancel',
        onClick : this.handleCancel,
        ref     : 'cancel'
      },
      {
        text    : submitLabel,
        onClick : this.handleFormValidation,
        ref     : 'submit'
      }
    ];

    return (
      <Dialog
        ref     = "dialogRef"
        title   = {title + " CodeBox"}
        actions = {dialogStandardActions}
        modal   = {modalState}>
        <div>
          {this.renderFormNotifications()}
          <form
            onSubmit      = {this.handleFormValidation}
            acceptCharset = "UTF-8"
            method        = "post">
            <TextField
                ref               = "label"
                valueLink         = {this.linkState('label')}
                errorText         = {this.getValidationMessages('label').join(' ')}
                name              = "label"
                style             = {{width:500}}
                hintText          = "Short name for your CodeBox"
                floatingLabelText = "Label of CodeBox" />
            <TextField
                ref               = "description"
                name              = "description"
                valueLink         = {this.linkState('description')}
                errorText         = {this.getValidationMessages('description').join(' ')}
                style             = {{width:500}}
                className         = "text-field"
                multiLine         = {true}
                hintText          = "Multiline description of CodeBox (optional)"
                floatingLabelText = "Description of CodeBox" />
            <div>
              <label style={(floatingLabel)}>Runtime</label>{runtimesMenu}
            </div>
        </form>
        </div>
      </Dialog>
    );
  }

});

