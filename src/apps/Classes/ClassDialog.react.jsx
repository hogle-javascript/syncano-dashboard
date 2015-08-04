import React from 'react';
import Reflux from 'reflux';

// Utils
import Mixins from '../../mixins';
import Constants from '../../constants/Constants';

// Stores and Actions
import ClassesActions from './ClassesActions';
import ClassDialogStore from './ClassDialogStore';
import ClassesStore from './ClassesStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'ClassDialog',

  mixins: [
    React.addons.LinkedStateMixin,
    Reflux.connect(ClassDialogStore),
    Mixins.Dialog,
    Mixins.Form
  ],

  validatorConstraints: {
    name: {
      presence: true
    }
  },

  componentDidUpdate() {
    if (!this.state.schemaInitialized && this.state.schema) {
      this.setFields(this.state.schema);
      this.setState({
        schemaInitialized: true
      });
    }
  },

  getFieldTypes() {
    return Constants.fieldTypes.map(item => {
      return {
        payload: item,
        text: item
      }
    });
  },

  setFields(schema) {
    let fields = this.state.fields;

    schema.map(item => {
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

  getSchema() {
    return JSON.stringify(this.state.fields.map(item => {
      let schema = {
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

  handleAddSubmit() {
    let schema = this.getSchema();

    if (schema.length < 1) {
      this.setState({feedback: 'You need to add at least one field!'});
      return;
    }

    ClassesActions.createClass({
      name: this.state.name,
      description: this.state.description,
      group: this.state.group,
      group_permissions: this.state.group_permissions,
      other_permissions: this.state.other_permissions,
      schema: schema
    });
  },

  handleEditSubmit() {
    ClassesActions.updateClass(
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

    let fields = this.state.fields;

    let field = {
      fieldName: this.state.fieldName,
      fieldType: this.state.fieldType,
      fieldOrder: this.refs.fieldOrder ? this.refs.fieldOrder.isChecked() : null,
      fieldFilter: this.refs.fieldFilter ? this.refs.fieldFilter.isChecked() : null
    };

    if (this.state.fieldType === 'reference') {
      field.fieldTarget = this.state.fieldTarget;
    }

    fields.push(field);

    this.refs.fieldOrder ? this.refs.fieldOrder.setChecked() : null;
    this.refs.fieldFilter ? this.refs.fieldFilter.setChecked() : null;

    this.setState({
      fields: fields,
      fieldName: ''
    })
  },

  handleRemoveField(item) {
    let fields = [];
    this.state.fields.map(field => {
      if (field.fieldName !== item.fieldName) {
        fields.push(field);
      }
    });
    this.setState({fields: fields});
  },

  handleOnCheck(item, event) {
    let newFields = this.state.fields.map(field => {
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

  renderSchemaFields() {
    return this.state.fields.map(item => {

      return (
        <div key={item.fieldName} className='row'>
          <span className='col-xs-8' style={{marginTop: 5}}>{item.fieldName}</span>
          <span className='col-xs-8' style={{paddingLeft: 15, marginTop: 5}}>{item.fieldType}</span>
          <span className='col-xs-8' style={{paddingLeft: 15, marginTop: 5}}>{item.fieldTarget}</span>
          <span className='col-xs-3' style={{paddingLeft: 15}}>
            <Common.Show if={this.hasFilter(item.fieldType)}>
              <MUI.Checkbox
                style={{marginTop: 5}}
                name="filter"
                defaultChecked={item.fieldFilter}
                onCheck={this.handleOnCheck.bind(this, item)}/>
            </Common.Show>
          </span>
          <span className='col-xs-3' style={{paddingLeft: 15}}>
            <Common.Show if={this.hasOrder(item.fieldType)}>
              <MUI.Checkbox
                style={{marginTop: 5}}
                name="order"
                defaultChecked={item.fieldOrder}
                onCheck={this.handleOnCheck.bind(this, item)}/>
            </Common.Show>
          </span>
          <span className='col-xs-5' style={{paddingLeft: 15}}>
            <MUI.FlatButton
              style={{marginTop: 5}}
              label='Remove'
              secondary={true}
              onClick={this.handleRemoveField.bind(this, item)}/>
          </span>
        </div>
      )
    });
  },

  hasFilter(fieldType) {
    let noFilterFields = ['file', 'text'];
    return noFilterFields.indexOf(fieldType) < 0 ? true : false;
  },

  hasOrder(fieldType) {
    let noOrderFields = ['file', 'text'];
    return noOrderFields.indexOf(fieldType) < 0 ? true : false;
  },

  render() {
    let title = this.hasEditMode() ? 'Edit' : 'Add';
    let submitLabel = 'Confirm';
    let dialogStandardActions = [
      {
        ref: 'cancel',
        text: 'Cancel',
        onTouchTap: this.handleCancel
      },
      {
        ref: 'submit',
        text: {submitLabel},
        onTouchTap: this.handleFormValidation
      }
    ];

    let permissions = [
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
      <Common.Dialog
        ref='dialog'
        title={title + ' a Class'}
        openImmediately={this.props.openImmediately}
        actions={dialogStandardActions}
        onDismiss={this.resetDialogState}>
        {this.renderFormNotifications()}
        <form
          onSubmit={this.handleFormValidation}
          acceptCharset="UTF-8"
          method="post">
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
            <div className='col-xs-26' style={{paddingLeft: 15}}>
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
          <div className="row">
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
          <div style={{marginTop: 30}}>Schema</div>
          {this.getValidationMessages('schema').join(' ')}
          <div className='row'>
            <div className='col-xs-8'></div>
            <div className='col-xs-8' style={{paddingLeft: 15}}></div>
            <div className='col-xs-8' style={{paddingLeft: 15}}></div>
            <div className='col-xs-3' style={{paddingLeft: 15}}>Filter</div>
            <div className='col-xs-3' style={{paddingLeft: 15}}>Order</div>
            <div className='col-xs-5' style={{paddingLeft: 15}}></div>
          </div>
          <div className='row'>
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
            <div className='col-xs-8' style={{paddingLeft: 15}}>
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
            <div className='col-xs-8' style={{paddingLeft: 15}}>
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
                  menuItems={ClassesStore.getClassesDropdown()}/>
              </Common.Show>
            </div>
            <div className='col-xs-3' style={{paddingLeft: 15}}>
              <Common.Show if={this.hasFilter(this.state.fieldType)}>
                <MUI.Checkbox
                  style={{marginTop: 35}}
                  ref="fieldFilter"
                  name="filter"/>
              </Common.Show>
            </div>
            <div className='col-xs-3' style={{paddingLeft: 15}}>
              <Common.Show if={this.hasOrder(this.state.fieldType)}>
                <MUI.Checkbox
                  style={{marginTop: 35}}
                  ref="fieldOrder"
                  name="order"/>
              </Common.Show>
            </div>
            <div className='col-xs-5' style={{paddingLeft: 15}}>
              <MUI.FlatButton
                style={{marginTop: 35}}
                label='Add'
                disabled={!this.state.fieldType || !this.state.fieldName}
                secondary={true}
                onClick={this.handleFieldAdd}/>
            </div>
          </div>
          <div style={{marginTop: 15}}>{this.renderSchemaFields()}</div>
        </form>
      </Common.Dialog>
    );
  }
});
