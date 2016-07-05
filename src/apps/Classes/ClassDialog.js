/* eslint-disable no-duplicate-imports, import/no-duplicates */
import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';

// Utils
import { DialogMixin, FormMixin } from '../../mixins';
import Constants from '../../constants/Constants';

// Stores and Actions
import Actions from './ClassesActions';
import Store from './ClassDialogStore';
import ClassesStore from './ClassesStore';
import { GroupsStore, GroupsActions } from '../Groups';

// Components
import { TextField, FlatButton, RaisedButton, IconButton, Checkbox, Tabs, Tab } from 'material-ui';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';
import { Color, Show, SelectFieldWrapper, Dialog, Icon, Notification, ColorIconPicker } from '../../common/';

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

    if (!this.state._dialogVisible && nextState._dialogVisible && nextState._dialogMode !== 'edit') {
      this.setState({
        metadata: {
          color: Color.getRandomColorName(),
          icon: Icon.Store.getRandomIconPickerIcon()
        }
      });
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
        marginTop: '16px'
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
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'nowrap'
      },
      groupItemLabel: {
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      },
      groupItemId: {
        flexShrink: 0
      },
      tab: {
        color: Colors.blue400,
        fontSize: 13,
        lineHeight: '18px',
        fontWeight: 800
      },
      inkBarStyle: {
        background: Colors.blue400
      },
      contentContainerStyle: {
        padding: '0 8px 0 8px'
      },
      tabItemContainerStyle: {
        background: 'transparent',
        borderBottom: '1px solid #b8c0c9'
      },
      tableRow: {
        display: 'flex',
        alignItems: 'center'
      },
      tableRowColumn: {
        fontSize: 16,
        display: 'flex',
        alignItems: 'center'
      },
      tableRowColumnButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      tableHeaderColumn: {
        display: 'flex'
      },
      tableHeaderRow: {
        display: 'flex',
        justifyContent: 'center',
        height: '30px',
        borderBottom: 'none'
      },
      tableHeaderColumnButton: {
        display: 'flex',
        justifyContent: 'center'
      },
      underlineStyle: {
        borderColor: Colors.blue400
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
    const { fields } = this.state;

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

  hasIndex(indexType, fieldType) {
    if (indexType === 'filter') {
      return this.hasFilter(fieldType);
    }

    return this.hasOrder(fieldType);
  },

  hasFilter(fieldType) {
    const noFilterFields = ['file', 'text', 'object'];

    return !_.includes(noFilterFields, fieldType);
  },

  hasOrder(fieldType) {
    const noOrderFields = ['file', 'text', 'array', 'object', 'geopoint', 'relation'];

    return !_.includes(noOrderFields, fieldType);
  },

  handleAddSubmit() {
    const schema = this.getSchema();
    const { name, description, group, group_permissions, other_permissions, metadata } = this.state;

    if (schema.length < 1) {
      this.setState({ feedback: 'You need to add at least one field!' });
      return;
    }

    Actions.createClass({
      name,
      description,
      group: group !== 'none' ? group : null,
      group_permissions,
      other_permissions,
      schema,
      metadata
    });
  },

  handleEditSubmit() {
    const { name, description, group, group_permissions, other_permissions, metadata } = this.state;

    Actions.updateClass(
      name, {
        description,
        group: group !== 'none' ? group : null,
        group_permissions,
        other_permissions,
        schema: this.getSchema(),
        metadata
      }
    );
  },

  handleFieldAdd() {
    const { fields, fieldName, fieldType, fieldTarget } = this.state;
    const filterCheckbox = this.refs[`checkboxFilter${fieldName}`];
    const orderCheckbox = this.refs[`checkboxOrder${fieldName}`];

    if (_.includes(_.map(fields, 'fieldName'), fieldName)) {
      return this.setState({
        errors: {
          fieldName: ['Field with this name already exists.']
        }
      });
    }
    if (!fieldName) {
      return;
    }

    const classFields = fields;

    let field = {
      fieldName,
      fieldType,
      fieldOrder: orderCheckbox ? orderCheckbox.isChecked() : null,
      fieldFilter: filterCheckbox ? filterCheckbox.isChecked() : null
    };

    if (fieldType === 'reference' || fieldType === 'relation') {
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
      errors: {
        fieldName: []
      },
      fields: classFields,
      fieldName: ''
    });
  },

  handleRemoveField(item) {
    const fields = _.filter(this.state.fields, (field) => field.fieldName !== item.fieldName);

    this.setState({ fields });
  },

  handleOnCheck(item, event) {
    const { fields } = this.state;
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

    this.setState({ fields: newFields });
  },

  handleColorChange(color) {
    const { metadata } = this.state;

    this.setState({ metadata: _.merge({}, metadata, { color }) });
  },

  handleIconChange(icon) {
    const { metadata } = this.state;

    this.setState({ metadata: _.merge({}, metadata, { icon }) });
  },

  handleUnderlineStyle(field) {
    const style = this.getStyles();

    if (!this.state[field]) {
      return style.underlineStyle;
    }
  },

  setFields(schema) {
    const { fields } = this.state;

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

  renderCheckbox(item, indexType) {
    if (!this.hasIndex(indexType, item.fieldType)) {
      return this.renderDisabledCheckbox(item.fieldType, indexType);
    }

    return (
      <Checkbox
        ref={`checkbox${_.upperFirst(indexType)}${item.fieldName}`}
        name={indexType}
        defaultChecked={item[`field${_.upperFirst(indexType)}`]}
        onCheck={event => this.handleOnCheck(item, event)}
      />
    );
  },

  renderDisabledCheckbox(fieldType, indexType) {
    const message = {
      filter: 'filtering',
      order: 'sorting'
    };

    return (
      <IconButton
        tooltip={`${fieldType} doesn't support ${message[indexType]}`}
        iconClassName="synicon-close-box-outline"
        iconStyle={{ color: Colors.grey400, marginLeft: -24 }}
      />
    );
  },

  renderSchemaFieldRows() {
    const { fields } = this.state;
    const styles = this.getStyles();

    const schemaFields = _.map(fields, (item) => {
      return (
        <TableRow style={styles.tableRow}>
          <TableRowColumn
            className="col-sm-8"
            style={styles.tableRowColumn}
          >
          {item.fieldName}
          </TableRowColumn>
          <TableRowColumn
            className="col-sm-8"
            style={styles.tableRowColumn}
          >
          {item.fieldType}
          </TableRowColumn>
          <TableRowColumn
            className="col-sm-8"
            style={styles.tableRowColumn}
          >
          {item.fieldTarget}
          </TableRowColumn>
          <TableRowColumn
            className="col-sm-3"
            style={styles.tableRowColumn}
          >
            <div style={styles.checkBox}>
              {this.renderCheckbox(item, 'filter')}
            </div>
          </TableRowColumn>
          <TableRowColumn
            className="col-sm-3"
            style={styles.tableRowColumn}
          >
            <div style={styles.checkBox}>
              {this.renderCheckbox(item, 'order')}
            </div>
          </TableRowColumn>
          <TableRowColumn
            className="col-sm-5"
            style={styles.tableRowColumnButton}
          >
            <FlatButton
              label="Remove"
              secondary={true}
              onClick={this.handleRemoveField.bind(this, item)}
            />
          </TableRowColumn>
        </TableRow>
      );
    });

    return schemaFields;
  },

  renderSchemaFieldNewRow() {
    const styles = this.getStyles();

    const {
      fieldType,
      fieldTarget,
      fieldName
    } = this.state;

    const newFieldObj = {
      fieldOrder: false,
      fieldFilter: false,
      fieldType,
      fieldName
    };

    return (
      <TableRow style={styles.tableRow}>
        <TableRowColumn className="col-sm-8">
          <TextField
            ref="fieldName"
            name="fieldName"
            floatingLabelText=""
            fullWidth={true}
            value={newFieldObj.fieldName}
            underlineStyle={this.handleUnderlineStyle('fieldName')}
            onChange={(event, value) => this.setState({ fieldName: value })}
            errorText={this.getValidationMessages('fieldName').join(' ')}
          />
        </TableRowColumn>
        <TableRowColumn className="col-sm-8">
          <SelectFieldWrapper
            ref="fieldType"
            name="fieldType"
            floatingLabelText=""
            options={this.getFieldTypes()}
            value={newFieldObj.fieldType}
            underlineStyle={this.handleUnderlineStyle('fieldType')}
            onChange={(event, index, value) => this.setSelectFieldValue('fieldType', value)}
            errorText={this.getValidationMessages('fieldType').join(' ')}
          />
        </TableRowColumn>
        <TableRowColumn className="col-sm-8">
          <Show if={fieldType === 'reference' || fieldType === 'relation'}>
            <SelectFieldWrapper
              ref="fieldTarget"
              name="fieldTarget"
              options={this.getFieldTargetOptions()}
              value={fieldTarget}
              underlineStyle={this.handleUnderlineStyle('fieldTarget')}
              onChange={(event, index, value) => this.setSelectFieldValue('fieldTarget', value)}
              errorText={this.getValidationMessages('fieldTarget').join(' ')}
            />
          </Show>
        </TableRowColumn>
        <TableRowColumn
          className="col-sm-3"
          style={styles.tableRowColumn}
        >
          <div style={styles.checkBox}>
            {this.renderCheckbox(newFieldObj, 'filter')}
          </div>
        </TableRowColumn>
        <TableRowColumn
          className="col-sm-3"
          style={styles.tableRowColumn}
        >
          <div style={styles.checkBox}>
            {this.renderCheckbox(newFieldObj, 'order')}
          </div>
        </TableRowColumn>
        <TableRowColumn
          className="col-sm-5"
          style={styles.tableRowColumnButton}
        >
          <RaisedButton
            label="Add"
            disabled={!fieldType || !fieldName}
            secondary={false}
            onClick={this.handleFieldAdd}
          />
        </TableRowColumn>
      </TableRow>
    );
  },

  render() {
    const {
      name,
      description,
      canSubmit,
      isLoading,
      open,
      group,
      group_permissions,
      other_permissions,
      metadata,
      fields
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
            disabled={!canSubmit}
            submitDisabled={!fields.length}
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}
          />
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
        }
      >
        {this.renderFormNotifications()}
        <Tabs
          inkBarStyle={styles.inkBarStyle}
          contentContainerStyle={styles.contentContainerStyle}
          tabItemContainerStyle={styles.tabItemContainerStyle}
        >
          <Tab
            style={styles.tab}
            label="GENERAL"
          >
            <Dialog.ContentSection>
              <div style={{ padding: '20px 0 56px 0', width: '100%' }}>
                <TextField
                  ref="name"
                  name="name"
                  autoFocus={true}
                  disabled={this.hasEditMode()}
                  fullWidth={true}
                  value={name}
                  onChange={(event, value) => this.setState({ name: value })}
                  errorText={this.getValidationMessages('name').join(' ')}
                  hintText="Class's name"
                  floatingLabelText="Name"
                />
                <TextField
                  ref="description"
                  name="description"
                  fullWidth={true}
                  value={description}
                  onChange={(event, value) => this.setState({ description: value })}
                  errorText={this.getValidationMessages('description').join(' ')}
                  hintText="Class's description"
                  floatingLabelText="Description (optional)"
                />
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
                  errorText={this.getValidationMessages('group').join(' ')}
                />
              </div>
              <div className="col-flex-1">
                <SelectFieldWrapper
                  name="class"
                  options={permissions}
                  floatingLabelText="Group Permissions"
                  value={group_permissions}
                  onChange={(event, index, value) => this.setSelectFieldValue('group_permissions', value)}
                  errorText={this.getValidationMessages('group_permissions').join(' ')}
                />
              </div>
              <div className="col-flex-1">
                <SelectFieldWrapper
                  name="class"
                  options={permissions}
                  floatingLabelText="Other Permissions"
                  value={other_permissions}
                  onChange={(event, index, value) => this.setSelectFieldValue('other_permissions', value)}
                  errorText={this.getValidationMessages('other_permissions').join(' ')}
                />
              </div>
            </Dialog.ContentSection>
            <div className="vm-2-b">
              <Show if={this.getValidationMessages('schema').length > 0}>
                <Notification
                  className="vm-1-t"
                  type="error"
                >{this.getValidationMessages('schema').join(' ')}
                </Notification>
              </Show>
            </div>
            <Dialog.ContentSection
              style={styles.schemaAddSection}
              title="Schema"
            >
              <Table selectable={false}>
                <TableHeader
                  displaySelectAll={false}
                  adjustForCheckbox={false}
                >
                  <TableRow style={styles.tableHeaderRow}>
                    <TableHeaderColumn
                      style={styles.tableHeaderColumn}
                      className="col-sm-8"
                    >
                      Field Name
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      style={styles.tableHeaderColumn}
                      className="col-sm-8"
                    >
                      Field Type
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      style={styles.tableHeaderColumn}
                      className="col-sm-8"
                    >
                      Target Class
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      style={styles.tableHeaderColumn}
                      className="col-sm-3"
                    >
                      Filter
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      style={styles.tableHeaderColumn}
                      className="col-sm-3"
                    >
                      Order
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      style={styles.tableHeaderColumnButton}
                      className="col-sm-5"
                    >
                      Action
                    </TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {this.renderSchemaFieldRows()}
                  {this.renderSchemaFieldNewRow()}
                </TableBody>
              </Table>
            </Dialog.ContentSection>
          </Tab>
          <Tab
            style={styles.tab}
            label="CUSTOMIZE"
          >
            <div className="row align-middle vp-4-t vp-4-b">
              <div className="col-sm-11">
                <ColorIconPicker.Preview
                  color={metadata.color}
                  icon={metadata.icon}
                />
              </div>
              <div className="col-sm-12">
                <ColorIconPicker.IconPicker
                  selectedIcon={metadata.icon}
                  onIconChange={this.handleIconChange}
                />
              </div>
              <div className="col-sm-12">
                <ColorIconPicker.ColorPicker
                  selectedColor={metadata.color}
                  onColorChange={this.handleColorChange}
                />
              </div>
            </div>
          </Tab>
        </Tabs>
      </Dialog.FullPage>
    );
  }
});
