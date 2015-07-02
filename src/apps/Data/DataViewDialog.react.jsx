var React               = require('react'),
    Reflux              = require('reflux'),

    // Utils
    DialogMixin         = require('../../mixins/DialogMixin'),
    FormMixin           = require('../../mixins/FormMixin'),

    // Stores and Actions
    DataViewsActions    = require('./DataViewsActions'),
    DataViewDialogStore = require('./DataViewDialogStore'),
    ClassesActions    = require('../Classes/ClassesActions'),
    ClassesStore    = require('../Classes/ClassesStore'),

    // Components
    mui                 = require('material-ui'),
    Toggle              = mui.Toggle,
    TextField           = mui.TextField,
    SelectField         = mui.SelectField,
    Toggle              = mui.Toggle,
    Dialog              = mui.Dialog;

module.exports = React.createClass({

  displayName: 'DataViewDialog',

  mixins: [
    Reflux.connect(DataViewDialogStore),
    React.addons.LinkedStateMixin,
    DialogMixin,
    FormMixin
  ],

  validatorConstraints: {
    name: {
      presence: true
    },
    class: {
      presence: true
    },
  },

  handleDialogShow: function() {
    console.info('DataViewDialog::handleDialogShow');
    ClassesActions.fetch();
  },

  handleAddSubmit: function() {
    DataViewsActions.createDataView({
      name        : this.state.name,
      'class'     : this.state.class,
      description : this.state.description
    });
  },

  handleEditSubmit: function() {
    DataViewsActions.updateDataView(
      this.state.id, {
        name    : this.state.name,
        crontab  : this.state.crontab,
        codebox  : this.state.codebox
      }
    );
  },

  renderFields: function() {
    console.info('DataViewDialog::renderFields');

    var fields = [<div>Filds available in this view:</div>];

    if (this.state.class) {
      return fields.concat(ClassesStore.getClassFields(this.state.class).map(function(field) {
        return (
          <Toggle
            key={field.name}
            name={field.name}
            value={field.name}
            label={field.name}
          />
        )
      }))
    }
  },

  //renderOrderBy: function() {
  //  if (this.state.class) {
  //    return (
  //      <SelectField
  //        ref="orderby"
  //        name="orderby"
  //        floatingLabelText="Order by"
  //        fullWidth={true}
  //        valueLink={this.linkState('orderby')}
  //        errorText={this.getValidationMessages('class').join(' ')}
  //        valueMember="payload"
  //        displayMember="text"
  //        menuItems={[{text: 'name', payload: 'name'},{text: 'name2', payload: 'text2'}]}/>
  //    )
  //  }
  //},

  renderOrderBy: function() {
    if (this.state.class) {
      return [

        <SelectField
          ref="orderby"
          name="orderby"
          floatingLabelText="Order by"
          fullWidth={true}
          valueLink={this.linkState('orderby')}
          errorText={this.getValidationMessages('class').join(' ')}
          valueMember="payload"
          displayMember="text"
          menuItems={[{text: 'name (ascending)', payload: 'name'},{text: 'name (decending)', payload: 'text2'}]}/>,

        <TextField
            ref               = 'page_size'
            name              = 'page_size'
            fullWidth         = {true}
            valueLink         = {this.linkState('page_size')}
            errorText         = {this.getValidationMessages('page_size').join(' ')}
            hintText          = 'Number'
            floatingLabelText = 'Number of records in data set' />

      ]
    }
  },

  render: function() {
    var title       = this.hasEditMode() ? 'Edit' : 'Add',
        submitLabel = this.hasEditMode() ? 'Save changes' : 'Create',
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
        ref             = 'dialog'
        title           = {title + ' DataView'}
        openImmediately = {this.props.openImmediately}
        actions         = {dialogStandardActions}
        onShow          = {this.handleDialogShow}
        modal           = {true}>
        <div>
          {this.renderFormNotifications()}

          <TextField
            ref               = 'name'
            name              = 'name'
            fullWidth         = {true}
            valueLink         = {this.linkState('name')}
            errorText         = {this.getValidationMessages('name').join(' ')}
            hintText          = 'Name of the endpoint'
            floatingLabelText = 'Endpoint' />

          <TextField
            ref               = 'description'
            name              = 'description'
            fullWidth         = {true}
            valueLink         = {this.linkState('description')}
            errorText         = {this.getValidationMessages('description').join(' ')}
            hintText          = 'Description of the endpoint'
            floatingLabelText = 'Description' />

          <SelectField
            ref               = "class"
            name              = "class"
            floatingLabelText = "Class"
            valueLink         = {this.linkState('class')}
            errorText         = {this.getValidationMessages('class').join(' ')}
            valueMember       = "payload"
            displayMember     = "text"
            menuItems         = {this.state.classes} />

          <div className="row" style={{marginTop: 20}}>
            <div className="col-xs-14">
              {this.renderFields()}
            </div>

            <div className="col-xs-14">
              {this.renderOrderBy()}
            </div>

          </div>

        </div>
      </Dialog>
    );
  }

});

