var React            = require('react'),
    Reflux           = require('reflux'),

    // Utils
    ValidationMixin  = require('../../mixins/ValidationMixin'),
    DialogFormMixin  = require('../../mixins/DialogFormMixin'),
    FormMixin        = require('../../mixins/FormMixin'),

    // Stores and Actions
    ClassesActions   = require('./ClassesActions'),
    ClassesStore     = require('./ClassesStore'),

    // Components
    mui              = require('material-ui'),
    Toggle           = mui.Toggle,
    TextField        = mui.TextField,
    DropDownMenu     = mui.DropDownMenu,
    Dialog           = mui.Dialog;


module.exports = React.createClass({

  displayName: 'ClassesAddDialog',

  mixins: [
    React.addons.LinkedStateMixin,
    Reflux.connect(ClassesStore),
    DialogFormMixin,
    ValidationMixin,
    FormMixin
  ],

  validatorConstraints: {
    description: {
    },
  },

  getInitialState: function() {
    return {
      description       : '',
      name              : '',
    }
  },

  clearData: function() {
    this.setState({
      description       : '',
      name              : '',
      schema            : '{}',
      errors            : {}
    })
  },
  componentWillUpdate: function() {
    console.log('ClassesAddDialog::componentWillUpdate');
  },

  editShow: function() {
    var checkedItem = ClassesStore.getCheckedItem();
    if (checkedItem) {
      this.setState({
          name        : checkedItem.name,
          description : checkedItem.description,
          schema      : checkedItem.schema
      });
    }
  },

  handleAddSubmit: function () {
    ClassesActions.createClass({
      name        : this.state.name,
      description : this.state.description,
      schema      : this.state.schema
    });
  },

  handleEditSubmit: function () {
    ClassesActions.updateClass(
      this.state.name, {
        description : this.state.description,
        schema      : this.state.schema
      }
    );
  },


  render: function () {
    var title = this.props.mode === 'edit' ? 'Edit': 'Add';
    var submitLabel = 'Confirm';

    var dialogStandardActions = [
      {text: 'Cancel', onClick: this.handleCancel, ref: 'cancel'},
      {text: {submitLabel}, onClick: this.handleSubmit, ref: 'submit'}
    ];

    return (
      <Dialog
        ref             = "dialogRef"
        title           = {title + " Class"}
        openImmediately = {this.props.openImmediately}
        actions         = {dialogStandardActions}
        modal={true}>
        <div>
        <form
          onSubmit      = {this.handleSubmit}
          acceptCharset = "UTF-8"
          method        = "post">

          <TextField
            ref               = "name"
            name              = "name"
            style             = {{width:'100%'}}
            valueLink         = {this.linkState('name')}
            errorText         = {this.getValidationMessages('name').join(' ')}
            hintText          = "Name of the Class"
            floatingLabelText = "Name" />

          <TextField
            ref               = "description"
            name              = "description"
            style             = {{width:'100%'}}
            valueLink         = {this.linkState('description')}
            errorText         = {this.getValidationMessages('description').join(' ')}
            hintText          = "Description of the Class"
            floatingLabelText = "Description" />

          <TextField
            ref               = "schema"
            name              = "schema"
            style             = {{width:'100%'}}
            valueLink         = {this.linkState('schema')}
            errorText         = {this.getValidationMessages('schema').join(' ')}
            hintText          = "Schema of the Class"
            floatingLabelText = "Schema" />

        </form>
        </div>
      </Dialog>
    );
  }

});
