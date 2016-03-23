import React from 'react';
import Reflux from 'reflux';

// Utils
import {DialogMixin, FormMixin} from '../../mixins';

// Stores and Actions
import Actions from './DataEndpointsActions';
import Store from './DataEndpointDialogStore';
import ClassesActions from '../Classes/ClassesActions';
import ClassesStore from '../Classes/ClassesStore';

// Components
import {TextField, Toggle, Checkbox} from 'syncano-material-ui';
import {SelectFieldWrapper, Show} from 'syncano-components';
import {Dialog} from '../../common';

export default React.createClass({
  displayName: 'DataEndpointDialog',

  mixins: [
    Reflux.connect(Store),
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

  isEnabled(list, field) {
    if (!list) {
      return false;
    }
    return list.replace(/ /g, '').split(',').indexOf(field) > -1;
  },

  handleDialogShow() {
    console.info('DataEndpointDialog::handleDialogShow');
    ClassesActions.fetch();
  },

  handleAddSubmit() {
    const {name, description, order_by, page_size, excluded_fields, expand} = this.state;

    Actions.createDataEndpoint({
      name,
      class: this.state.class,
      description,
      order_by,
      page_size,
      excluded_fields,
      expand
    });
  },

  handleEditSubmit() {
    const {description, order_by, page_size, excluded_fields, expand} = this.state;

    Actions.updateDataEndpoint(
      this.state.name, {
        class: this.state.class,
        description,
        order_by,
        page_size,
        excluded_fields,
        expand
      }
    );
  },

  handleToggle(fieldsType, fieldName, event, value) {
    console.info('DataEndpointDialog::handleToggle', arguments);

    let genList = (list, name, val) => {
      let arr = list.replace(/ /g, '').split(',').filter((listItem) => listItem);

      if (val) {
        arr.push(name);
      } else {
        arr = arr.filter((arrItem) => arrItem !== name);
      }

      return arr.join(',');
    };

    let fields = '';

    if (fieldsType === 'showFields') {
      fields = genList(this.state.excluded_fields, fieldName, !value);
      this.setState({excluded_fields: fields});
    }
    if (fieldsType === 'expandFields') {
      fields = genList(this.state.expand, fieldName, value);
      this.setState({expand: fields});
    }
  },

  renderFields() {
    console.info('DataEndpointDialog::renderFields', this.state.class);

    let fields = [
      <div className="row vp-3-b">
        <div className="col-flex-1">Class Fields</div>
        <div className="col-xs-8">Expand</div>
      </div>
    ];

    if (this.state.class) {
      return fields.concat(ClassesStore.getClassFields(this.state.class).map((field) => {
        return (
          <div className="row">
            <div className="col-flex-1">
              <Toggle
                key={field.name}
                name={field.name}
                value={field.name}
                label={field.name}
                defaultToggled={!this.isEnabled(this.state.excluded_fields, field.name)}
                onToggle={this.handleToggle.bind(this, 'showFields', field.name)}
                />
            </div>
            <div className="col-xs-8">
              <Show if={field.type === 'reference'}>
                <Checkbox
                  name="expand"
                  defaultChecked={this.isEnabled(this.state.expand, field.name)}
                  disabled={this.isEnabled(this.state.excluded_fields, field.name)}
                  onCheck={this.handleToggle.bind(this, 'expandFields', field.name)}
                  />
              </Show>
            </div>
          </div>
        );
      }));
    }
  },

  renderOptions() {
    console.info('DataEndpointDialog::renderOrderBy', this.state.class);
    let orderField = <div key="options_header" style={{paddingTop: '24px'}}>Add schema fields with order index</div>;
    const orderFields = ClassesStore.getClassOrderFieldsPayload(this.state.class);

    if (orderFields.length > 0) {
      orderField = (
        <SelectFieldWrapper
          name="order_by"
          floatingLabelText="Order by"
          options={orderFields}
          value={this.state.order_by}
          onChange={this.setSelectFieldValue.bind(null, 'order_by')}
          errorText={this.getValidationMessages('order_by').join(' ')}/>
      );
    }

    return [
      <div>Response options</div>,
      orderField,
      <TextField
        ref="page_size"
        name="page_size"
        fullWidth={true}
        valueLink={this.linkState('page_size')}
        errorText={this.getValidationMessages('page_size').join(' ')}
        hintText="Number"
        floatingLabelText="Number of records in data set"/>
    ];
  },

  render() {
    const title = this.hasEditMode() ? 'Edit' : 'Add';
    let fields = null;
    let options = null;

    if (this.state.class) {
      fields = this.renderFields();
      options = this.renderOptions();
    }

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={`${title} a Data Endpoint`}
        onRequestClose={this.handleCancel}
        open={this.state.open}
        isLoading={this.state.isLoading}
        actions={
          <Dialog.StandardButtons
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}/>
        }>
        {this.renderFormNotifications()}
        <div>Main settings</div>
        <div className="row">
          <div className="col-xs-12">
            <TextField
              ref="name"
              name="name"
              fullWidth={true}
              disabled={this.hasEditMode()}
              valueLink={this.linkState('name')}
              errorText={this.getValidationMessages('name').join(' ')}
              hintText="Data Endpoint's name"
              floatingLabelText="Name"/>
          </div>
          <div className="col-flex-1" style={{paddingLeft: 15}}>
            <TextField
              ref="description"
              name="description"
              fullWidth={true}
              valueLink={this.linkState('description')}
              errorText={this.getValidationMessages('description').join(' ')}
              hintText="Data Endpoint's description"
              floatingLabelText="Description (optional)"/>
          </div>
        </div>
        <div className="row vm-4-b">
          <div className="col-flex-1">
            <SelectFieldWrapper
              name="class"
              options={this.state.classes}
              value={this.state.class}
              onChange={this.setSelectFieldValue.bind(null, 'class')}
              errorText={this.getValidationMessages('class').join(' ')}/>
          </div>
        </div>
        <div className="row">
          <div className="col-flex-1">
            {fields}
          </div>
          <div className="col-flex-1" style={{paddingLeft: 40}}>
            {options}
          </div>
        </div>
      </Dialog.FullPage>
    );
  }
});
