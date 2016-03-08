import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';

// Utils
import {DialogMixin, FormMixin} from '../../mixins';
import Constants from '../../constants/Constants';

// Stores and Actions
import Actions from './ClassesActions';
import Store from './ClassDialogStore';
import ClassesStore from './ClassesStore';
import {GroupsStore, GroupsActions} from '../Groups';

// Components
import {TextField, FlatButton, Checkbox} from 'syncano-material-ui';
import {Color, Show, SelectFieldWrapper} from 'syncano-components';
import {Dialog, Icon} from '../../common';

export default React.createClass({
  displayName: 'ClassDialog',

  mixins: [
    Reflux.connect(Store),
    Reflux.connect(GroupsStore, 'groups'),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints: {
    name: {
      presence: true
    }
  },

  componentDidMount() {
    GroupsActions.fetch();
  },

  componentWillUpdate(nextProps, nextState) {
    if (!nextState.schemaInitialized && nextState.schema) {
      this.setFields(nextState.schema);
      nextState.schemaInitialized = true;
    }
  },

  getInitialState() {
    return {
      fieldTarget: 'self'
    };
  },

  getStyles() {
    return {
      schemaAddSection: {
        alignItems: 'stretch',
        height: 110
      },
      checkBox: {
        alignSelf: 'center'
      },
      groupDropdownLabel: {
        overflowY: 'hidden',
        maxHeight: 56,
        paddingRight: 24
      },
      groupMenuItem: {
        padding: '0 24px'
      },
      groupItemContainer: {
        display: '-webkit-flex; display: flex',
        justifyContent: 'space-between',
        flexWrap: 'nowrap'
      },
      groupItemLabel: {
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      },
      groupItemId: {
        flexShrink: 0
      }
    };
  },

  getFieldTypes() {
    return Constants.fieldTypes.map((item) => {
      return {
        payload: item,
        text: item
      };
    });
  },

  getFieldTargetOptions() {
    let options = ClassesStore.getClassesDropdown(true);

    return _.filter(options, (option) => option.payload !== this.state.name);
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

  getGroups() {
    const groups = this.state.groups.items;
    const emptyItem = {
      payload: null,
      text: 'none'
    };

    if (groups.length === 0) {
      return [emptyItem];
    }
    const groupsObjects = groups.map((group) => {
      return {
        payload: group.id,
        text: this.renderGroupDropdownItem(group)
      };
    });

    groupsObjects.unshift(emptyItem);
    return groupsObjects;
  },

  hasFilter(fieldType) {
    const noFilterFields = ['file', 'text'];

    return noFilterFields.indexOf(fieldType) < 0;
  },

  hasOrder(fieldType) {
    const noOrderFields = ['file', 'text'];

    return noOrderFields.indexOf(fieldType) < 0;
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
        color: Color.getRandomColorName(),
        icon: Icon.Store.getRandomIconPickerIcon()
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
    if (_.includes(_.pluck(this.state.fields, 'fieldName'), this.state.fieldName)) {
      this.refs.fieldName.setErrorText('Field with this name already exists.');
      return;
    }
    if (!this.state.fieldName) {
      return;
    }

    const fields = this.state.fields;

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

  renderGroupDropdownItem(group) {
    let styles = this.getStyles();

    return (
      <div style={styles.groupItemContainer}>
        <div style={styles.groupItemLabel}>
          {group.label}
        </div>
        <div style={styles.groupItemId}>
          {` (ID: ${group.id})`}
        </div>
      </div>
    );
  },

  renderSchemaFields() {
    return this.state.fields.map((item) => {
      return (
        <div
          key={item.fieldName}
          className='row align-middle vm-1-b'>
          <span className='col-xs-8'>{item.fieldName}</span>
          <span className='col-xs-8'>{item.fieldType}</span>
          <span className='col-xs-8'>{item.fieldTarget}</span>
          <span className='col-xs-3'>
            <Show if={this.hasFilter(item.fieldType)}>
              <Checkbox
                name="filter"
                defaultChecked={item.fieldFilter}
                onCheck={this.handleOnCheck.bind(this, item)}/>
            </Show>
          </span>
          <span className='col-xs-3'>
            <Show if={this.hasOrder(item.fieldType)}>
              <Checkbox
                name="order"
                defaultChecked={item.fieldOrder}
                onCheck={this.handleOnCheck.bind(this, item)}/>
            </Show>
          </span>
          <span className='col-xs-5'>
            <FlatButton
              label='Remove'
              secondary={true}
              onClick={this.handleRemoveField.bind(this, item)}/>
          </span>
        </div>
      );
    });
  },

  render() {
    const styles = this.getStyles();
    const title = this.hasEditMode() ? 'Update' : 'Add';
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
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={`${title} a Class`}
        onRequestClose={this.handleCancel}
        open={this.state.open}
        isLoading={this.state.isLoading}
        actions={
          <Dialog.StandardButtons
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}/>
        }>
        {this.renderFormNotifications()}
        <div className='row'>
          <div className='col-xs-8'>
            <TextField
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
            <TextField
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
            <SelectFieldWrapper
              name="group"
              options={this.getGroups()}
              value={this.state.group}
              labelStyle={styles.groupDropdownLabel}
              menuItemStyle={styles.groupMenuItem}
              floatingLabelText="Group (ID)"
              onChange={this.setSelectFieldValue.bind(null, 'group')}
              errorText={this.getValidationMessages('group').join(' ')}/>
          </div>
          <div className="col-flex-1">
            <SelectFieldWrapper
              name="class"
              options={permissions}
              floatingLabelText='Group Permissions'
              value={this.state.group_permissions}
              onChange={this.setSelectFieldValue.bind(null, 'group_permissions')}
              errorText={this.getValidationMessages('group_permissions').join(' ')}/>
          </div>
          <div className="col-flex-1">
            <SelectFieldWrapper
              name="class"
              options={permissions}
              floatingLabelText='Other Permissions'
              value={this.state.other_permissions}
              onChange={this.setSelectFieldValue.bind(null, 'other_permissions')}
              errorText={this.getValidationMessages('other_permissions').join(' ')}/>
          </div>
        </div>
        <div className="vm-2-b">
          Schema
          <Show if={this.getValidationMessages('schema').length > 0}>
            <Notification
              className="vm-1-t"
              type='error'>{this.getValidationMessages('schema').join(' ')}
            </Notification>
          </Show>
        </div>
        <div className='row'>
          <div className='col-xs-8'></div>
          <div className='col-xs-8'></div>
          <div className='col-xs-8'></div>
          <div className='col-xs-3'>Filter</div>
          <div className='col-xs-3'>Order</div>
          <div className='col-xs-5'></div>
        </div>
        <div
          style={styles.schemaAddSection}
          className='row align-bottom vm-2-b'>
          <div className='col-xs-8'>
            <TextField
              ref='fieldName'
              name='fieldName'
              fullWidth={true}
              valueLink={this.linkState('fieldName')}
              hintText='Name of the Field'
              floatingLabelText='Name'/>
          </div>
          <div className='col-xs-8'>
            <SelectFieldWrapper
              name="fieldType"
              options={this.getFieldTypes()}
              value={this.state.fieldType}
              floatingLabelText='Type'
              onChange={this.setSelectFieldValue.bind(null, 'fieldType')}
              errorText={this.getValidationMessages('fieldType').join(' ')}/>
          </div>
          <div className='col-xs-8'>
            <Show if={this.state.fieldType === 'reference'}>
              <SelectFieldWrapper
                name="fieldTarget"
                options={this.getFieldTargetOptions()}
                value={this.state.fieldTarget}
                floatingLabelText='Target Class'
                onChange={this.setSelectFieldValue.bind(null, 'fieldTarget')}
                errorText={this.getValidationMessages('fieldTarget').join(' ')}/>
            </Show>
          </div>
          <div
            className='col-xs-3'
            style={styles.checkBox}>
            <Show if={this.hasFilter(this.state.fieldType)}>
              <Checkbox
                ref="fieldFilter"
                name="filter"/>
            </Show>
          </div>
          <div
            className='col-xs-3'
            style={styles.checkBox}>
            <Show if={this.hasOrder(this.state.fieldType)}>
              <Checkbox
                ref="fieldOrder"
                name="order"/>
            </Show>
          </div>
          <div className='col-xs-5'
               style={styles.checkBox}>
            <FlatButton
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
      </Dialog.FullPage>
    );
  }
});
