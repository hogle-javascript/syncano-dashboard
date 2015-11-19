import React from 'react';
import Reflux from 'reflux';
import Dropzone from 'react-dropzone';
import Filesize from 'filesize';

// Utils
import Mixins from '../../mixins';

// Stores and Actions
import DataObjectsActions from './DataObjectsActions';
import DataObjectDialogStore from './DataObjectDialogStore';
import DataObjectsStore from './DataObjectsStore';
import ChannelsActions from '../Channels/ChannelsActions';
import GroupsStore from '../Users/GroupsStore';
import GroupsActions from '../Users/GroupsActions';

// Components
import MUI from 'syncano-material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'DataObjectDialog',

  mixins: [
    Reflux.connect(DataObjectDialogStore),
    Mixins.Form,
    Mixins.Dialog
  ],

  validatorConstraints() {
    let validateObj = {};

    DataObjectsStore.getCurrentClassObj().schema.map((item) => {
      if (item.type === 'integer') {
        validateObj[item.name] = {numericality: true};
      } else if (item.type === 'text') {
        validateObj[item.name] = {length: {maximum: 32000}};
      }
    });
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
          let date = this.refs[`fielddate-${item.name}`].getDate();
          let time = this.refs[`fieldtime-${item.name}`].getTime();

          params[item.name] = null;

          if (date && this.state[`fielddate-${item.name}`] !== null) {
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

  getEmptyDefaultTime(value) {
    if (value) {
      return false;
    }

    return true;
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
    DataObjectsActions.createDataObject({
      className: DataObjectsStore.getCurrentClassName(),
      params: this.getParams(),
      fileFields: this.getFileFields()
    });
  },

  handleEditSubmit() {
    DataObjectsActions.updateDataObject({
      className: DataObjectsStore.getCurrentClassName(),
      params: this.getParams(),
      fileFields: this.getFileFields()
    });
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

    let emptyTime = new Date();

    emptyTime.setHours(0);
    emptyTime.setMinutes(0);

    this.refs[`fieldtime-${name}`].refs.input.setValue('');

    /* eslint-disable no-undefined */

    this.refs[`fieldtime-${name}`].setState({
      time: undefined,
      dialogTime: new Date()
    });

    /* eslint-enable no-undefined */
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

  renderBuiltinFields() {
    let styles = this.getStyles();
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
        text: 'write',
        payload: 'write'
      },
      {
        text: 'full',
        payload: 'full'
      }
    ];

    let renderChannelFields = () => {
      if (this.hasEditMode()) {
        return (
          <div key="edit-fields">
            <MUI.TextField
              ref="field-channel"
              name="field-channel"
              style={styles.dialogField}
              fullWidth={true}
              disabled={true}
              value={this.state.channel || 'no channel'}
              floatingLabelText="Channel"/>
            <MUI.TextField
              ref="field-channel_room"
              name="field-channel_room"
              style={styles.dialogField}
              fullWidth={true}
              disabled={true}
              value={this.state.channel_room || 'no channel'}
              floatingLabelText="Channel Room"/>
          </div>
        );
      }
      return (
        <div key="add-fields">
          <MUI.SelectField
            ref="field-channel"
            name="field-channel"
            style={styles.dialogField}
            fullWidth={true}
            valueMember="payload"
            displayMember="text"
            floatingLabelText="Channel"
            valueLink={this.linkState('channel')}
            errorText={this.getValidationMessages('channel').join(' ')}
            menuItems={this.state.channels}/>
          <MUI.TextField
            ref="field-channel_room"
            name="field-channel_room"
            style={styles.dialogField}
            fullWidth={true}
            disabled={this.hasEditMode()}
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
          <MUI.TextField
            ref="field-owner"
            name="owner"
            style={styles.dialogField}
            fullWidth={true}
            valueLink={this.linkState('owner')}
            errorText={this.getValidationMessages('owner').join(' ')}
            hintText="User ID"
            floatingLabelText="Owner"/>
          <MUI.SelectField
            ref="group"
            name="group"
            style={styles.dialogField}
            fullWidth={true}
            labelStyle={styles.groupDropdownLabel}
            menuItemStyle={styles.groupMenuItem}
            valueMember="payload"
            displayMember="text"
            valueLink={this.linkState('group')}
            floatingLabelText="Group (ID)"
            errorText={this.getValidationMessages('group').join(' ')}
            menuItems={this.getGroups()}/>
          {renderChannelFields()}
        </div>

        <div
          className="col-flex-1"
          style={styles.customFieldsContainer}>
          <div>Permissions</div>
          <MUI.SelectField
            ref="field-owner_permissions"
            name="field-owner_permissions"
            style={styles.dialogField}
            fullWidth={true}
            valueMember="payload"
            displayMember="text"
            valueLink={this.linkState('owner_permissions')}
            floatingLabelText="Owner Permissions"
            errorText={this.getValidationMessages('owner_permissions').join(' ')}
            menuItems={permissions}/>
          <MUI.SelectField
            ref="field-group_permissions"
            name="field-group_permissions"
            style={styles.dialogField}
            fullWidth={true}
            valueMember="payload"
            displayMember="text"
            valueLink={this.linkState('group_permissions')}
            floatingLabelText="Group Permissions"
            errorText={this.getValidationMessages('group_permissions').join(' ')}
            menuItems={permissions}/>
          <MUI.SelectField
            ref="field-other_permissions"
            name="field-other_permissions"
            style={styles.dialogField}
            fullWidth={true}
            valueMember="payload"
            displayMember="text"
            valueLink={this.linkState('other_permissions')}
            floatingLabelText="Other Permissions"
            errorText={this.getValidationMessages('other_permissions').join(' ')}
            menuItems={permissions}/>
        </div>
      </div>
    );
  },

  renderDropZone(item) {
    let styles = this.getStyles();
    let file = this.state[`file-${item.name}`];
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
    let styles = this.getStyles();

    if (DataObjectsStore.getCurrentClassObj()) {
      return DataObjectsStore.getCurrentClassObj().schema.map((item) => {
        if (item.type === 'boolean') {
          let menuItems = [
            {text: 'True', payload: 'true'},
            {text: 'False', payload: 'false'},
            {text: 'Blank', payload: 'null'}
          ];

          return (
            <MUI.SelectField
              key={`field-${item.name}`}
              ref={`field-${item.name}`}
              name={item.name}
              valueLink={this.linkState(item.name)}
              style={styles.dialogField}
              fullWidth={true}
              valueMember="payload"
              displayMember="text"
              floatingLabelText={`Value of ${item.name}`}
              errorText={this.getValidationMessages(item.name).join(' ')}
              menuItems={menuItems}/>
          );
        }

        /* eslint-disable no-undefined */

        if (item.type === 'datetime') {
          let value = this.state[item.name]
            ? new Date(this.state[item.name].value)
            : undefined;

          /* eslint-enable no-undefined*/

          let labelStyle = {fontSize: '0.9rem', paddingLeft: 7, paddingTop: 8, color: 'rgba(0,0,0,0.5)'};

          return (
            <div key={`field-${item.name}`}>
              <div
                className="row"
                style={labelStyle}>
                <div>{item.name} (datetime)</div>
              </div>
              <div className="row">
                <div className="col-flex-1">
                  <MUI.DatePicker
                    ref={`fielddate-${item.name}`}
                    textFieldStyle={styles.dateField}
                    mode="landscape"
                    defaultDate={value}/>
                </div>
                <div className="col-flex-1">
                  <MUI.TimePicker
                    ref={`fieldtime-${item.name}`}
                    textFieldStyle={styles.dateField}
                    defaultTime={value}
                    emptyDefaultTime={this.getEmptyDefaultTime(value)}/>
                </div>
                <div className="col-xs-5">
                  <MUI.IconButton
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
              let url = this.state[item.name].value;

              return (
                <div key={`file-${item.name}`}>
                  <div style={styles.fileDownload}>{`${item.name} (file)`}</div>
                  <div
                    className="row"
                    style={styles.fileButtonsContainer}>
                    <div className="col-xs-8">
                      <MUI.IconButton
                        iconClassName="synicon-download"
                        onClick={this.handleFileOnClick.bind(this, url)}
                        tooltip={url}/>
                    </div>
                    <div className="col-flex-1">
                      <MUI.FlatButton
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

        return (
          <MUI.TextField
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
    let styles = this.getStyles();
    let editTitle = 'Edit a Data Object #' + this.state.id + ' (' + DataObjectsStore.getCurrentClassName() + ')';
    let addTitle = 'Add a Data Object';
    let title = this.hasEditMode() ? editTitle : addTitle;
    let dialogStandardActions = [
      <MUI.FlatButton
        key="cancel"
        label="Cancel"
        onTouchTap={this.handleCancel}
        ref="cancel"/>,
      <MUI.FlatButton
        type="submit"
        key="confirm"
        label="Confirm"
        primary={true}
        ref="submit"/>
    ];

    return (
      <form
        onSubmit={this.handleFormValidation}
        method="post"
        acceptCharset="UTF-8">
        <Common.Dialog
          ref='dialog'
          title={title}
          onShow={this.handleDialogShow}
          actions={dialogStandardActions}
          onDismiss={this.resetDialogState}>
          <div>
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
          </div>
          <Common.Loading
            type="linear"
            position="bottom"
            show={this.state.isLoading}/>
        </Common.Dialog>
      </form>
    );
  }
});
