var React               = require('react'),
    Reflux              = require('reflux'),

    // Utils
    DialogMixin         = require('../../mixins/DialogMixin'),
    FormMixin           = require('../../mixins/FormMixin'),

    // Stores and Actions
    ChannelsStore       = require('./ChannelsStore'),
    ChannelsActions     = require('./ChannelsActions'),
    ChannelDialogStore  = require('./ChannelDialogStore'),

    // Components
    mui                 = require('material-ui'),
    TextField           = mui.TextField,
    Toggle              = mui.Toggle,
    DropDownMenu        = mui.DropDownMenu,
    SelectField         = mui.SelectField,
    Dialog              = mui.Dialog,
    Loading             = require('../../common/Loading/Loading.react.jsx');

module.exports = React.createClass({

  displayName: 'ChannelDialog',

  mixins: [
    React.addons.LinkedStateMixin,

    Reflux.connect(ChannelDialogStore),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints: {
    name: {
      presence: true
    },
    type: {
      presence: true
    }
  },

  getParams: function() {
    return {
      name              : this.state.name,
      description       : this.state.description,
      type              : this.state.type,
      group             : this.state.group,
      custom_publish    : this.state.custom_publish,
      other_permissions : this.state.other_permissions,
      group_permissions : this.state.group_permissions
    }
  },

  handleDialogShow: function() {
    console.info('ScheduleDialog::handleDialogShow');
  },

  handleEditSubmit: function() {
    ChannelsActions.updateChannel(this.state.name, this.getParams());
  },

  handleAddSubmit: function() {
    ChannelsActions.createChannel(this.getParams());
  },

  handleToogle: function(event, status) {
    var state = {};
    state[event.target.name] = status;
    this.setState(state);
  },

  render: function() {
    var title       = this.hasEditMode() ? 'Edit' : 'Add',
        submitLabel = this.hasEditMode() ? 'Save changes' : 'Create Channel',
        dialogStandardActions = [
          {
            text    : 'Cancel',
            onClick : this.handleCancel,
            ref     : 'cancel'
          }, {
            text    : submitLabel,
            onClick : this.handleFormValidation,
            ref     : 'submit'
          }
        ];

    return (
      <div>
        <Dialog
          ref          = 'dialog'
          title        = {title + ' Channel'}
          actions      = {dialogStandardActions}
          onDismiss    = {this.resetDialogState}
          onShow       = {this.handleDialogShow}
          contentStyle = {{padding: '8px 0 0 0'}}  >
          <div>
            {this.renderFormNotifications()}

            <div className="row">
              <div className="col-md-12">

                <TextField
                  ref               = 'name'
                  valueLink         = {this.linkState('name')}
                  errorText         = {this.getValidationMessages('name').join(' ')}
                  name              = 'name'
                  fullWidth         = {true}
                  hintText          = 'Short name for your Channel'
                  floatingLabelText = 'Label of Channel' />

              </div>
              <div className="col-flex-1">

                <TextField
                  ref               = 'description'
                  name              = 'description'
                  valueLink         = {this.linkState('description')}
                  errorText         = {this.getValidationMessages('description').join(' ')}
                  fullWidth         = {true}
                  hintText          = 'Description of Channel (optional)'
                  floatingLabelText = 'Description of Channel' />
              </div>
            </div>

            <SelectField
              ref               = 'type'
              name              = 'type'
              floatingLabelText = 'Channel type'
              valueLink         = {this.linkState('type')}
              errorText         = {this.getValidationMessages('type').join(' ')}
              valueMember       = 'payload'
              displayMember     = 'text'
              fullWidth         = {true}
              selectedIndex     = {0}
              menuItems         = {ChannelsStore.getChannelTypesDropdown()} />

            <div style={{marginTop: 40}}>Permissions</div>
            <div className="row">
              <div className="col-flex-1">
                <TextField
                  ref               = 'group'
                  name              = 'group'
                  fullWidth         = {true}
                  valueLink         = {this.linkState('group')}
                  errorText         = {this.getValidationMessages('group').join(' ')}
                  hintText          = 'ID of the Group'
                  floatingLabelText = 'Group (ID)' />
              </div>
              <div className="col-flex-1">
                <SelectField
                  ref               = 'group_permissions'
                  name              = 'group_permissions'
                  floatingLabelText = 'Group permissions'
                  valueLink         = {this.linkState('group_permissions')}
                  errorText         = {this.getValidationMessages('group_permissions').join(' ')}
                  valueMember       = 'payload'
                  displayMember     = 'text'
                  fullWidth         = {true}
                  selectedIndex     = {0}
                  menuItems         = {ChannelsStore.getChannelPermissionsDropdown()} />
              </div>
              <div className="col-flex-1">
                <SelectField
                  ref               = 'other_permissions'
                  name              = 'other_permissions'
                  floatingLabelText = 'Other permissions'
                  valueLink         = {this.linkState('other_permissions')}
                  errorText         = {this.getValidationMessages('other_permissions').join(' ')}
                  valueMember       = 'payload'
                  displayMember     = 'text'
                  fullWidth         = {true}
                  selectedIndex     = {0}
                  menuItems         = {ChannelsStore.getChannelPermissionsDropdown()} />
              </div>
            </div>
            <Toggle
              ref            = 'custom_publish'
              name           = 'custom_publish'
              defaultToggled = {this.state.custom_publish}
              onToggle       = {this.handleToogle}
              style          = {{marginTop: 20}}
              label          = 'Custom publishing in this channel?' />
          </div>
          <Loading
            type     = 'linear'
            position = 'bottom'
            show     = {this.state.isLoading} />
        </Dialog>
      </div>
    );
  }

});