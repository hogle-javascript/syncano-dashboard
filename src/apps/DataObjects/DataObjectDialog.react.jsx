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

// Components
import MUI from 'material-ui';
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
        validateObj[item.name] = {numericality: true}
      } else if (item.type === 'text') {
        validateObj[item.name] = {length: {maximum: 32000}}
      }
    });
    return validateObj;
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
              date.getDay(),
              time.getHours(),
              time.getMinutes(),
              0
            );

            params[item.name] = dateTime.toISOString();
          }
        } else {
          let fieldValue = this.refs['field-' + item.name].getValue();

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
        let file = this.state['file-' + item.name];

        if (file) {
          fileFields.push({
            name: item.name,
            file
          })
        }
      }
    });

    return fileFields;
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
    })
  },

  handleEditSubmit() {
    DataObjectsActions.updateDataObject({
      className: DataObjectsStore.getCurrentClassName(),
      params: this.getParams(),
      fileFields: this.getFileFields()
    })
  },

  handleFileOnClick(value, event) {
    event.stopPropagation();
    window.open(value, '_blank')
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

  renderBuiltinFields() {
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
              ref='field-channel'
              name='field-channel'
              fullWidth={true}
              disabled={true}
              value={this.state.channel || 'no channel'}
              floatingLabelText='Channel'/>
            <MUI.TextField
              ref='field-channel_room'
              name='field-channel_room'
              fullWidth={true}
              disabled={true}
              value={this.state.channel_room || 'no channel'}
              floatingLabelText='Channel Room'/>
          </div>
        )
      }
      return (
        <div key="add-fields">
          <MUI.SelectField
            ref='field-channel'
            name='field-channel'
            fullWidth={true}
            valueMember="payload"
            displayMember="text"
            floatingLabelText='Channel'
            valueLink={this.linkState('channel')}
            errorText={this.getValidationMessages('channel').join(' ')}
            menuItems={this.state.channels}/>
          <MUI.TextField
            ref='field-channel_room'
            name='field-channel_room'
            fullWidth={true}
            disabled={this.hasEditMode()}
            valueLink={this.linkState('channel_room')}
            errorText={this.getValidationMessages('channel_room').join(' ')}
            hintText='Channel Room'
            floatingLabelText='Channel Room'/>
        </div>
      )
    };

    return (
      <div className='row' style={{padding: 0, margin: 0}}>
        <div className='col-flex-1'>
          <div>Built-in fields</div>
          <MUI.TextField
            ref='field-owner'
            name='owner'
            fullWidth={true}
            valueLink={this.linkState('owner')}
            errorText={this.getValidationMessages('owner').join(' ')}
            hintText='User ID'
            floatingLabelText='Owner'/>
          <MUI.TextField
            ref='field-group'
            name='owner'
            fullWidth={true}
            valueLink={this.linkState('group')}
            errorText={this.getValidationMessages('group').join(' ')}
            hintText='Group ID'
            floatingLabelText='Group'/>
          {renderChannelFields()}
        </div>

        <div className='col-flex-1' style={{paddingLeft: 15}}>
          <div>Permissions</div>
          <MUI.SelectField
            ref='field-owner_permissions'
            name='field-owner_permissions'
            fullWidth={true}
            valueMember="payload"
            displayMember="text"
            valueLink={this.linkState('owner_permissions')}
            floatingLabelText='Owner Permissions'
            errorText={this.getValidationMessages('owner_permissions').join(' ')}
            menuItems={permissions}/>
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
    )
  },

  renderDropZone(item) {
    let dropZoneStyle = {
      height: 80,
      width: 250,
      borderStyle: 'dashed',
      borderWidth: 1,
      borderColor: 'grey',
      color: 'grey'
    };

    let file = this.state['file-' + item.name];
    let description = file ? file.name : null;

    if (description) {
      description = description + ' (' + Filesize(file.size) + ')'
    }
    return (
      <div
        key={'dropzone-' + item.name}
        style={{marginTop: 25}}>
        <div style={{marginBottom: 10, color: 'grey'}}>{item.name + ' (file)'}</div>
        <Dropzone
          ref={'file-' + item.name}
          onDrop={this.onDrop.bind(this, 'file-' + item.name)}
          style={dropZoneStyle}>
          <div style={{padding: 15}}>
            {description || 'Click to select files to upload or drop file here.'}
          </div>
        </Dropzone>
      </div>
    )
  },

  renderCustomFields() {
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
              key={'field-' + item.name}
              ref={'field-' + item.name}
              name={item.name}
              valueLink={this.linkState(item.name)}
              fullWidth={true}
              valueMember="payload"
              displayMember="text"
              floatingLabelText={'Value of ' + item.name}
              errorText={this.getValidationMessages(item.name).join(' ')}
              menuItems={menuItems}/>
          )
        }

        /* eslint-disable no-undefined */

        if (item.type === 'datetime') {
          let value = this.state[item.name]
            ? new Date(this.state[item.name].value)
            : undefined;

          /* eslint-enable no-undefined*/

          let labelStyle = {fontSize: '0.9rem', paddingLeft: 7, paddingTop: 8, color: 'rgba(0,0,0,0.5)'};

          return (
            <div key={'field-' + item.name}>
              <div className="row" style={labelStyle}>
                <div>{item.name} (datetime)</div>
              </div>
              <div className="row">
                <div className="col-flex-1">
                  <MUI.DatePicker
                    ref={'fielddate-' + item.name}
                    textFieldStyle={{width: '100%'}}
                    mode="landscape"

                    /* eslint-disable no-undefined */

                    defaultDate={value || undefined}

                    /* eslint-enable no-undefined */

                    />
                </div>
                <div className="col-flex-1">
                  <MUI.TimePicker
                    ref={'fieldtime-' + item.name}
                    style={{width: '100%'}}

                    /* eslint-disable no-undefined */

                    defaultTime={value || undefined}

                    /* eslint-enable no-undefined */

                    />
                </div>
                <div className="col-xs-5">
                  <MUI.IconButton
                    iconClassName="synicon-close"
                    tooltip={`Clear ${item.name} field`}
                    tooltipPosition="bottom-left"
                    onClick={this.handleClearDateTime.bind(null, item.name)}
                    />
                </div>
              </div>
            </div>
          )
        }

        if (item.type === 'file') {
          if (this.hasEditMode()) {
            if (this.state[item.name]) {
              let url = this.state[item.name].value;

              return (
                <div key={'file-' + item.name}>
                  <div style={{marginTop: 25, color: 'grey'}}>{item.name + ' (file)'}</div>
                  <div className='row' style={{marginTop: 15}}>
                    <div className='col-xs-8'>
                      <MUI.IconButton
                        iconClassName="synicon-download"
                        onClick={this.handleFileOnClick.bind(this, url)}
                        tooltip={url}/>
                    </div>
                    <div className='col-flex-1'>
                      <MUI.FlatButton
                        style={{marginTop: 5}}
                        label='Remove'
                        secondary={true}
                        onClick={this.handleRemoveFile.bind(this, item.name)}/>
                    </div>
                  </div>
                </div>
              )
            }
          }
          return this.renderDropZone(item);
        }

        return (
          <MUI.TextField
            key={'field-' + item.name}
            ref={'field-' + item.name}
            name={item.name}
            fullWidth={true}
            valueLink={this.linkState(item.name)}
            errorText={this.getValidationMessages(item.name).join(' ')}
            hintText={'Field ' + item.name}
            floatingLabelText={item.name + ' (' + item.type + ')'}/>
        )
      })
    }
  },

  render() {
    let editTitle = 'Edit a Data Object #' + this.state.id + ' (' + DataObjectsStore.getCurrentClassName() + ')';
    let addTitle = 'Add a Data Object';
    let title = this.hasEditMode() ? editTitle : addTitle;
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

    return (
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
            <div className="col-xs-15" style={{paddingLeft: 15}}>
              <div>Class fields</div>
              {this.renderCustomFields()}
            </div>
          </div>
        </div>
        <Common.Loading
          type="linear"
          position="bottom"
          show={this.state.isLoading} />
      </Common.Dialog>
    );
  }
});
