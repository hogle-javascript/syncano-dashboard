import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';

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
import {Dialog, Notification} from '../../common';

export default React.createClass({
  displayName: 'DataEndpointDialog',

  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints() {
    let validateObj = {
      name: {
        presence: true
      }
    };

    if (!this.state.new_class) {
      validateObj.class = {
        presence: true
      };
    }

    return validateObj;
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
    const {name, description, order_by, page_size, excluded_fields, expand, new_class} = this.state;

    if (new_class) {
      Actions.createDataEndpointWithClass({
        name,
        class: new_class,
        description,
        order_by,
        page_size,
        excluded_fields,
        expand
      });
    }
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

  handleClassChange(event, index, value) {
    this.setState({class: value, new_class: null});
  },

  handleNewClassChange(event) {
    const value = !_.isEmpty(event.target.value) ? event.target.value : null;

    this.setState({class: null, new_class: value});
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
                onToggle={this.handleToggle.bind(this, 'showFields', field.name)} />
            </div>
            <div className="col-xs-8">
              <Show if={field.type === 'reference'}>
                <Checkbox
                  name="expand"
                  defaultChecked={this.isEnabled(this.state.expand, field.name)}
                  disabled={this.isEnabled(this.state.excluded_fields, field.name)}
                  onCheck={this.handleToggle.bind(this, 'expandFields', field.name)} />
              </Show>
            </div>
          </div>
        );
      }));
    }
  },

  renderOptions() {
    console.info('DataEndpointDialog::renderOrderBy', this.state.class);
    const orderFields = ClassesStore.getClassOrderFieldsPayload(this.state.class);
    let orderField = (
      <div key="options_header" style={{paddingTop: 24, paddingBottom: 24}}>
        <Notification>Add schema fields with order index</Notification>
      </div>
    );

    if (orderFields.length) {
      orderField = (
        <SelectFieldWrapper
          name="order_by"
          floatingLabelText="Order by"
          options={orderFields}
          value={this.state.order_by}
          onChange={(event, index, value) => this.setSelectFieldValue('order_by', value)}
          errorText={this.getValidationMessages('order_by').join(' ')}/>
      );
    }

    return (
      <div>
        <div>Response options</div>
        {orderField}
        <TextField
          ref="page_size"
          name="page_size"
          fullWidth={true}
          valueLink={this.linkState('page_size')}
          errorText={this.getValidationMessages('page_size').join(' ')}
          hintText="Number"
          floatingLabelText="Number of records in data set"/>
      </div>
    );
  },

  render() {
    const title = this.hasEditMode() ? 'Edit' : 'Add';
    const {open, isLoading, canSubmit, classes, new_class} = this.state;
    const submitLabel = new_class ? 'Confirm and create a class' : 'Confirm';

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={`${title} a Data Endpoint`}
        onRequestClose={this.handleCancel}
        open={open}
        isLoading={isLoading}
        actions={
          <Dialog.StandardButtons
            disabled={!canSubmit}
            submitLabel={submitLabel}
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}/>
        }
        sidebar={
          <Dialog.SidebarBox>
            <Dialog.SidebarSection>
              With Data Endpoints you can configure Data Object calls and save them for later use.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection title="Class">
              Classes define properties of Data Objects. If you have no Classes yet you can create one&nbsp;
              <Dialog.SidebarLink to="classes">
                here.
              </Dialog.SidebarLink>
            </Dialog.SidebarSection>
            <Dialog.SidebarSection title="Class Fields">
              Choose which fields of Class schema will be included in the response. If a field is referencing
              Data Objects in a different Class, you can expand it to get those Data Objects proprerties.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection last={true}>
              <Dialog.SidebarLink to="http://docs.syncano.io/docs/endpoints-data">
                Learn more
              </Dialog.SidebarLink>
            </Dialog.SidebarSection>
          </Dialog.SidebarBox>
        }>
        {this.renderFormNotifications()}
        <Dialog.ContentSection>
          <div className="col-flex-1">
            <TextField
              ref="name"
              name="name"
              autoFocus={true}
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
        </Dialog.ContentSection>
        <Dialog.ContentSection style={{height: 72}}>
          <div className="col-flex-1">
            <SelectFieldWrapper
              name="class"
              options={classes}
              value={this.state.class}
              disabled={new_class}
              fullWidth={true}
              floatingLabelText="Class"
              onChange={this.handleClassChange}
              errorText={!new_class ? this.getValidationMessages('class').join(' ') : null}/>
          </div>
          <div className="col-flex-1" style={{paddingLeft: 15}}>
            <TextField
              ref="new_class"
              name="new_class"
              fullWidth={true}
              errorText={this.getValidationMessages('new_class').join(' ')}
              hintText="New Class's name"
              floatingLabelText="New Class"
              onChange={this.handleNewClassChange}/>
          </div>
        </Dialog.ContentSection>
        <Dialog.ContentSection>
          <div className="col-flex-1">
            {this.renderFields()}
          </div>
          <div className="col-flex-1" style={{paddingLeft: 15}}>
            {this.renderOptions()}
          </div>
        </Dialog.ContentSection>
      </Dialog.FullPage>
    );
  }
});
