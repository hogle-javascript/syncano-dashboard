var React               = require('react'),
    Reflux              = require('reflux'),

    // Utils
    DialogMixin         = require('../../mixins/DialogMixin'),
    FormMixin           = require('../../mixins/FormMixin'),
    Show                = require('../../common/Show/Show.react'),

    // Stores and Actions
    DataViewsActions    = require('./DataViewsActions'),
    DataViewDialogStore = require('./DataViewDialogStore'),
    ClassesActions    = require('../Classes/ClassesActions'),
    ClassesStore    = require('../Classes/ClassesStore'),

    // Components
    mui                 = require('material-ui'),
    Toggle              = mui.Toggle,
    Checkbox            = mui.Checkbox,
    TextField           = mui.TextField,
    SelectField         = mui.SelectField,
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
    }
  },

  handleDialogShow: function() {
    console.info('DataViewDialog::handleDialogShow');
    ClassesActions.fetch();
  },

  formatFields: function() {
    var showFieldsString   = '',
        expandFieldsString = '';

    Object.keys(this.state.showFields).map(function(field) {
      if (this.state.showFields[field]) {
        showFieldsString = showFieldsString + field + ',';
        if (this.state.expandFields[field]) {
          expandFieldsString = expandFieldsString + field + ',';
        }
      }
    }.bind(this));
    return {
      showFieldsString   : showFieldsString,
      expandFieldsString : expandFieldsString
    }
  },

  handleAddSubmit: function() {
    var fields             = this.formatFields(),
        showFieldsString   = fields.showFieldsString,
        expandFieldsString = fields.expandFieldsString;

    DataViewsActions.createDataView({
      name        : this.state.name,
      'class'     : this.state.class,
      description : this.state.description,
      order_by    : this.state.order_by,
      page_size   : this.state.page_size,
      fields      : showFieldsString,
      expand      : expandFieldsString
    });
  },

  handleEditSubmit: function() {
    DataViewsActions.updateDataView(
      this.state.id, {
        name    : this.state.name,
        crontab : this.state.crontab,
        codebox : this.state.codebox
      }
    );
  },

  handleToggle: function(fieldsType, fieldName, event, value) {
    console.info('DataViewDialog::handleToggle');

    var fields   = this.state[fieldsType],
        newState = {};

    fields[fieldName] = value;
    newState[fieldsType] = fields;

    this.setState(newState);
  },

  renderFields: function() {
    console.info('DataViewDialog::renderFields', this.state.class);

    var fields = [
      <div className='row' style={{marginBottom: 20}}>
        <div className='col-flex-1'>Class Fields</div>
        <div className='col-xs-8'>Expand</div>
      </div>],
        _this  = this;

    if (this.state.class) {
      return fields.concat(ClassesStore.getClassFields(this.state.class).map(function(field) {
        return (
          <div className='row'>
            <div className='col-flex-1'>
              <Toggle
                key            = {field.name}
                name           = {field.name}
                value          = {field.name}
                label          = {field.name}
                defaultToggled = {this.state.showFields[field.name]}
                onToggle       = {_this.handleToggle.bind(this, 'showFields', field.name)}
              />
            </div>
            <div className='col-xs-8'>
              <Show if={field.type === 'reference'}>
                <Checkbox
                  name           = "expand"
                  defaultChecked = {0}
                  disabled       = {!this.state.showFields[field.name]}
                  onCheck        = {_this.handleToggle.bind(this, 'expandFields', field.name)}
                />
              </Show>
            </div>

          </div>
        )
      }.bind(this)))
    }
  },

  renderOptions: function() {
    console.info('DataViewDialog::renderOrderBy', this.state.class);

    return [
      <div>Response options</div>,
      <SelectField
        ref               = "order_by"
        name              = "order_by"
        floatingLabelText = "Order by"
        fullWidth         = {true}
        valueLink         = {this.linkState('order_by')}
        errorText         = {this.getValidationMessages('class').join(' ')}
        valueMember       = "payload"
        displayMember     = "text"
        menuItems         = {ClassesStore.getClassOrderFieldsPayload(this.state.class)} />,

      <TextField
          ref               = 'page_size'
          name              = 'page_size'
          fullWidth         = {true}
          valueLink         = {this.linkState('page_size')}
          errorText         = {this.getValidationMessages('page_size').join(' ')}
          hintText          = 'Number'
          floatingLabelText = 'Number of records in data set' />
    ]
  },

  render: function() {
    console.log('XXX', this.state);
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

    var fields    = null,
        options   = null;

    if (this.state.class) {
      fields    = this.renderFields();
      options   = this.renderOptions();
    }

    return (
      <Dialog
        ref             = 'dialog'
        title           = {title + ' Data Endpoint'}
        openImmediately = {this.props.openImmediately}
        actions         = {dialogStandardActions}
        onShow          = {this.handleDialogShow}
        modal           = {true}>
        <div>
          {this.renderFormNotifications()}

          <div>Main settings</div>
           <div className='row'>

              <div className='col-xs-8'>
                <TextField
                  ref               = 'name'
                  name              = 'name'
                  fullWidth         = {true}
                  valueLink         = {this.linkState('name')}
                  errorText         = {this.getValidationMessages('name').join(' ')}
                  hintText          = 'Name of the endpoint'
                  floatingLabelText = 'Endpoint' />
              </div>

              <div className='col-flex-1' style={{paddingLeft: 15}}>
                <TextField
                    ref               = 'description'
                    name              = 'description'
                    fullWidth         = {true}
                    valueLink         = {this.linkState('description')}
                    errorText         = {this.getValidationMessages('description').join(' ')}
                    hintText          = 'Description of the endpoint'
                    floatingLabelText = 'Description' />
              </div>

            </div>
            <div className='row'>
              <div className='col-flex-1'>
                <SelectField
                    ref               = "class"
                    name              = "class"
                    fullWidth         = {true}
                    floatingLabelText = "Class"
                    valueLink         = {this.linkState('class')}
                    errorText         = {this.getValidationMessages('class').join(' ')}
                    valueMember       = "payload"
                    displayMember     = "text"
                    menuItems         = {this.state.classes} />
                </div>
            </div>

          <div className="row" style={{marginTop: 30}}>

            <div className="col-flex-1">
              {fields}
            </div>
            <div className="col-flex-1" style={{paddingLeft: 40}}>
              {options}
            </div>

          </div>

        </div>
      </Dialog>
    );
  }

});

