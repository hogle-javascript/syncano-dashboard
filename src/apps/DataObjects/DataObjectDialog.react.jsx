import React from 'react';
import Reflux from 'reflux';
import Dropzone from 'react-dropzone';

// Utils
import FormMixin from '../../mixins/FormMixin';
import DialogMixin from '../../mixins/DialogMixin';

// Stores and Actions
import DataObjectsActions from './DataObjectsActions';
import DataObjectDialogStore from './DataObjectDialogStore';
import DataObjectsStore from './DataObjectsStore';
import ChannelsActions from '../Channels/ChannelsActions';
import CodeBoxesStore from '../CodeBoxes/CodeBoxesStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'DataObjectDialog',

  mixins: [
    React.addons.LinkedStateMixin,
    Reflux.connect(DataObjectDialogStore),
    FormMixin,
    DialogMixin
  ],

  handleDialogShow() {
    console.info('DataObjectDialog::handleDialogShow');
    ChannelsActions.fetch();
  },

  validatorConstraints() {
    var validateObj = {};
    DataObjectsStore.getCurrentClassObj().schema.map(function(item) {
      if (item.type === 'integer') {
        validateObj[item.name] = {numericality: true}
      } else if (item.type === 'text') {
        validateObj[item.name] = {length: {maximum: 32000}}
      }
    });
    return validateObj;
  },

  getParams() {
    var params = {
      id                : this.state.id,
      owner             : this.state.owner,
      group             : this.state.group,
      channel           : this.state.channel !== 'no channel' ? this.state.channel : null,
      channel_room      : this.state.channel_room,
      owner_permissions : this.state.owner_permissions,
      group_permissions : this.state.group_permissions,
      other_permissions : this.state.other_permissions
    };

    // All "dynamic" fields
    DataObjectsStore.getCurrentClassObj().schema.map(function(item) {
      if (item.type !== 'file') {
        if (item.type === 'boolean') {
          params[item.name] = this.state['field-' + item.name];
        } else {
          var fieldValue = this.refs['field-' + item.name].getValue();
          if (fieldValue) {
            params[item.name] = fieldValue;
          }
        }
      }
    }.bind(this));

    return params;
  },

  getFileFields() {
    var fileFields = [];

    // Searching for files
    DataObjectsStore.getCurrentClassObj().schema.map(function(item) {
      if (item.type === 'file') {
        var file = this.state['file-' + item.name];
        if (file) {
          fileFields.push({
            name: item.name,
            file: file
          })
        }
      }
    }.bind(this));
    return fileFields;
  },

  handleAddSubmit() {
    DataObjectsActions.createDataObject({
      className  : DataObjectsStore.getCurrentClassName(),
      params     : this.getParams(),
      fileFields : this.getFileFields()
    })
  },

  handleEditSubmit() {
    DataObjectsActions.updateDataObject({
      className  : DataObjectsStore.getCurrentClassName(),
      params     : this.getParams(),
      fileFields : this.getFileFields()
    })
  },

  renderBuiltinFields() {
    var permissions = [
      {
        text    : 'none',
        payload : 'none'
      },
      {
        text    : 'read',
        payload : 'read'
      },
      {
        text    : 'write',
        payload : 'write'
      },
      {
        text    : 'full',
        payload : 'full'
      }
    ];

    let renderChannelFields = function() {
      if (this.hasEditMode()) {
        return (
          <div>
            <MUI.TextField
              ref               = 'field-channel'
              name              = 'field-channel'
              fullWidth         = {true}
              disabled          = {true}
              floatingLabelText = {this.state.channel || 'no channel'}
            />
            <MUI.TextField
              ref               = 'field-channel_room'
              name              = 'field-channel_room'
              fullWidth         = {true}
              disabled          = {true}
              floatingLabelText = {this.state.channel_room || 'no channel'}
            />
          </div>
        )
      }
      return (
        <div>
          <MUI.SelectField
            ref               = 'field-channel'
            name              = 'field-channel'
            fullWidth         = {true}
            valueMember       = "payload"
            displayMember     = "text"
            floatingLabelText = 'Channel'
            valueLink         = {this.linkState('channel')}
            errorText         = {this.getValidationMessages('channel').join(' ')}
            menuItems         = {this.state.channels}
          />
          <MUI.TextField
            ref               = 'field-channel_room'
            name              = 'field-channel_room'
            fullWidth         = {true}
            disabled          = {this.hasEditMode()}
            valueLink         = {this.linkState('channel_room')}
            errorText         = {this.getValidationMessages('channel_room').join(' ')}
            hintText          = 'Channel Room'
            floatingLabelText = 'Channel Room'
          />
        </div>
      )
    }.bind(this);

    return [
      <div className='row' style={{padding: 0, margin: 0}}>
        <div className='col-flex-1'>
          <div>Built-in fields</div>
          <MUI.TextField
            ref               = 'field-owner'
            name              = 'owner'
            fullWidth         = {true}
            valueLink         = {this.linkState('owner')}
            errorText         = {this.getValidationMessages('owner').join(' ')}
            hintText          = 'User ID'
            floatingLabelText = 'Owner'
          />
          <MUI.TextField
            ref               = 'field-group'
            name              = 'owner'
            fullWidth         = {true}
            valueLink         = {this.linkState('group')}
            errorText         = {this.getValidationMessages('group').join(' ')}
            hintText          = 'Group ID'
            floatingLabelText = 'Group'
          />
          {renderChannelFields()}
        </div>

        <div className='col-flex-1' style={{paddingLeft: 15}}>
          <div>Permissions</div>

          <MUI.SelectField
            ref               = 'field-owner_permissions'
            name              = 'field-owner_permissions'
            fullWidth         = {true}
            valueMember       = "payload"
            displayMember     = "text"
            valueLink         = {this.linkState('owner_permissions')}
            floatingLabelText = 'Owner Permissions'
            errorText         = {this.getValidationMessages('owner_permissions').join(' ')}
            menuItems         = {permissions}
          />

          <MUI.SelectField
            ref               = 'field-group_permissions'
            name              = 'field-group_permissions'
            fullWidth         = {true}
            valueMember       = "payload"
            displayMember     = "text"
            valueLink         = {this.linkState('group_permissions')}
            floatingLabelText = 'Group Permissions'
            errorText         = {this.getValidationMessages('group_permissions').join(' ')}
            menuItems         = {permissions}
          />

          <MUI.SelectField
            ref               = 'field-other_permissions'
            name              = 'field-other_permissions'
            fullWidth         = {true}
            valueMember       = "payload"
            displayMember     = "text"
            valueLink         = {this.linkState('other_permissions')}
            floatingLabelText = 'Other Permissions'
            errorText         = {this.getValidationMessages('other_permissions').join(' ')}
            menuItems         = {permissions}
          />
        </div>
      </div>
      ]
  },

  onDrop(fieldName, files) {
    var state = {};
    state[fieldName] = files[0];
    this.setState(state);
  },

  handleFileOnClick(value, event) {
    event.stopPropagation();
    window.open(value, '_blank')
  },

  handleRemoveFile(name) {
    var state = {};
    state[name] = null;
    this.setState(state);
  },

  renderDropZone(item) {
    var dropZoneStyle = {
      height      : 80,
      width       : 250,
      borderStyle : 'dashed',
      borderWidth : 1,
      borderColor : 'grey',
      color       : 'grey'
    };

    var file        = this.state['file-' + item.name],
        description = file ? file.name : null;

    if (description) {
      description = description + ' (' + file.size + ' bytes)'
    }
    return (
      <div style={{marginTop: 25}}>
        <div style={{marginBottom: 10, color: 'grey'}}>{item.name + ' (file)'}</div>
        <Dropzone
          ref    = {'file-' + item.name}
          onDrop = {this.onDrop.bind(this, 'file-' + item.name)}
          style  = {dropZoneStyle}
        >
          <div style={{padding: 15}}>
            {description || 'Click to select files to upload or drop file here.'}
          </div>
        </Dropzone>
      </div>
    )
  },

  handleBoolFieldChange(fieldName, event, value, valueObj) {
    let state = {};
    state['field-' + fieldName] = valueObj.payload;
    this.setState(state)
  },

  renderCustomFields() {

    if (DataObjectsStore.getCurrentClassObj()) {

      return DataObjectsStore.getCurrentClassObj().schema.map(function(item) {
        if (item.type === 'boolean') {
          return (
            <MUI.SelectField
              ref               = {'field-' + item.name}
              name              = {item.name}
              onChange          = {this.handleBoolFieldChange.bind(this, item.name)}
              fullWidth         = {true}
              valueMember       = "payload"
              displayMember     = "text"
              floatingLabelText = {'Value of ' + item.name}
              errorText         = {this.getValidationMessages(item.name).join(' ')}
              menuItems         = {[{text: 'True', payload: true}, {text: 'False', payload: false}]}
            />
          )
        }

        if (item.type  === 'file') {

          if (this.hasEditMode()) {
            if (this.state[item.name]) {
              var url = this.state[item.name].value;
              return [
                <div style={{marginTop: 25, color: 'grey'}}>{item.name + ' (file)'}</div>,
                <div className='row' style={{marginTop: 15}}>
                  <div className='col-xs-8'>
                    <MUI.IconButton
                     iconClassName = "synicon-download"
                     onClick       = {this.handleFileOnClick.bind(this, url)}
                     tooltip       = {url}
                    />
                  </div>
                  <div className='col-flex-1'>
                    <MUI.FlatButton
                      style     = {{marginTop: 5}}
                      label     = 'Remove'
                      secondary = {true}
                      onClick   = {this.handleRemoveFile.bind(this, item.name)}
                    />
                  </div>
                </div>
              ]
            }
          }
          return this.renderDropZone(item);
        }

        return (
          <MUI.TextField
            ref               = {'field-' + item.name}
            name              = {item.name}
            fullWidth         = {true}
            valueLink         = {this.linkState(item.name)}
            errorText         = {this.getValidationMessages(item.name).join(' ')}
            hintText          = {'Field ' + item.name}
            floatingLabelText = {item.name + ' (' + item.type + ')'}
          />
        )
      }.bind(this))
    }
  },

  render() {

    var editTitle   = 'Edit Data Object #' + this.state.id + ' (' + DataObjectsStore.getCurrentClassName() + ')',
        addTitle    = 'Add Data Object',
        title       = this.hasEditMode() ? editTitle : addTitle,
        submitLabel = 'Confirm',
        dialogStandardActions = [
          {
            ref        : 'cancel',
            text       : 'Cancel',
            onTouchTap : this.handleCancel
          },
          {
            ref        : 'submit',
            text       : {submitLabel},
            onTouchTap : this.handleFormValidation
          }
        ];

    return (
      <MUI.Dialog
        ref       = 'dialog'
        title     = {title}
        onShow    = {this.handleDialogShow}
        actions   = {dialogStandardActions}
        onDismiss = {this.resetDialogState}
      >
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
      </MUI.Dialog>
    );
  }
});
