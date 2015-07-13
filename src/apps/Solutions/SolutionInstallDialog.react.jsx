var React                      = require('react'),
    Reflux                     = require('reflux'),

    // Utils
    FormMixin                  = require('../../mixins/FormMixin'),
    DialogMixin                = require('../../mixins/DialogMixin'),

    // Stores and Actions
    SessionStore               = require('../Session/SessionStore'),
    SessionActions             = require('../Session/SessionActions'),
    SolutionsActions           = require('./SolutionsActions'),
    SolutionEditActions        = require('./SolutionEditActions'),
    SolutionEditStore          = require('./SolutionEditStore'),
    SolutionInstallDialogStore = require('./SolutionInstallDialogStore'),
    InstancesStore             = require('../Instances/InstancesStore'),
    InstancesActions           = require('../Instances/InstancesActions'),
    ColorStore                 = require('../../common/Color/ColorStore'),
    IconStore                  = require('../../common/Icon/IconStore'),

    WebhooksStore              = require('../Data/WebhooksStore'),
    CodeBoxesStore             = require('../CodeBoxes/CodeBoxesStore'),
    ClassesStore               = require('../Classes/ClassesStore'),
    DataViewsStore             = require('../Data/DataViewsStore'),
    DataViewsActions           = require('../Data/DataViewsActions'),

    ChannelsStore              = require('../Channels/ChannelsStore'),
    TriggersStore              = require('../Tasks/TriggersStore'),
    SchedulesStore             = require('../Tasks/SchedulesStore'),

    // Components
    mui                        = require('material-ui'),
    Toggle                     = mui.Toggle,
    Checkbox                   = mui.Checkbox,
    SelectField                = mui.SelectField,
    Tabs                       = mui.Tabs,
    Tab                        = mui.Tab,
    TextField                  = mui.TextField,
    DropDownMenu               = mui.DropDownMenu,
    Dialog                     = mui.Dialog,
    FlatButton                 = mui.FlatButton,

    Show                       = require('../../common/Show/Show.react');

module.exports = React.createClass({

  displayName: 'SolutionInstallDialog',

  mixins: [
    Reflux.connect(SolutionInstallDialogStore),

    React.addons.LinkedStateMixin,
    FormMixin,
    DialogMixin
  ],

  validatorConstraints: {
    instance: {
      presence: true
    }
  },

  handleAddSubmit: function() {
    SolutionEditActions.installSolution({
      solutionId   : SessionStore.router.getCurrentParams().solutionId,
      versionId    : this.state.version,
      instanceName : this.state.instance
    })
  },

  componentWillUpdate: function(nextProps, nextState) {
    console.debug('SolutionInstallDialog::componentWillUpdate');
    if (nextState._dialogVisible && nextState.instance != this.state.instance) {
      SessionActions.fetchInstance(nextState.instance).then();
    }
  },

  handleDialogShow: function() {
    SolutionEditActions.fetchSolutionVersions(SessionStore.router.getCurrentParams().solutionId);
    InstancesActions.fetch();
  },

  render: function() {
    var title = 'Install a Solution';

    var dialogCustomActions = [
      <FlatButton
        ref        = 'cancel'
        key        = 'cancel'
        label      = 'Cancel'
        onTouchTap = {this.handleCancel}
      />,

      <FlatButton
        ref        = 'submit'
        key        = 'confirm'
        label      = 'Confirm'
        primary    = {true}
        onTouchTap = {this.handleFormValidation}
      />
    ];

    return (
      <Dialog
        ref             = "dialog"
        title           = {title}
        openImmediately = {this.props.openImmediately}
        actions         = {dialogCustomActions}
        onShow          = {this.handleDialogShow}
        onDismiss       = {this.resetDialogState}>
        <div>
          {this.renderFormNotifications()}

          <div className='row'>
              <div className='col-flex-1'>
                <SelectField
                    ref               = 'instance'
                    name              = 'instance'
                    fullWidth         = {true}
                    valueLink         = {this.linkState('instance')}
                    valueMember       = 'payload'
                    displayMember     = 'text'
                    floatingLabelText = 'Instances'
                    errorText         = {this.getValidationMessages('instance').join(' ')}
                    menuItems         = {InstancesStore.getInstancesDropdown()} />
              </div>
          </div>

          <SelectField
              ref               = 'version'
              name              = 'version'
              fullWidth         = {true}
              valueLink         = {this.linkState('version')}
              valueMember       = 'payload'
              displayMember     = 'text'
              floatingLabelText = 'Version'
              errorText         = {this.getValidationMessages('version').join(' ')}
              menuItems         = {SolutionEditStore.getVersionsDropdown()} />

        </div>
      </Dialog>
    );
  }

});