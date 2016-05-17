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
import {Color, Show, SelectFieldWrapper, Tooltip, Dialog, Icon, Notification} from '../../common/';

export default React.createClass({
  displayName: 'ClassDialog',

  mixins: [
    Reflux.connect(Store),
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
    return _.map(Constants.fieldTypes, (item) => {
      return {
        payload: item,
        text: item
      };
    });
  },

  getFieldTargetOptions() {
    const options = ClassesStore.getClassesDropdown(true);

    return _.filter(options, (option) => option.payload !== this.state.name);
  },

  getSchema() {
    const {fields} = this.state;

    return _.map(fields, (item) => {
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
    });
  },

  getGroups() {
    const groups = GroupsStore.getGroups();
    const emptyItem = {
      payload: 'none',
      text: 'none'
    };

    if (groups.length === 0) {
      return [emptyItem];
    }
    const groupsObjects = _.map(groups, (group) => {
      return {
        payload: group.id,
        text: this.renderGroupDropdownItem(group)
      };
    });

    groupsObjects.unshift(emptyItem);
    return groupsObjects;
  },

  hasFilter(fieldType) {
    const noFilterFields = ['file', 'text', 'object'];

    return noFilterFields.indexOf(fieldType) < 0;
  },

  hasOrder(fieldType) {
    const noOrderFields = ['file', 'text', 'array', 'object', 'geopoint'];

    return _.indexOf(noOrderFields, fieldType) < 0;
  },

  handleAddSubmit() {
    const schema = this.getSchema();
    const {name, description, group, group_permissions, other_permissions} = this.state;

    if (schema.length < 1) {
      this.setState({feedback: 'You need to add at least one field!'});
      return;
    }

    Actions.createClass({
      name,
      description,
      group: group !== 'none' ? group : null,
      group_permissions,
      other_permissions,
      schema,
      metadata: {
        color: Color.getRandomColorName(),
        icon: Icon.Store.getRandomIconPickerIcon()
      }
    });
  },

  handleEditSubmit() {
    const {name, description, group, group_permissions, other_permissions} = this.state;

    Actions.updateClass(
      name, {
        description,
        group: group !== 'none' ? group : null,
        group_permissions,
        other_permissions,
        schema: this.getSchema()
      }
    );
  },

  handleFieldAdd() {
    const {fields, fieldName, fieldType, fieldTarget} = this.state;

    if (_.includes(_.map(fields, 'fieldName'), fieldName)) {
      this.refs.fieldName.setErrorText('Field with this name already exists.');
      return;
    }
    if (!fieldName) {
      return;
    }

    const classFields = fields;

    let field = {
      fieldName,
      fieldType,
      fieldOrder: this.refs.fieldOrder ? this.refs.fieldOrder.isChecked() : null,
      fieldFilter: this.refs.fieldFilter ? this.refs.fieldFilter.isChecked() : null
    };

    if (fieldType === 'reference') {
      field.fieldTarget = fieldTarget;
    }

    classFields.push(field);

    if (this.refs.fieldOrder) {
      this.refs.fieldOrder.setChecked();
    }

    if (this.refs.fieldFilter) {
      this.refs.fieldFilter.setChecked();
    }

    this.setState({
      fields: classFields,
      fieldName: ''
    });
  },

  handleRemoveField(item) {
    const fields = _.filter(this.state.fields, (field) => field.fieldName !== item.fieldName);

    this.setState({fields});
  },

  handleOnCheck(item, event) {
    const {fields} = this.state;
    const newFields = _.map(fields, (field) => {
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

    _.map(schema, (item) => {
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
    const styles = this.getStyles();

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
          className="row align-middle vm-1-b">
          <span className="col-xs-8">{item.fieldName}</span>
          <span className="col-xs-8">{item.fieldType}</span>
          <span className="col-xs-8">{item.fieldTarget}</span>
          <span className="col-xs-3">
            <Tooltip
              label={!this.hasFilter(item.fieldType) && `${item.fieldType} doesn't support filtering`}
              verticalPosition="bottom"
              horizontalPosition="center">
              <Checkbox
                name="filter"
                defaultChecked={item.fieldFilter}
                disabled={!this.hasFilter(item.fieldType)}
                onCheck={this.handleOnCheck.bind(this, item)}/>
            </Tooltip>
          </span>
          <span className="col-xs-3">
            <Tooltip
              label={!this.hasOrder(item.fieldType) && `${item.fieldType} doesn't support sorting`}
              verticalPosition="bottom"
              horizontalPosition="center">
              <Checkbox
                name="order"
                defaultChecked={item.fieldOrder}
                disabled={!this.hasOrder(item.fieldType)}
                onCheck={this.handleOnCheck.bind(this, item)} />
            </Tooltip>
          </span>
          <span className="col-xs-5">
            <FlatButton
              label="Remove"
              secondary={true}
              onClick={this.handleRemoveField.bind(this, item)}/>
          </span>
        </div>
      );
    });
  },

  render() {
    const {
      isLoading,
      open,
      group,
      group_permissions,
      other_permissions,
      fieldType,
      fieldTarget,
      fieldName
    } = this.state;
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
        open={open}
        isLoading={isLoading}
        actions={
          <Dialog.StandardButtons
            disabled={!this.state.canSubmit}
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}/>
        }
        sidebar={
          <Dialog.SidebarBox>
            <Dialog.SidebarSection>
              Classes are templates for Data Objects which will be stored in Syncano. In order to be able to add Data
               Objects, you have to define a Class.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection title="Permissions">
              This is place where you can manage who will have access to your Data Objects.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection title="Schema">
              Class schema determines what type of data your Data Objects can store.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection>
              <i>Note: Schema field name has to start with a letter!</i>
            </Dialog.SidebarSection>
            <Dialog.SidebarSection last={true}>
              <Dialog.SidebarLink to="http://docs.syncano.io/docs/classes">
                Learn more
              </Dialog.SidebarLink>
            </Dialog.SidebarSection>
          </Dialog.SidebarBox>
        }>
        <Dialog.ContentSection>
          {this.renderFormNotifications()}
          <div className="col-xs-8">
            <TextField
              ref="name"
              name="name"
              autoFocus={true}
              disabled={this.hasEditMode()}
              fullWidth={true}
              valueLink={this.linkState('name')}
              errorText={this.getValidationMessages('name').join(' ')}
              hintText="Class's name"
              floatingLabelText="Name"/>
          </div>
          <div className="col-flex-1">
            <TextField
              ref="description"
              name="description"
              fullWidth={true}
              valueLink={this.linkState('description')}
              errorText={this.getValidationMessages('description').join(' ')}
              hintText="Class's description"
              floatingLabelText="Description (optional)"/>
          </div>
        </Dialog.ContentSection>
        <Dialog.ContentSection title="Permissions">
          <div className="col-flex-1">
            <SelectFieldWrapper
              name="group"
              options={this.getGroups()}
              value={group}
              labelStyle={styles.groupDropdownLabel}
              menuItemStyle={styles.groupMenuItem}
              floatingLabelText="Group (ID)"
              onChange={(event, index, value) => this.setSelectFieldValue('group', value)}
              errorText={this.getValidationMessages('group').join(' ')}/>
          </div>
          <div className="col-flex-1">
            <SelectFieldWrapper
              name="class"
              options={permissions}
              floatingLabelText="Group Permissions"
              value={group_permissions}
              onChange={(event, index, value) => this.setSelectFieldValue('group_permissions', value)}
              errorText={this.getValidationMessages('group_permissions').join(' ')}/>
          </div>
          <div className="col-flex-1">
            <SelectFieldWrapper
              name="class"
              options={permissions}
              floatingLabelText="Other Permissions"
              value={other_permissions}
              onChange={(event, index, value) => this.setSelectFieldValue('other_permissions', value)}
              errorText={this.getValidationMessages('other_permissions').join(' ')}/>
          </div>
        </Dialog.ContentSection>
        <div className="vm-2-b">
          <Show if={this.getValidationMessages('schema').length > 0}>
            <Notification
              className="vm-1-t"
              type="error">{this.getValidationMessages('schema').join(' ')}
            </Notification>
          </Show>
        </div>
        <div className="row">
          <div className="col-xs-8"></div>
          <div className="col-xs-8"></div>
          <div className="col-xs-8"></div>
          <div className="col-xs-3">Filter</div>
          <div className="col-xs-3">Order</div>
          <div className="col-xs-5"></div>
        </div>
        <Dialog.ContentSection
          style={styles.schemaAddSection}
          title="Schema">
          <div className="col-xs-8">
            <TextField
              ref="fieldName"
              name="fieldName"
              fullWidth={true}
              valueLink={this.linkState('fieldName')}
              hintText="Field's name"
              floatingLabelText="Name"/>
          </div>
          <div className="col-xs-8">
            <SelectFieldWrapper
              name="fieldType"
              options={this.getFieldTypes()}
              value={fieldType}
              floatingLabelText="Type"
              onChange={(event, index, value) => this.setSelectFieldValue('fieldType', value)}
              errorText={this.getValidationMessages('fieldType').join(' ')}/>
          </div>
          <div className="col-xs-8">
            <Show if={fieldType === 'reference'}>
              <SelectFieldWrapper
                name="fieldTarget"
                options={this.getFieldTargetOptions()}
                value={fieldTarget}
                floatingLabelText="Target Class"
                onChange={(event, index, value) => this.setSelectFieldValue('fieldTarget', value)}
                errorText={this.getValidationMessages('fieldTarget').join(' ')}/>
            </Show>
          </div>
          <div
            className="col-xs-3"
            style={styles.checkBox}>
            <Tooltip
              label={!this.hasFilter(fieldType) && `${fieldType} doesn't support filtering`}
              verticalPosition="bottom"
              horizontalPosition="center">
              <Checkbox
                ref="fieldFilter"
                disabled={!this.hasFilter(fieldType)}
                name="filter" />
            </Tooltip>
          </div>
          <div
            className="col-xs-3"
            style={styles.checkBox}>
            <Tooltip
              label={!this.hasOrder(fieldType) && `${fieldType} doesn't support sorting`}
              verticalPosition="bottom"
              horizontalPosition="center">
              <Checkbox
                ref="fieldOrder"
                disabled={!this.hasOrder(fieldType)}
                name="order" />
            </Tooltip>
          </div>
          <div
            className="col-xs-5"
            style={styles.checkBox}>
            <FlatButton
              style={{marginBottom: 4}}
              label="Add"
              disabled={!fieldType || !fieldName}
              secondary={true}
              onClick={this.handleFieldAdd}/>
          </div>
        </Dialog.ContentSection>
        <div className="vm-4-b">
          {this.renderSchemaFields()}
        </div>
      </Dialog.FullPage>
    );
  }
});
