var React            = require('react'),
    Reflux           = require('reflux'),

    // Utils
    DialogMixin      = require('../../mixins/DialogMixin'),
    FormMixin        = require('../../mixins/FormMixin'),
    Show             = require('../../common/Show/Show.react'),
    Constants        = require('../../constants/Constants'),

    // Stores and Actions
    ClassesActions   = require('./ClassesActions'),
    ClassDialogStore = require('./ClassDialogStore'),
    ClassesStore     = require('./ClassesStore'),

    // Components
    mui              = require('material-ui'),
    TextField        = mui.TextField,
    Checkbox         = mui.Checkbox,
    FlatButton       = mui.FlatButton,
    DropDownMenu     = mui.DropDownMenu,
    SelectField      = mui.SelectField,
    Dialog           = mui.Dialog;

module.exports = React.createClass({

  displayName: 'ClassDialog',

  mixins: [
    React.addons.LinkedStateMixin,
    Reflux.connect(ClassDialogStore),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints: {
    name: {
      presence: true
    }
  },

  componentDidUpdate: function() {
    if (!this.state.schemaInitialized && this.state.schema) {
      this.setFields(this.state.schema);
      this.setState({
        schemaInitialized: true
      });
    }
  },

  getFieldTypes: function() {
    return Constants.fieldTypes.map(function(item) {
      return {
        payload : item,
        text    : item
      }
    });
  },

  setFields: function(schema) {
    var fields = this.state.fields;

    schema.map(function(item) {
      fields.push({
        fieldName   : item.name,
        fieldType   : item.type,
        fieldTarget : item.target,
        fieldOrder  : item.order_index,
        fieldFilter : item.filter_index
      });
    });

    return fields;
  },

  getSchema: function() {
    return JSON.stringify(this.state.fields.map(function(item) {
      var schema =  {
        name   : item.fieldName,
        type   : item.fieldType,
        target : item.fieldTarget
      };

      if (item.fieldOrder) {
        schema.order_index = item.fieldOrder;
      }

      if (item.fieldFilter) {
        schema.filter_index = item.fieldFilter;
      }
      return schema;
    }));
  },

  handleAddSubmit: function() {
    var schema = this.getSchema();

    if (schema.length < 1) {
      this.setState({feedback: 'You need to add at least one field!'});
      return;
    }
    ClassesActions.createClass({
      name        : this.state.name,
      description : this.state.description,
      schema      : schema
    });
  },

  handleEditSubmit: function() {
    ClassesActions.updateClass(
      this.state.name, {
        description : this.state.description,
        schema      : this.getSchema()
      }
    );
  },

  handleFieldAdd: function() {

    if (!this.state.fieldName) {
      return;
    }

    var fields = this.state.fields;

    fields.push({
      fieldName   : this.state.fieldName,
      fieldType   : this.state.fieldType,
      fieldTarget : this.state.fieldTarget,
      fieldOrder  : this.refs.fieldOrder ? this.refs.fieldOrder.isChecked() : null,
      fieldFilter : this.refs.fieldFilter ? this.refs.fieldFilter.isChecked() : null
    });

    this.refs.fieldOrder ? this.refs.fieldOrder.setChecked() : null;
    this.refs.fieldFilter ? this.refs.fieldFilter.setChecked() : null;

    this.setState({
      fields    : fields,
      fieldName : ''
    })
  },

  handleRemoveField: function(item) {
    var fields = [];
    this.state.fields.map(function(field) {

      console.log(field.fieldName, item.fieldName);

      if (field.fieldName !== item.fieldName) {
        fields.push(field);
      }
    });
    this.setState({fields: fields});
  },

  handleOnCheck: function(item, event) {
    var newFields = this.state.fields.map(function(field) {
      if (field.fieldName === item.fieldName) {
        if (event.target.name === 'order') {
          field.fieldOrder = event.target.checked;
        } else if (event.target.name === 'filter')
          field.fieldFilter = event.target.checked;
      }
      return field;
    });
    this.setState({fields: newFields});
  },

  renderSchemaFields: function() {
    return this.state.fields.map(function(item) {

      return (
        <div key={item.fieldName} className='row'>
          <span className='col-xs-8' style={{marginTop: 5}}>{item.fieldName}</span>
          <span className='col-xs-8' style={{paddingLeft: 15, marginTop: 5}}>{item.fieldType}</span>
          <span className='col-xs-8' style={{paddingLeft: 15, marginTop: 5}}>{item.fieldTarget}</span>
          <span className='col-xs-3' style={{paddingLeft: 15}}>
            <Show if={this.hasFilter(item.fieldType)}>
              <Checkbox
                style          = {{marginTop: 5}}
                name           = "filter"
                defaultChecked = {item.fieldFilter}
                onCheck         = {this.handleOnCheck.bind(this, item)}
              />
            </Show>
          </span>
          <span className='col-xs-3' style={{paddingLeft: 15}}>
            <Show if={this.hasOrder(item.fieldType)}>
              <Checkbox
                style           = {{marginTop: 5}}
                name            = "order"
                defaultChecked  = {item.fieldOrder}
                onCheck         = {this.handleOnCheck.bind(this, item)}
              />
            </Show>
          </span>
          <span className='col-xs-5' style={{paddingLeft: 15}}>
            <FlatButton
              style     = {{marginTop: 5}}
              label     = 'Remove'
              secondary = {true}
              onClick   = {this.handleRemoveField.bind(this, item)} />
          </span>
        </div>
      )
    }.bind(this));
  },

  hasFilter: function(fieldType) {
    var noFilterFields = ['file', 'text'];
    return noFilterFields.indexOf(fieldType) < 0 ? true : false;
  },

  hasOrder: function(fieldType) {
    var noOrderFields = ['file', 'text'];
    return noOrderFields.indexOf(fieldType) < 0 ? true : false;
  },

  render: function() {
    var title                 = this.hasEditMode() ? 'Edit' : 'Add',
        submitLabel           = 'Confirm',
        dialogStandardActions = [
          {
            ref      : 'cancel',
            text     : 'Cancel',
            onClick  : this.handleCancel
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
        title           = {title + ' Class'}
        openImmediately = {this.props.openImmediately}
        actions         = {dialogStandardActions}
        onDismiss       = {this.resetDialogState}>

        {this.renderFormNotifications()}

            <div className='row'>

              <div className='col-xs-8'>
                <TextField
                  ref               = 'name'
                  name              = 'name'
                  disabled          = {this.hasEditMode()}
                  style             = {{width:'100%'}}
                  valueLink         = {this.linkState('name')}
                  errorText         = {this.getValidationMessages('name').join(' ')}
                  hintText          = 'Name of the Class'
                  floatingLabelText = 'Name' />
              </div>

              <div className='col-xs-26' style={{paddingLeft: 15}}>
                <TextField
                  ref               = 'description'
                  name              = 'description'
                  style             = {{width:'100%'}}
                  valueLink         = {this.linkState('description')}
                  errorText         = {this.getValidationMessages('description').join(' ')}
                  hintText          = 'Description of the Class'
                  floatingLabelText = 'Description' />
              </div>

            </div>

            <div style={{marginTop: 30}}>Schema</div>

            {this.getValidationMessages('schema').join(' ')}

              <div className='row'>
                <div className='col-xs-8'>
                </div>
                <div className='col-xs-8' style={{paddingLeft: 15}}>
                </div>
                <div className='col-xs-8' style={{paddingLeft: 15}}>
                </div>
                <div className='col-xs-3' style={{paddingLeft: 15}}>
                  Filter
                </div>
                <div className='col-xs-3' style={{paddingLeft: 15}}>
                  Order
                </div>
                <div className='col-xs-5' style={{paddingLeft: 15}}>
                </div>
              </div>

              <div className='row'>
                <div className='col-xs-8'>
                   <TextField
                    ref               = 'fieldName'
                    name              = 'fieldName'
                    style             = {{width:'100%'}}
                    valueLink         = {this.linkState('fieldName')}
                    errorText         = {this.getValidationMessages('fieldName').join(' ')}
                    hintText          = 'Name of the Field'
                    floatingLabelText = 'Name' />
                </div>
                <div className='col-xs-8' style={{paddingLeft: 15}}>
                  <SelectField
                      ref               = 'fieldType'
                      name              = 'fieldType'
                      floatingLabelText = 'Type'
                      style             = {{width:'100%'}}
                      valueLink         = {this.linkState('fieldType')}
                      errorText         = {this.getValidationMessages('fieldType').join(' ')}
                      valueMember       = 'payload'
                      displayMember     = 'text'
                      menuItems         = {this.getFieldTypes()} />
                </div>
                <div className='col-xs-8' style={{paddingLeft: 15}}>
                  <Show if={this.state.fieldType === 'reference'}>
                    <SelectField
                      ref               = 'fieldTarget'
                      name              = 'fieldTarget'
                      floatingLabelText = 'Target Class'
                      fullWidth         = {true}
                      valueLink         = {this.linkState('fieldTarget')}
                      errorText         = {this.getValidationMessages('fieldTarget').join(' ')}
                      valueMember       = 'payload'
                      displayMember     = 'text'
                      menuItems         = {ClassesStore.getClassesDropdown()} />
                  </Show>
                </div>
                <div className='col-xs-3' style={{paddingLeft: 15}}>
                  <Show if={this.hasFilter(this.state.fieldType)}>
                    <Checkbox
                      style = {{marginTop: 35}}
                      ref   = "fieldFilter"
                      name  = "filter"/>
                  </Show>
                </div>
                <div className='col-xs-3' style={{paddingLeft: 15}}>
                  <Show if={this.hasOrder(this.state.fieldType)}>
                    <Checkbox
                      style = {{marginTop: 35}}
                      ref   = "fieldOrder"
                      name  = "order"/>
                  </Show>
                </div>
                <div className='col-xs-5' style={{paddingLeft: 15}}>
                  <FlatButton
                    style     = {{marginTop: 35}}
                    label     = 'Add'
                    disabled  = {!this.state.fieldType || !this.state.fieldName}
                    secondary = {true}
                    onClick   = {this.handleFieldAdd} />
                </div>
              </div>

              <div style={{marginTop: 15}}>{this.renderSchemaFields()}</div>

      </Dialog>
    );
  }

});
