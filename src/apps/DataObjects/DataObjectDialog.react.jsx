var React                 = require('react'),
    Reflux                = require('reflux'),
    Dropzone              = require('react-dropzone'),

    // Utils
    FormMixin             = require('../../mixins/FormMixin'),
    DialogMixin           = require('../../mixins/DialogMixin'),
    Show                  = require('../../common/Show/Show.react'),

    // Stores and Actions
    DataObjectsActions    = require('./DataObjectsActions'),
    DataObjectDialogStore = require('./DataObjectDialogStore'),
    DataObjectsStore      = require('./DataObjectsStore'),
    ChannelsActions       = require('../Channels/ChannelsActions'),
    CodeBoxesStore        = require('../CodeBoxes/CodeBoxesStore'),

    // Components
    mui                   = require('material-ui'),
    FlatButton            = mui.FlatButton,
    IconButton            = mui.IconButton,
    TextField             = mui.TextField,
    SelectField           = mui.SelectField,
    DropDownMenu          = mui.DropDownMenu,
    Dialog                = mui.Dialog;

module.exports = React.createClass({

  displayName: 'DataObjectDialog',

  mixins: [
    React.addons.LinkedStateMixin,
    Reflux.connect(DataObjectDialogStore),
    FormMixin,
    DialogMixin
  ],

  handleDialogShow: function() {
    console.info('DataObjectDialog::handleDialogShow');
    ChannelsActions.fetch();
  },

  validatorConstraints: function() {
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

  getParams: function() {
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
        var fieldValue = this.refs['field-' + item.name].getValue();
        if (fieldValue) {
          params[item.name] = fieldValue;
        }
      }
    }.bind(this));

    return params;
  },

  getFileFields: function() {
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

  handleAddSubmit: function() {

    DataObjectsActions.createDataObject({
      className  : DataObjectsStore.getCurrentClassName(),
      params     : this.getParams(),
      fileFields : this.getFileFields()
    })
  },

  handleEditSubmit: function() {
    DataObjectsActions.updateDataObject({
      className  : DataObjectsStore.getCurrentClassName(),
      params     : this.getParams(),
      fileFields : this.getFileFields()
    })
  },

  renderBuiltinFields: function() {
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

    return [
      <div className='row' style={{padding: 0, margin: 0}}>
        <div className='col-flex-1'>
          <div>Built-in fields</div>
          <TextField
            ref               = {'field-owner'}
            name              = 'owner'
            fullWidth         = {true}
            valueLink         = {this.linkState('owner')}
            errorText         = {this.getValidationMessages('owner').join(' ')}
            hintText          = {'User ID'}
            floatingLabelText = {'Owner'} />

          <TextField
            ref               = {'field-group'}
            name              = 'owner'
            fullWidth         = {true}
            valueLink         = {this.linkState('group')}
            errorText         = {this.getValidationMessages('group').join(' ')}
            hintText          = {'Group ID'}
            floatingLabelText = {'Group'} />

          <SelectField
            ref               = {'field-channel'}
            name              = {'field-channel'}
            fullWidth         = {true}
            valueMember       = "payload"
            displayMember     = "text"
            floatingLabelText = {'Channel'}
            valueLink         = {this.linkState('channel')}
            errorText         = {this.getValidationMessages('channel').join(' ')}
            menuItems         = {this.state.channels} />,

          <TextField
            ref               = {'field-channel_room'}
            name              = 'field-channel_room'
            fullWidth         = {true}
            valueLink         = {this.linkState('channel_room')}
            errorText         = {this.getValidationMessages('channel_room').join(' ')}
            hintText          = {'Channel Room'}
            floatingLabelText = {'Channel Room'} />
        </div>

      <div className='col-flex-1' style={{paddingLeft: 15}}>
        <div>Permissions</div>

        <SelectField
          ref               = {'field-owner_permissions'}
          name              = {'field-owner_permissions'}
          fullWidth         = {true}
          valueMember       = "payload"
          displayMember     = "text"
          valueLink         = {this.linkState('owner_permissions')}
          floatingLabelText = {'Owner Permissions'}
          errorText         = {this.getValidationMessages('owner_permissions').join(' ')}
          menuItems         = {permissions} />

          <SelectField
            ref               = {'field-group_permissions'}
            name              = {'field-group_permissions'}
            fullWidth         = {true}
            valueMember       = "payload"
            displayMember     = "text"
            valueLink         = {this.linkState('group_permissions')}
            floatingLabelText = {'Group Permissions'}
            errorText         = {this.getValidationMessages('group_permissions').join(' ')}
            menuItems         = {permissions} />

          <SelectField
            ref               = {'field-other_permissions'}
            name              = {'field-other_permissions'}
            fullWidth         = {true}
            valueMember       = "payload"
            displayMember     = "text"
            valueLink         = {this.linkState('other_permissions')}
            floatingLabelText = {'Other Permissions'}
            errorText         = {this.getValidationMessages('other_permissions').join(' ')}
            menuItems         = {permissions} />
        </div>
      </div>
      ]
  },

  onDrop: function(fieldName, files) {
    var state = {};
    state[fieldName] = files[0];
    this.setState(state);
  },

  handleFileOnClick: function(value, event) {
    event.stopPropagation();
    window.open(value, '_blank')
  },

  handleRemoveFile: function(name) {
    var state = {};
    state[name] = null;
    this.setState(state);
  },

  renderDropZone: function(item) {

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
          style  = {dropZoneStyle} >
          <div style={{padding: 15}}>
            {description || 'Click to select files to upload or drop file here.'}
          </div>
        </Dropzone>
      </div>
    )
  },

  renderCustomFields: function() {

    if (DataObjectsStore.getCurrentClassObj()) {

      return DataObjectsStore.getCurrentClassObj().schema.map(function(item) {
        if (item.type === 'boolean') {
          return (
            <SelectField
              ref               = {item.name}
              name              = {item.name}
              fullWidth         = {true}
              valueMember       = "payload"
              displayMember     = "text"
              floatingLabelText = {'Value of ' + item.name}
              errorText         = {this.getValidationMessages(item.name).join(' ')}
              menuItems         = {[{text: 'True', payload: true}, {text: 'False', payload: false}]} />
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
                    <IconButton
                     iconClassName = "synicon-download"
                     onClick       = {this.handleFileOnClick.bind(this, url)}
                     tooltip       = {url} />
                  </div>

                  <div className='col-flex-1'>
                    <FlatButton
                      style     = {{marginTop: 5}}
                      label     = 'Remove'
                      secondary = {true}
                      onClick   = {this.handleRemoveFile.bind(this, item.name)} />
                  </div>

                </div>
              ]
            }
          }
          return this.renderDropZone(item);
        }

        return (
          <TextField
              ref               = {'field-' + item.name}
              name              = {item.name}
              fullWidth         = {true}
              valueLink         = {this.linkState(item.name)}
              errorText         = {this.getValidationMessages(item.name).join(' ')}
              hintText          = {'Field ' + item.name}
              floatingLabelText = {item.name + ' (' + item.type + ')'} />
        )
      }.bind(this))
    }
  },

  render: function() {

    var editTitle   = 'Edit Data Object #' + this.state.id + ' (' + DataObjectsStore.getCurrentClassName() + ')',
        addTitle    = 'Add Data Object',
        title       = this.hasEditMode() ? editTitle : addTitle,
        submitLabel = 'Confirm',

        dialogStandardActions = [
          {
            ref     : 'cancel',
            text    : 'Cancel',
            onClick : this.handleCancel
          },
          {
            ref     : 'submit',
            text    : {submitLabel},
            onClick : this.handleFormValidation
          }
        ];

    return (
      <Dialog
        ref       = 'dialog'
        title     = {title}
        onShow    = {this.handleDialogShow}
        actions   = {dialogStandardActions}
        onDismiss = {this.resetDialogState}>
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
      </Dialog>
    );
  }

});
