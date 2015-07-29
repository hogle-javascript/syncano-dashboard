import React from 'react';
import Reflux from 'reflux';

// Utils
import Mixins from '../../mixins';

// Stores and Actions
import DataViewsActions from './DataViewsActions';
import DataViewDialogStore from './DataViewDialogStore';
import ClassesActions from '../Classes/ClassesActions';
import ClassesStore from '../Classes/ClassesStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'DataViewDialog',

  mixins: [
    Reflux.connect(DataViewDialogStore),
    React.addons.LinkedStateMixin,
    Mixins.Dialog,
    Mixins.Form
  ],

  validatorConstraints: {
    name: {
      presence: true
    },
    class: {
      presence: true
    }
  },

  handleDialogShow() {
    console.info('DataViewDialog::handleDialogShow');
    ClassesActions.fetch();
  },

  handleAddSubmit() {
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

  handleEditSubmit() {
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

  handleToggle(fieldsType, fieldName, event, value) {
    console.info('DataViewDialog::handleToggle', arguments);

    let genList = (list, fieldName, value) => {
      let arr = list.replace(/ /g, '').split(',').filter(n => n);

      if (value) {
        arr.push(fieldName);
      } else {
        arr = arr.filter(n => n != fieldName );
      }

      return arr.join(',');
    };

    let fields = '';
    if (fieldsType === 'showFields') {
      fields = genList(this.state.fields, fieldName, value);
      this.setState({fields: fields});
    }
    if (fieldsType === 'expandFields') {
      fields = genList(this.state.expand, fieldName, value);
      this.setState({expand: fields});
    }
  },

  isEnabled(list, field) {
    if (!list) {
      return;
    }
    return list.replace(/ /g, '').split(',').indexOf(field) > -1;
  },

  renderFields() {
    console.info('DataViewDialog::renderFields', this.state.class);

    let fields = [
      <div className='row' style={{marginBottom: 20}}>
        <div className='col-flex-1'>Class Fields</div>
        <div className='col-xs-8'>Expand</div>
      </div>],
        _this  = this;

    if (this.state.class) {
      return fields.concat(ClassesStore.getClassFields(this.state.class).map(field => {
        return (
          <div className='row'>
            <div className='col-flex-1'>
              <MUI.Toggle
                key            = {field.name}
                name           = {field.name}
                value          = {field.name}
                label          = {field.name}
                defaultToggled = {_this.isEnabled(_this.state.fields, field.name)}
                onToggle       = {_this.handleToggle.bind(_this, 'showFields', field.name)}
              />
            </div>
            <div className='col-xs-8'>
              <Common.Show if={field.type === 'reference'}>
                <MUI.Checkbox
                  name           = "expand"
                  defaultChecked = {_this.isEnabled(_this.state.expand, field.name)}
                  disabled       = {!_this.isEnabled(_this.state.fields, field.name)}
                  onCheck        = {_this.handleToggle.bind(_this, 'expandFields', field.name)}
                />
              </Common.Show>
            </div>
          </div>
        )
      }))
    }
  },

  renderOptions() {
    console.info('DataViewDialog::renderOrderBy', this.state.class);

    return [
      <div>Response options</div>,
      <MUI.SelectField
        ref               = "order_by"
        name              = "order_by"
        floatingLabelText = "Order by"
        fullWidth         = {true}
        valueLink         = {this.linkState('order_by')}
        errorText         = {this.getValidationMessages('class').join(' ')}
        valueMember       = "payload"
        displayMember     = "text"
        menuItems         = {ClassesStore.getClassOrderFieldsPayload(this.state.class)} />,
      <MUI.TextField
        ref               = 'page_size'
        name              = 'page_size'
        fullWidth         = {true}
        valueLink         = {this.linkState('page_size')}
        errorText         = {this.getValidationMessages('page_size').join(' ')}
        hintText          = 'Number'
        floatingLabelText = 'Number of records in data set' />
    ]
  },

  render() {
    let title       = this.hasEditMode() ? 'Edit' : 'Add',
        submitLabel = this.hasEditMode() ? 'Save changes' : 'Create',
        dialogStandardActions = [
          {
            ref        : 'cancel',
            text       : 'Cancel',
            onTouchTap : this.handleCancel
          },
          {
            ref        : 'submit',
            text       : {submitLabel},
            onTouchTap : this.handleFormValidation
          }
        ];

    let fields    = null,
        options   = null;

    if (this.state.class) {
      fields    = this.renderFields();
      options   = this.renderOptions();
    }

    return (
      <Common.Dialog
        ref             = 'dialog'
        title           = {title + ' Data Endpoint'}
        openImmediately = {this.props.openImmediately}
        actions         = {dialogStandardActions}
        onShow          = {this.handleDialogShow}
        onDismiss       = {this.resetDialogState}
        modal           = {true}>
        <div>
          {this.renderFormNotifications()}
          <div>Main settings</div>
          <div className='row'>
            <div className='col-xs-12'>
              <MUI.TextField
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
              <MUI.TextField
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
              <MUI.SelectField
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
      </Common.Dialog>
    );
  }
});

