import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router-old';

// Utils
import Mixins from '../../mixins';
import Constants from '../../constants/Constants';

// Stores and Actions
import SessionStore from '../Session/SessionStore';
import ClassesStore from './ClassesStore';
import Actions from './FormViewActions';
import Store from './FormViewStore';

// Components
import MUI from 'syncano-material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'FormView',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(Store),
    Mixins.Form
  ],

  validatorConstraints: {
    name: {
      presence: true
    }
  },

  componentDidMount() {
    if (this.hasEditMode()) {
      Store.refreshData();
    }
  },

  componentWillUpdate(nextProps, nextState) {
    if (!nextState.schemaInitialized && nextState.schema) {
      this.setFields(nextState.schema);
      nextState.schemaInitialized = true;
    }
  },

  getFieldTypes() {
    return Constants.fieldTypes.map((item) => {
      return {
        payload: item,
        text: item
      };
    });
  },

  getSchema() {
    return JSON.stringify(this.state.fields.map((item) => {
      const schema = {
        name: item.fieldName,
        type: item.fieldType,
        target: item.fieldTarget
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

  hasFilter(fieldType) {
    const noFilterFields = ['file', 'text'];

    return noFilterFields.indexOf(fieldType) < 0;
  },

  hasOrder(fieldType) {
    const noOrderFields = ['file', 'text'];

    return noOrderFields.indexOf(fieldType) < 0;
  },

  hasEditMode() {
    return this.getParams().className;
  },

  handleSuccessfullValidation() {
    return this.hasEditMode() ? this.handleEditSubmit() : this.handleAddSubmit();
  },

  handleBackClick() {
    SessionStore.getRouter().transitionTo(
      'classes',
      {
        instanceName: SessionStore.getInstance().name
      }
    );
  },

  handleAddSubmit() {
    const schema = this.getSchema();

    if (schema.length < 1) {
      this.setState({feedback: 'You need to add at least one field!'});
      return;
    }

    Actions.createClass({
      name: this.state.name,
      description: this.state.description,
      group: this.state.group,
      group_permissions: this.state.group_permissions,
      other_permissions: this.state.other_permissions,
      schema,
      metadata: {
        color: Common.Color.getRandomColorName(),
        icon: Common.Icon.Store.getRandomIconPickerIcon()
      }
    });
  },

  handleEditSubmit() {
    Actions.updateClass(
      this.state.name, {
        description: this.state.description,
        group: this.state.group,
        group_permissions: this.state.group_permissions,
        other_permissions: this.state.other_permissions,
        schema: this.getSchema()
      }
    );
  },

  handleFieldAdd() {
    if (!this.state.fieldName) {
      return;
    }

    const fields = this.state.fields;

    const field = {
      fieldName: this.state.fieldName,
      fieldType: this.state.fieldType,
      fieldOrder: this.refs.fieldOrder ? this.refs.fieldOrder.isChecked() : null,
      fieldFilter: this.refs.fieldFilter ? this.refs.fieldFilter.isChecked() : null
    };

    if (this.state.fieldType === 'reference') {
      field.fieldTarget = this.state.fieldTarget;
    }

    fields.push(field);

    if (this.refs.fieldOrder) {
      this.refs.fieldOrder.setChecked();
    }

    if (this.refs.fieldFilter) {
      this.refs.fieldFilter.setChecked();
    }

    this.setState({
      fields,
      fieldName: ''
    });
  },

  handleRemoveField(item) {
    const fields = [];

    this.state.fields.map((field) => {
      if (field.fieldName !== item.fieldName) {
        fields.push(field);
      }
    });
    this.setState({fields});
  },

  handleOnCheck(item, event) {
    let newFields = this.state.fields.map((field) => {
      if (field.fieldName === item.fieldName) {
        if (event.target.name === 'order') {
          field.fieldOrder = event.target.checked;
        } else if (event.target.name === 'filter') {
          field.fieldFilter = event.target.checked;
        }
      }
      return field;
    });

    this.setState({fields: newFields});
  },

  setFields(schema) {
    const fields = this.state.fields;

    schema.map((item) => {
      fields.push({
        fieldName: item.name,
        fieldType: item.type,
        fieldTarget: item.target,
        fieldOrder: item.order_index,
        fieldFilter: item.filter_index
      });
    });

    return fields;
  },

  renderSchemaFields() {
    return this.state.fields.map((item) => {
      return (
        <div key={item.fieldName} className='row align-middle vm-1-b'>
          <span className='col-xs-8'>{item.fieldName}</span>
          <span className='col-xs-8'>{item.fieldType}</span>
          <span className='col-xs-8'>{item.fieldTarget}</span>
          <span className='col-xs-3'>
            <Common.Show if={this.hasFilter(item.fieldType)}>
              <MUI.Checkbox
                name="filter"
                defaultChecked={item.fieldFilter}
                onCheck={this.handleOnCheck.bind(this, item)}/>
            </Common.Show>
          </span>
          <span className='col-xs-3'>
            <Common.Show if={this.hasOrder(item.fieldType)}>
              <MUI.Checkbox
                name="order"
                defaultChecked={item.fieldOrder}
                onCheck={this.handleOnCheck.bind(this, item)}/>
            </Common.Show>
          </span>
          <span className='col-xs-5'>
            <MUI.FlatButton
              label='Remove'
              secondary={true}
              onClick={this.handleRemoveField.bind(this, item)}/>
          </span>
        </div>
      );
    });
  },

  render() {
    const title = this.hasEditMode() ? 'Update a Class' : 'Add a Class';
    const permissions = [
      {
        text: 'none',
        payload: 'none'
      },
      {
        text: 'read',
        payload: 'read'
      },
      {
        text: 'create objects',
        payload: 'create_objects'
      }
    ];

    return (
      <Common.Loading show={this.hasEditMode() && this.state.name === null}>
        <Common.InnerToolbar>
          <MUI.ToolbarGroup>
            <MUI.IconButton
              iconClassName="synicon-arrow-left"
              onClick={this.handleBackClick}
              touch={true}
              style={{marginTop: 4}}
              iconStyle={{color: 'rgba(0,0,0,.4)'}}/>
          </MUI.ToolbarGroup>

          <MUI.ToolbarGroup>
            <MUI.ToolbarTitle text={title}/>
          </MUI.ToolbarGroup>

        </Common.InnerToolbar>

        <form
          onSubmit={this.handleFormValidation}
          acceptCharset="UTF-8"
          method="post"
          className="vp-4-t">
          {this.renderFormNotifications()}
          <div className='row'>
            <div className='col-xs-8'>
              <MUI.TextField
                ref='name'
                name='name'
                disabled={this.hasEditMode()}
                fullWidth={true}
                valueLink={this.linkState('name')}
                errorText={this.getValidationMessages('name').join(' ')}
                hintText='Name of the Class'
                floatingLabelText='Name'/>
            </div>
            <div className='col-flex-1'>
              <MUI.TextField
                ref='description'
                name='description'
                fullWidth={true}
                valueLink={this.linkState('description')}
                errorText={this.getValidationMessages('description').join(' ')}
                hintText='Description of the Class'
                floatingLabelText='Description'/>
            </div>
          </div>
          <div className="row vm-4-b">
            <div className="col-flex-1">
              <MUI.TextField
                ref='field-group'
                name='owner'
                fullWidth={true}
                valueLink={this.linkState('group')}
                errorText={this.getValidationMessages('group').join(' ')}
                hintText='Group ID'
                floatingLabelText='Group'/>
            </div>
            <div className="col-flex-1">
              <MUI.SelectField
                ref='field-group_permissions'
                name='field-group_permissions'
                fullWidth={true}
                valueMember="payload"
                displayMember="text"
                valueLink={this.linkState('group_permissions')}
                floatingLabelText='Group Permissions'
                errorText={this.getValidationMessages('group_permissions').join(' ')}
                menuItems={permissions}/>
            </div>
            <div className="col-flex-1">
              <MUI.SelectField
                ref='field-other_permissions'
                name='field-other_permissions'
                fullWidth={true}
                valueMember="payload"
                displayMember="text"
                valueLink={this.linkState('other_permissions')}
                floatingLabelText='Other Permissions'
                errorText={this.getValidationMessages('other_permissions').join(' ')}
                menuItems={permissions}/>
            </div>
          </div>
          <div className="vm-2-b">
            Schema
            <Common.Show if={this.getValidationMessages('schema').length > 0}>
              <Common.Notification
                className="vm-1-t"
                type='error'>{this.getValidationMessages('schema').join(' ')}
              </Common.Notification>
            </Common.Show>
          </div>
          <div className='row'>
            <div className='col-xs-8'></div>
            <div className='col-xs-8'></div>
            <div className='col-xs-8'></div>
            <div className='col-xs-3'>Filter</div>
            <div className='col-xs-3'>Order</div>
            <div className='col-xs-5'></div>
          </div>
          <div className='row align-bottom vm-2-b'>
            <div className='col-xs-8'>
              <MUI.TextField
                ref='fieldName'
                name='fieldName'
                fullWidth={true}
                valueLink={this.linkState('fieldName')}
                errorText={this.getValidationMessages('fieldName').join(' ')}
                hintText='Name of the Field'
                floatingLabelText='Name'/>
            </div>
            <div className='col-xs-8'>
              <MUI.SelectField
                className='type-dropdown'
                ref='fieldType'
                name='fieldType'
                floatingLabelText='Type'
                fullWidth={true}
                valueLink={this.linkState('fieldType')}
                errorText={this.getValidationMessages('fieldType').join(' ')}
                valueMember='payload'
                displayMember='text'
                menuItems={this.getFieldTypes()}/>
            </div>
            <div className='col-xs-8'>
              <Common.Show if={this.state.fieldType === 'reference'}>
                <MUI.SelectField
                  ref='fieldTarget'
                  name='fieldTarget'
                  floatingLabelText='Target Class'
                  fullWidth={true}
                  valueLink={this.linkState('fieldTarget')}
                  errorText={this.getValidationMessages('fieldTarget').join(' ')}
                  valueMember='payload'
                  displayMember='text'
                  menuItems={ClassesStore.getClassesDropdown(true)}/>
              </Common.Show>
            </div>
            <div className='col-xs-3'>
              <Common.Show if={this.hasFilter(this.state.fieldType)}>
                <MUI.Checkbox
                  style={{marginBottom: 10}}
                  ref="fieldFilter"
                  name="filter"/>
              </Common.Show>
            </div>
            <div className='col-xs-3'>
              <Common.Show if={this.hasOrder(this.state.fieldType)}>
                <MUI.Checkbox
                  style={{marginBottom: 10}}
                  ref="fieldOrder"
                  name="order"/>
              </Common.Show>
            </div>
            <div className='col-xs-5'>
              <MUI.FlatButton
                style={{marginBottom: 4}}
                label='Add'
                disabled={!this.state.fieldType || !this.state.fieldName}
                secondary={true}
                onClick={this.handleFieldAdd}/>
            </div>
          </div>
          <div className="vm-4-b">
            {this.renderSchemaFields()}
          </div>
          <div>
            <MUI.RaisedButton
              type="submit"
              label="Confirm"
              className="raised-button"
              secondary={true}
              style={{margin: '0 8px 0 auto'}}/>
            <MUI.FlatButton
              label='Cancel'
              className="raised-button"
              onClick={this.handleBackClick}
              style={{margin: '0 8px 0 auto'}}/>
          </div>
        </form>
      </Common.Loading>
    );
  }
});
