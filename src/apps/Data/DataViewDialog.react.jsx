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

  handleAddSubmit: function() {

    DataViewsActions.createDataView({
      name        : this.state.name,
      'class'     : this.state.class,
      description : this.state.description,
      order_by    : this.state.order_by,
      page_size   : this.state.page_size,
      fields      : this.state.fields,
      expand      : this.state.expand
    });
  },

  handleEditSubmit: function() {
    DataViewsActions.updateDataView(
      this.state.name, {
        'class'     : this.state.class,
        description : this.state.description,
        order_by    : this.state.order_by,
        page_size   : this.state.page_size,
        fields      : this.state.fields,
        expand      : this.state.expand
      }
    );
  },

  handleToggle: function(fieldsType, fieldName, event, value) {
    console.info('DataViewDialog::handleToggle', arguments);

    var genList = function(list, fieldName, value) {
      var arr = list.replace(/ /g, '').split(',').filter(function(n) { return n });

      if (value) {
        arr.push(fieldName);
      } else {
        arr = arr.filter(function(n) { return n != fieldName });
      }

      return arr.join(',');
    };

    var fields = '';
    if (fieldsType === 'showFields') {
      fields = genList(this.state.fields, fieldName, value);
      this.setState({fields: fields});
    }
    if (fieldsType === 'expandFields') {
      fields = genList(this.state.expand, fieldName, value);
      this.setState({expand: fields});
    }
  },

  isEnabled: function(list, field) {
    if (!list) {
      return;
    }
    return list.replace(/ /g, '').split(',').indexOf(field) > -1;
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
                defaultToggled = {_this.isEnabled(_this.state.fields, field.name)}
                onToggle       = {_this.handleToggle.bind(_this, 'showFields', field.name)}
              />
            </div>
            <div className='col-xs-8'>
              <Show if={field.type === 'reference'}>
                <Checkbox
                  name           = "expand"
                  defaultChecked = {_this.isEnabled(_this.state.expand, field.name)}
                  disabled       = {!_this.isEnabled(_this.state.fields, field.name)}
                  onCheck        = {_this.handleToggle.bind(_this, 'expandFields', field.name)}
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
                  disabled          = {this.hasEditMode()}
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

