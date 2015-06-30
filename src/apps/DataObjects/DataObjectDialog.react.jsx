var React                 = require('react'),
    Reflux                = require('reflux'),

    // Utils
    ValidationMixin       = require('../../mixins/ValidationMixin'),
    FormMixin             = require('../../mixins/FormMixin'),
    DialogMixin           = require('../../mixins/DialogMixin'),
    Show                  = require('../../common/Show/Show.react'),

    // Stores and Actions
    DataObjectsActions    = require('./DataObjectsActions'),
    DataObjectDialogStore = require('./DataObjectDialogStore'),
    DataObjectsStore      = require('./DataObjectsStore'),
    CodeBoxesStore        = require('../CodeBoxes/CodeBoxesStore'),

    // Components
    mui                   = require('material-ui'),
    Toggle                = mui.Toggle,
    TextField             = mui.TextField,
    DropDownMenu          = mui.DropDownMenu,
    Dialog                = mui.Dialog;


module.exports = React.createClass({

  displayName: 'DataObjectDialog',

  mixins: [
    React.addons.LinkedStateMixin,
    Reflux.connect(DataObjectDialogStore),
    Reflux.connect(DataObjectsStore, 'dataobjects'),
    ValidationMixin,
    FormMixin,
    DialogMixin
  ],

  validatorConstraints: function() {
    var validateObj = {};
    DataObjectsStore.getCurrentClassObj().schema.map(function(item) {
      if (item.type === 'integer') {
        validateObj[item.name] = {numericality: true}
      } else if (item.type === 'text') {
        validateObj[item.name] = {length: {maximum: 32000}}
      }
    });
    return validateObj;
  },

  handleAddSubmit: function() {
    var className = DataObjectsStore.getCurrentClassName();
    var payload = {};
    DataObjectsStore.getCurrentClassObj().schema.map(function(item) {
      payload[item.name] = this.state[item.name];
    }.bind(this));

    DataObjectsActions.createDataObject({className: className, payload: payload});
  },

  handleEditSubmit: function() {
    DataObjectsActions.updateDataObject(this.state.instance.id, {
      username : this.state.username,
      password : this.state.password
    });
  },

  renderCustomFields: function() {

    if (DataObjectsStore.getCurrentClassObj()) {

      return DataObjectsStore.getCurrentClassObj().schema.map(function(item) {
        if (item.type === 'boolean') {
          return (
            <SelectField
              ref               = {item.name}
              name              = {item.name}
              autoWidth         = {true}
              valueMember       = "payload"
              displayMember     = "text"
              floatingLabelText = {'Value of ' + item.name}
              errorText         = {this.getValidationMessages(item.name).join(' ')}
              menuItems         = {[{text: True, payload: true}, {text: 'False', payload: false}]} />
          )
        }

        return (
          <TextField
              ref               = {'field-' + item.name}
              name              = {item.name}
              valueLink         = {this.linkState(item.name)}
              errorText         = {this.getValidationMessages(item.name).join(' ')}
              hintText          = {'Field ' + item.name + ' (' + item.type + ')'}
              floatingLabelText = {item.name} />
        )
      }.bind(this))
    }
  },

  render: function() {
    var title       = this.hasEditMode() ? 'Edit' : 'Add',
        submitLabel = 'Confirm',

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
        ];

    return (
      <Dialog
        ref     = "dialog"
        title   = {title + ' Data Object (' + DataObjectsStore.getCurrentClassName() + ')'}
        actions = {dialogStandardActions}
        modal   = {true}>
        <div>
          {this.renderFormNotifications()}
          {this.renderCustomFields()}
        </div>
      </Dialog>
    );
  }

});
