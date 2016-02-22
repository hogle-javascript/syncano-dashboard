import React from 'react';
import Reflux from 'reflux';

// Utils
import {DialogMixin, FormMixin} from '../../mixins';

// Stores and Actions
import Actions from './DataViewsActions';
import Store from './DataViewDialogStore';
import ClassesActions from '../Classes/ClassesActions';
import ClassesStore from '../Classes/ClassesStore';

// Components
import {TextField, FlatButton, RaisedButton, Toggle, Checkbox} from 'syncano-material-ui';
import {SelectFieldWrapper, Show} from 'syncano-components';
import {Dialog} from '../../common';

export default React.createClass({
  displayName: 'DataViewDialog',

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
    console.info('DataViewDialog::handleDialogShow');
    ClassesActions.fetch();
  },

  handleAddSubmit() {
    Actions.createDataView({
      name: this.state.name,
      class: this.state.class,
      description: this.state.description,
      order_by: this.state.order_by,
      page_size: this.state.page_size,
      fields: this.state.fields,
      expand: this.state.expand
    });
  },

  handleEditSubmit() {
    Actions.updateDataView(
      this.state.name, {
        class: this.state.class,
        description: this.state.description,
        order_by: this.state.order_by,
        page_size: this.state.page_size,
        fields: this.state.fields,
        expand: this.state.expand
      }
    );
  },

  handleToggle(fieldsType, fieldName, event, value) {
    console.info('DataViewDialog::handleToggle', arguments);

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
      fields = genList(this.state.fields, fieldName, value);
      this.setState({fields});
    }
    if (fieldsType === 'expandFields') {
      fields = genList(this.state.expand, fieldName, value);
      this.setState({expand: fields});
    }
  },

  renderFields() {
    console.info('DataViewDialog::renderFields', this.state.class);

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
                defaultToggled={this.isEnabled(this.state.fields, field.name)}
                onToggle={this.handleToggle.bind(this, 'showFields', field.name)}
                />
            </div>
            <div className="col-xs-8">
              <Show if={field.type === 'reference'}>
                <Checkbox
                  name="expand"
                  defaultChecked={this.isEnabled(this.state.expand, field.name)}
                  disabled={!this.isEnabled(this.state.fields, field.name)}
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
    console.info('DataViewDialog::renderOrderBy', this.state.class);
    let orderField = <div key="options_header" style={{paddingTop: '24px'}}>Add schema fields with order index</div>;
    let orderFields = ClassesStore.getClassOrderFieldsPayload(this.state.class);

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
    let title = this.hasEditMode() ? 'Edit' : 'Create';
    let dialogStandardActions = [
      <FlatButton
        key="cancel"
        label="Cancel"
        onTouchTap={this.handleCancel}
        ref="cancel"/>,
      <RaisedButton
        key="confirm"
        label="Confirm"
        secondary={true}
        style={{marginLeft: 10}}
        onTouchTap={this.handleFormValidation}
        ref="submit"/>
    ];

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
        title={`${title} a Data Socket`}
        defaultOpen={this.props.defaultOpen}
        actions={dialogStandardActions}
        open={this.state.open}
        modal={true}>
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
              hintText="Name of the Socket"
              floatingLabelText="Socket"/>
          </div>
          <div className="col-flex-1" style={{paddingLeft: 15}}>
            <TextField
              ref="description"
              name="description"
              fullWidth={true}
              valueLink={this.linkState('description')}
              errorText={this.getValidationMessages('description').join(' ')}
              hintText="Description of the Socket"
              floatingLabelText="Description"/>
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

