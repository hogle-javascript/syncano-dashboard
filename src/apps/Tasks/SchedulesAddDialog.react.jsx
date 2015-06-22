var React            = require('react'),
    Reflux           = require('reflux'),

    // Utils
    ValidationMixin  = require('../../mixins/ValidationMixin'),
    DialogFormMixin  = require('../../mixins/DialogFormMixin'),
    FormMixin        = require('../../mixins/FormMixin'),

    // Stores and Actions
    SchedulesActions = require('./SchedulesActions'),
    SchedulesStore   = require('./SchedulesStore'),
    CodeBoxesStore   = require('../CodeBoxes/CodeBoxesStore'),

    // Components
    mui              = require('material-ui'),
    Toggle           = mui.Toggle,
    TextField        = mui.TextField,
    DropDownMenu     = mui.DropDownMenu,
    Dialog           = mui.Dialog;


module.exports = React.createClass({

  displayName: 'SchedulesAddDialog',

  mixins: [
    Reflux.connect(SchedulesStore),
    Reflux.connect(CodeBoxesStore, 'codeboxes'),
    React.addons.LinkedStateMixin,
    DialogFormMixin,
    ValidationMixin,
    FormMixin
  ],

  validatorConstraints: {
    label: {
      presence: true
    }
  },

  clearData: function() {
    this.setState({
      email  : '',
      errors : {}
    })
  },

  editShow: function() {
    var checkedItem = SchedulesStore.getCheckedItem();
    if (checkedItem) {
      this.setState({
          id      : checkedItem.id,
          label   : checkedItem.label,
          crontab : checkedItem.crontab,
          codebox : checkedItem.codebox
      });
    }
  },

  handleAddSubmit: function () {
    SchedulesActions.createSchedule({
      label    : this.state.label,
      crontab  : this.state.crontab,
      codebox  : this.state.codebox
    });
  },

  handleEditSubmit: function () {
    SchedulesActions.updateSchedule(
      this.state.id, {
        label    : this.state.label,
        crontab  : this.state.crontab,
        codebox  : this.state.codebox
      }
    );
  },

  handleCodeBoxChange: function (event, selectedIndex, menuItem){
    console.log('SchedulesAddDialog:handleCodeBoxChange');
    this.setState({codebox: menuItem.payload});
  },

  handleCrontabChange: function (event, selectedIndex, menuItem){
    console.log('SchedulesAddDialog:handleCrontabChange');
    this.setState({crontab: menuItem.payload});
  },

  render: function () {
    var title       = this.props.mode === 'edit' ? 'Edit': 'Add',
        submitLabel = this.props.mode === 'edit' ? 'Save changes': 'Create',

        dialogStandardActions = [
          {
            ref     : 'cancel',
            text    : 'Cancel',
            onClick : this.handleCancel
          },
          {
            ref     : 'submit',
            text    : {submitLabel},
            onClick : this.handleFormValidation
          }
        ],
        // TODO: move it to the store
        menuItems = [
          {
            payload: 'read',
            text: 'read'
          },
          {
            payload: 'write',
            text: 'write'
          },
          {
            payload: 'full',
            text: 'full'
          }
        ],

        crontabItems = [
          {
            payload: '*/5 * * *',
            text: 'Each 5 minutes'
          },
          {
            payload: '0 * * * *',
            text: 'Each round hour'
          },
        ];

    var cb = [{payload: 'dummy', text: 'loading...'}];
    if (this.state.codeboxes.items.length > 0) {
        cb = CodeBoxesStore.getCodeBoxesDropdown();
    }

    var codeBoxSelectedIndex = 0;
    if (this.state.codebox) {
      codeBoxSelectedIndex = CodeBoxesStore.getCodeBoxIndex(this.state.codebox);
    }

    return (
      <Dialog
        ref             ="dialogRef"
        title           ={title + " Schedule"}
        openImmediately ={this.props.openImmediately}
        actions         ={dialogStandardActions}
        modal           ={true}>
        <div>
          {this.renderFormNotifications()}
          <form
            onSubmit      = {this.handleFormValidation}
            acceptCharset = "UTF-8"
            method        = "post">

            <TextField
              ref               = "label"
              name              = "label"
              style             = {{width:'100%'}}
              valueLink         = {this.linkState('label')}
              errorText         = {this.getValidationMessages('label').join()}
              hintText          = "Label of the schedule"
              floatingLabelText = "Label" />

            <DropDownMenu
              ref               = "codebox"
              name              = "codebox"
              selectedIndex     = {codeBoxSelectedIndex}
              autoWidth         = {true}
              floatingLabelText = "CodeBox"
              style             = {{width:500}}
              onChange          = {this.handleCodeBoxChange}
              menuItems         = {cb} />

            <DropDownMenu
              ref               = "crontab"
              name              = "crontab"
              autoWidth         = {true}
              floatingLabelText = "CodeBox"
              style             = {{width:500}}
              onChange          = {this.handleCrontabChange}
              menuItems         = {crontabItems} />
          </form>
        </div>
      </Dialog>
    );
  }

});

