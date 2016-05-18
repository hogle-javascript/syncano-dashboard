/* eslint-disable */
import React from 'react';
import Reflux from 'reflux';
import Dropzone from 'react-dropzone';
import Filesize from 'filesize';
import _ from 'lodash';

// Utils
import {DialogMixin, FormMixin} from '../../mixins';

// Stores and Actions
import Actions from './DataObjectsActions';
import Store from './DataObjectDialogStore';
import DataObjectsStore from './DataObjectsStore';
import ChannelsActions from '../Channels/ChannelsActions';
import {GroupsStore, GroupsActions} from '../Groups';

// Components
import {TextField, FlatButton, IconButton, DatePicker, TimePicker} from 'syncano-material-ui';
import {Dialog, SelectFieldWrapper} from '../../common/';

export default React.createClass({
  displayName: 'DataObjectDialog',

  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints() {
    const {channel, channels} = this.state;
    let validateObj = {};

    DataObjectsStore.getCurrentClassObj().schema.map((item) => {
      if (item.type === 'integer') {
        validateObj[item.name] = {numericality: true};
      } else if (item.type === 'text') {
        validateObj[item.name] = {length: {maximum: 32000}};
      } else if (item.type === 'datetime') {
        const isDateSet = this.refs[`fielddate-${item.name}`].refs.input.getValue().length;
        const isTimeSet = this.refs[`fieldtime-${item.name}`].refs.input.getValue().length;
        const validate = (isFieldSet) => {
          const isValid = isDateSet === isTimeSet;

          if (!isValid && !isFieldSet) {
            return {presence: {message: `^Both date and time fields must be filled`}};
          }
          return null;
        };

        validateObj[`fielddate-${item.name}`] = validate(isDateSet);
        validateObj[`fieldtime-${item.name}`] = validate(isTimeSet);
      } else if (item.type === 'geopoint') {
        const latitude = this.refs[`fieldlatitude-${item.name}`].getValue();
        const longitude = this.refs[`fieldlongitude-${item.name}`].getValue();

        const validate = (fieldName, value, minValue, maxValue) => {
          const isValid = !_.isEmpty(latitude) === !_.isEmpty(longitude);

          if (!_.inRange(value, minValue, maxValue)) {
            return { presence: { message: `^${fieldName} has incorrect value` }};
          }

          if (!isValid && !value) {
            return {presence: {message: `^Both latitude and longitude fields must be filled`}};
          }

          return null;
        };

        validateObj[`fieldlatitude-${item.name}`] = validate('latitude', latitude, -90, 90);
        validateObj[`fieldlongitude-${item.name}`] = validate('longitude', longitude, -180, 180);
      }
    });

    validateObj.channel_room = () => {
      if (_.some(channels, {text: channel, type: 'default'})) {
        return {
          length: {
            is: 0,
            message: "field is only available for 'separate_rooms’ Channel type"
          }
        };
      }

      if (channel && channel !== 'no channel') {
        return {
          presence: {
            message: "field is required for 'separate_rooms’ Channel type"
          }
        };
      }
    };

    return validateObj;
  },

  componentDidMount() {
    GroupsActions.fetch();
  },

  getStyles() {
    return {
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
      },
      dialogField: {
        display: 'block'
      },
      dropZone: {
        height: 80,
        width: 250,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: 'grey',
        color: 'grey'
      },
      customFieldsContainer: {
        paddingLeft: 15
      },
      buildInFieldsContainer: {
        padding: 0,
        margin: 0
      },
      removeFileButton: {
        marginTop: 5
      },
      dropZoneContainer: {
        marginTop: 25
      },
      dropZoneHeader: {
        marginBottom: 10,
        color: 'grey'
      },
      dropZoneDescription: {
        padding: 15
      },
      dateField: {
        width: '100%'
      },
      fileDownload: {
        marginTop: 25,
        color: 'grey'
      },
      fileButtonsContainer: {
        marginTop: 15
      }
    };
  },

  getParams() {
    let params = {
      id: this.state.id,
      owner: this.state.owner,
      group: this.state.group,
      channel: this.state.channel !== 'no channel' ? this.state.channel : null,
      channel_room: this.state.channel_room,
      owner_permissions: this.state.owner_permissions,
      group_permissions: this.state.group_permissions,
      other_permissions: this.state.other_permissions
    };

    // All "dynamic" fields
    DataObjectsStore.getCurrentClassObj().schema.map((item) => {
      if (item.type !== 'file') {
        if (item.type === 'boolean') {
          switch (this.state[item.name]) {
            case 'true':
              params[item.name] = true;
              break;
            case 'false':
              params[item.name] = false;
              break;
            case 'null':
              params[item.name] = null;
              break;
            default:
              delete params[item.name];
          }
        } else if (item.type === 'datetime') {
          let dateInput = this.refs[`fielddate-${item.name}`].refs.input.getValue();
          let timeInput = this.refs[`fieldtime-${item.name}`].refs.input.getValue();
          let date = null;
          let time = null;

          params[item.name] = null;

          if (dateInput.length !== 0 && timeInput.length !== 0) {
            date = this.refs[`fielddate-${item.name}`].getDate();
            time = this.refs[`fieldtime-${item.name}`].getTime();

            let dateTime = new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
              time.getHours(),
              time.getMinutes(),
              0
            );

            params[item.name] = dateTime.toISOString();
          }
        } else if (item.type === 'geopoint') {
          const field = this.state[item.name];
          const isFieldEmpty = field ? !field.latitude && !field.longitude : true;

          if (!field || isFieldEmpty) {
            params[item.name] = null
          }

          if (field && !isFieldEmpty) {
            field.latitude = parseFloat(field.latitude);
            field.longitude = parseFloat(field.longitude);
            params[item.name] = field;
          }

        } else {
          let fieldValue = this.refs[`field-${item.name}`].getValue();

          params[item.name] = fieldValue || null;
        }
      } else if (this.state[item.name] === null) {
        params[item.name] = null;
      }
    });

    return params;
  },

  getFileFields() {
    let fileFields = [];

    // Searching for files
    DataObjectsStore.getCurrentClassObj().schema.map((item) => {
      if (item.type === 'file') {
        let file = this.state[`file-${item.name}`];

        if (file) {
          fileFields.push({
            name: item.name,
            file
          });
        }
      }
    });

    return fileFields;
  },

  getGroups() {
    const groups = GroupsStore.getGroups();
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

  onDrop(fieldName, files) {
    let state = {};

    state[fieldName] = files[0];
    this.setState(state);
  },

  handleDialogShow() {
    console.info('DataObjectDialog::handleDialogShow');
    ChannelsActions.fetch();
  },

  handleAddSubmit() {
    const payload = {
      className: DataObjectsStore.getCurrentClassName(),
      fileFields: this.getFileFields()
    };

    Actions.createDataObject(_.merge(payload, this.getParams()));
  },

  handleEditSubmit() {
    const {id} = this.state;
    const payload = {
      className: DataObjectsStore.getCurrentClassName(),
      fileFields: this.getFileFields(),
      id
    };

    Actions.updateDataObject(_.merge(payload, this.getParams()));
  },

  handleFileOnClick(value, event) {
    event.stopPropagation();
    window.open(value, '_blank');
  },

  handleRemoveFile(name) {
    let state = {};

    state[name] = null;
    this.setState(state);
  },

  handleClearDateTime(name) {
    let state = {};

    state[`fielddate-${name}`] = null;
    state[`fieldtime-${name}`] = null;
    this.setState(state);

    /* eslint-disable no-undefined */

    this.refs[`fielddate-${name}`].setState({
      date: undefined,
      dialogDate: new Date()
    });

    /* eslint-enable no-undefined */

    this.refs[`fieldtime-${name}`].setTime();
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

  handleGeopointFieldChange(fieldName, key, value) {
    const field = this.state[fieldName] || {};
    const isNumberRegExp = /^(\-?\d+(\.\d+)?)/;
    const isEmptyField = _.isString(value) && _.isEmpty(value);
    const onlyMinus = value.length === 1 && _.startsWith(value, '-');

    field[key] = '';

    if (!isEmptyField && !onlyMinus && isNumberRegExp.test(value) || onlyMinus) {
      field[key] = value;
    }

    this.setState({[`${fieldName}`]: field});
  },

  renderBuiltinFields() {
    const styles = this.getStyles();
    const {channel, channel_room, channels} = this.state;
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
        text: 'write',
        payload: 'write'
      },
      {
        text: 'full',
        payload: 'full'
      }
    ];

    const renderChannelFields = () => {
      if (this.hasEditMode()) {
        return (
          <div key="edit-fields">
            <TextField
              ref="field-channel"
              name="field-channel"
              style={styles.dialogField}
              fullWidth={true}
              disabled={true}
              value={channel || 'no channel'}
              floatingLabelText="Channel"/>
            <TextField
              ref="field-channel_room"
              name="channel_room"
              style={styles.dialogField}
              fullWidth={true}
              disabled={true}
              value={channel_room || 'no channel'}
              floatingLabelText="Channel Room"/>
          </div>
        );
      }
      return (
        <div key="add-fields">
          <SelectFieldWrapper
            name="field-channel"
            floatingLabelText="Channel"
            options={channels}
            value={channel}
            style={styles.dialogField}
            onChange={(event, index, value) => this.setSelectFieldValue('channel', value)}
            errorText={this.getValidationMessages('channel').join(' ')}/>
          <TextField
            ref="field-channel_room"
            name="field-channel_room"
            style={styles.dialogField}
            fullWidth={true}
            disabled={this.hasEditMode() || !channel || channel === 'no channel'}
            valueLink={this.linkState('channel_room')}
            errorText={this.getValidationMessages('channel_room').join(' ')}
            hintText="Channel Room"
            floatingLabelText="Channel Room"/>
        </div>
      );
    };

    return (
      <div
        className="row"
        style={styles.buildInFieldsContainer}>
        <div className="col-flex-1">
          <div>Built-in fields</div>
          <TextField
            ref="field-owner"
            name="owner"
            style={styles.dialogField}
            fullWidth={true}
            valueLink={this.linkState('owner')}
            errorText={this.getValidationMessages('owner').join(' ')}
            hintText="User ID"
            floatingLabelText="Owner"/>
          <SelectFieldWrapper
            name="group"
            options={this.getGroups()}
            value={this.state.group}
            floatingLabelText="Group (ID)"
            labelStyle={styles.groupDropdownLabel}
            menuItemStyle={styles.groupMenuItem}
            style={styles.dialogField}
            onChange={(event, index, value) => this.setSelectFieldValue('group', value)}
            errorText={this.getValidationMessages('group').join(' ')}/>
          {renderChannelFields()}
        </div>

        <div
          className="col-flex-1"
          style={styles.customFieldsContainer}>
          <div>Permissions</div>
          <SelectFieldWrapper
            name="owner_permissions"
            floatingLabelText="Owner Permissions"
            options={permissions}
            style={styles.dialogField}
            value={this.state.owner_permissions}
            onChange={(event, index, value) => this.setSelectFieldValue('owner_permissions', value)}
            errorText={this.getValidationMessages('owner_permissions').join(' ')}/>
          <SelectFieldWrapper
            name="group_permissions"
            floatingLabelText="Group Permissions"
            options={permissions}
            style={styles.dialogField}
            value={this.state.group_permissions}
            onChange={(event, index, value) => this.setSelectFieldValue('group_permissions', value)}
            errorText={this.getValidationMessages('group_permissions').join(' ')}/>
          <SelectFieldWrapper
            name="other_permissions"
            floatingLabelText="Other Permissions"
            options={permissions}
            style={styles.dialogField}
            value={this.state.other_permissions}
            onChange={(event, index, value) => this.setSelectFieldValue('other_permissions', value)}
            errorText={this.getValidationMessages('other_permissions').join(' ')}/>
        </div>
      </div>
    );
  },

  renderDropZone(item) {
    const styles = this.getStyles();
    const file = this.state[`file-${item.name}`];
    let description = file ? file.name : null;

    if (description) {
      description = description + ' (' + Filesize(file.size) + ')';
    }
    return (
      <div
        key={`dropzone-${item.name}`}
        style={styles.dropZoneContainer}>
        <div style={styles.dropZoneHeader}>{`${item.name} (file)`}</div>
        <Dropzone
          ref={`file-${item.name}`}
          onDrop={this.onDrop.bind(this, 'file-' + item.name)}
          style={styles.dropZone}>
          <div style={styles.dropZoneDescription}>
            {description || 'Click to select files to upload or drop file here.'}
          </div>
        </Dropzone>
      </div>
    );
  },

  renderCustomFields() {
    const styles = this.getStyles();

    if (DataObjectsStore.getCurrentClassObj()) {
      return DataObjectsStore.getCurrentClassObj().schema.map((item) => {
        if (item.type === 'boolean') {
          let menuItems = [
            {text: 'True', payload: 'true'},
            {text: 'False', payload: 'false'},
            {text: 'Blank', payload: 'null'}
          ];

          return (
            <SelectFieldWrapper
              name={item.name}
              options={menuItems}
              floatingLabelText={`Value of ${item.name}`}
              value={this.state[item.name]}
              style={styles.dialogField}
              onChange={(event, index, value) => this.setSelectFieldValue(item.name, value)}
              errorText={this.getValidationMessages(item.name).join(' ')}/>
          );
        }

        /* eslint-disable no-undefined */

        if (item.type === 'datetime') {
          const value = this.state[item.name] ? new Date(this.state[item.name].value) : undefined;

        /* eslint-enable no-undefined*/

          const labelStyle = {fontSize: '0.9rem', paddingLeft: 7, paddingTop: 8, color: 'rgba(0,0,0,0.5)'};

          return (
            <div key={`field-${item.name}`}>
              <div
                className="row"
                style={labelStyle}>
                <div>{item.name} (datetime)</div>
              </div>
              <div className="row">
                <div className="col-flex-1">
                  <DatePicker
                    errorText={this.getValidationMessages(`fielddate-${item.name}`).join(' ')}
                    ref={`fielddate-${item.name}`}
                    textFieldStyle={styles.dateField}
                    mode="landscape"
                    defaultDate={value}/>
                </div>
                <div className="col-flex-1">
                  <TimePicker
                    errorText={this.getValidationMessages(`fieldtime-${item.name}`).join(' ')}
                    ref={`fieldtime-${item.name}`}
                    textFieldStyle={styles.dateField}
                    defaultTime={value}/>
                </div>
                <div className="col-xs-5">
                  <IconButton
                    iconClassName="synicon-close"
                    tooltip={`Clear ${item.name} field`}
                    tooltipPosition="bottom-left"
                    onClick={this.handleClearDateTime.bind(null, item.name)}/>
                </div>
              </div>
            </div>
          );
        }

        if (item.type === 'file') {
          if (this.hasEditMode()) {
            if (this.state[item.name]) {
              const url = this.state[item.name].value;

              return (
                <div key={`file-${item.name}`}>
                  <div style={styles.fileDownload}>{`${item.name} (file)`}</div>
                  <div
                    className="row"
                    style={styles.fileButtonsContainer}>
                    <div className="col-xs-8">
                      <IconButton
                        iconClassName="synicon-download"
                        onClick={this.handleFileOnClick.bind(this, url)}
                        tooltip={url}/>
                    </div>
                    <div className="col-flex-1">
                      <FlatButton
                        style={styles.removeFileButton}
                        label="Remove"
                        secondary={true}
                        onClick={this.handleRemoveFile.bind(this, item.name)}/>
                    </div>
                  </div>
                </div>
              );
            }
          }
          return this.renderDropZone(item);
        }

        if (item.type === 'object' || item.type === 'array') {
          const value = this.state[item.name] ? JSON.stringify(this.state[item.name]) : '';
          const handleChange = (event) => {
            const state = {};

            state[item.name] = event.target.value;
            this.setState(state);
          };

          return (
            <TextField
              key={`field-${item.name}`}
              ref={`field-${item.name}`}
              name={item.name}
              style={styles.dialogField}
              fullWidth={true}
              onChange={handleChange}
              defaultValue={value}
              errorText={this.getValidationMessages(item.name).join(' ')}
              hintText={`Field ${item.name}`}
              floatingLabelText={`${item.name} (${item.type})`}/>
          );
        }

        if (item.type === 'geopoint') {
          const latitude = this.state[item.name] ? this.state[item.name].latitude : '';
          const longitude = this.state[item.name] ? this.state[item.name].longitude : '';
          const labelStyle = {fontSize: '0.9rem', paddingLeft: 7, paddingTop: 8, color: 'rgba(0,0,0,0.5)'};

          return (
            <div key={`field-${item.name}`}>
              <div
                className="row"
                style={labelStyle}>
                <div>{item.name} ({item.type})</div>
              </div>
              <div className="row">
                <div className="col-flex-1">
                  <TextField
                    key={`fieldlatitude-${item.name}`}
                    ref={`fieldlatitude-${item.name}`}
                    name={item.name}
                    style={styles.dialogField}
                    fullWidth={true}
                    value={latitude}
                    onChange={(event) => this.handleGeopointFieldChange(item.name, 'latitude', event.target.value)}
                    errorText={this.getValidationMessages(`fieldlatitude-${item.name}`).join(' ')}
                    hintText={`latitude`} />
                </div>
                <div className="col-flex-1">
                  <TextField
                    key={`fieldlongitude-${item.name}`}
                    ref={`fieldlongitude-${item.name}`}
                    name={item.name}
                    style={styles.dialogField}
                    fullWidth={true}
                    value={longitude}
                    onChange={(event) => this.handleGeopointFieldChange(item.name, 'longitude', event.target.value)}
                    errorText={this.getValidationMessages(`fieldlongitude-${item.name}`).join(' ')}
                    hintText={`longitude`} />
                </div>
              </div>
            </div>
          );
        }

        return (
          <TextField
            key={`field-${item.name}`}
            ref={`field-${item.name}`}
            name={item.name}
            style={styles.dialogField}
            fullWidth={true}
            valueLink={this.linkState(item.name)}
            errorText={this.getValidationMessages(item.name).join(' ')}
            hintText={`Field ${item.name}`}
            floatingLabelText={`${item.name} (${item.type})`}/>
        );
      });
    }
  },

  render() {
    const styles = this.getStyles();
    const editTitle = `Edit a Data Object #${this.state.id} (${DataObjectsStore.getCurrentClassName()})`;
    const addTitle = 'Add a Data Object';
    const title = this.hasEditMode() ? editTitle : addTitle;

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={title}
        onRequestClose={this.handleCancel}
        open={this.state.open}
        isLoading={this.state.isLoading}
        actions={
          <Dialog.StandardButtons
            disabled={!this.state.canSubmit}
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}/>
        }>
        {this.renderFormNotifications()}
        <div className="row">
          <div className="col-xs-20">
            {this.renderBuiltinFields()}
          </div>
          <div
            className="col-xs-15"
            style={styles.customFieldsContainer}>
            <div>Class fields</div>
            {this.renderCustomFields()}
          </div>
        </div>
      </Dialog.FullPage>
    );
  }
});
