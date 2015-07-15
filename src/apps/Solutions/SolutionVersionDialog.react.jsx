var React                      = require('react'),
    Reflux                     = require('reflux'),

    // Utils
    FormMixin                  = require('../../mixins/FormMixin'),
    DialogMixin                = require('../../mixins/DialogMixin'),

    // Stores and Actions
    SessionActions             = require('../Session/SessionActions'),
    SolutionsActions           = require('./SolutionsActions'),
    SolutionEditActions        = require('./SolutionEditActions'),
    SolutionEditStore          = require('./SolutionEditStore'),
    SolutionVersionDialogStore = require('./SolutionVersionDialogStore'),
    InstancesStore             = require('../Instances/InstancesStore'),
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

  displayName: 'SolutionVersionDialog',

  mixins: [
    Reflux.connect(SolutionVersionDialogStore),
    Reflux.connect(DataViewsStore, 'dataviews'),
    Reflux.connect(ClassesStore, 'classes'),
    Reflux.connect(CodeBoxesStore, 'codebox'),
    Reflux.connect(TriggersStore, 'triggers'),
    Reflux.connect(SchedulesStore, 'schedules'),
    Reflux.connect(ChannelsStore, 'channels'),

    React.addons.LinkedStateMixin,
    FormMixin,
    DialogMixin
  ],

  validatorConstraints: {
    version: {
      presence: true,
      length: {
        minimum: 1
      }
    }
  },

  handleEditSubmit: function() {
    SolutionsActions.updateSolution(

      {description: this.state.description}
    );
  },

  pkMap: function(section) {
    var map = {
      data      : 'name',
      classes   : 'name',
      webhooks  : 'slug',
      channels  : 'name',
      codeboxes : 'id',
      triggers  : 'id',
      schedules : 'id'
    }
    return map[section];
  },

  prepareExportSpec: function() {
    var spec         = this.state.exportSpec,
        formatedSpec = {};

    Object.keys(spec).map(function(section) {
      var pkName = this.pkMap(section);
      formatedSpec[section] = [];
      Object.keys(spec[section]).map(function(item) {
        if (spec[section][item] === true) {
          var obj = {};
          if (pkName === 'id') {
            item = parseInt(item);
          }
          obj[pkName] = item;
          formatedSpec[section].push(obj);
        }
      })
    }.bind(this));

    return formatedSpec;
  },

  prepareVersionData: function() {
    return {
      number      : this.state.version,
      export_spec : JSON.stringify(this.prepareExportSpec()),
      instance    : this.state.instance
    }
  },

  handleAddSubmit: function() {
    SolutionEditActions.createVersion(SolutionEditStore.getSolution().id, this.prepareVersionData());
  },

  handleToogle: function(name, type, event, status) {

    var exportSpec = this.state.exportSpec;
    exportSpec[type][name] = status;

    this.setState({exportSpec: exportSpec});
  },

  renderData: function() {
    return // For now - waiting for support
    return (DataViewsStore.getDataViews() || []).map(function(item) {
      return (
        <Toggle
          key            = {item.name}
          name           = {item.name}
          value          = {item.name}
          label          = {item.name}
          onToggle       = {this.handleToogle.bind(this, item.name, 'data')}/>
      )
    }.bind(this))
  },

  renderClasses: function() {
    return (ClassesStore.getItems() || []).map(function(item) {
      return (
        <Toggle
          key            = {item.name}
          name           = {item.name}
          value          = {item.name}
          label          = {item.name}
          onToggle       = {this.handleToogle.bind(this, item.name, 'classes')}/>
      )
    }.bind(this))
  },

  renderCodeBoxes: function() {
    return (CodeBoxesStore.getItems() || []).map(function(item) {
      return (
        <Toggle
          key            = {item.id}
          name           = {item.label}
          value          = {item.id}
          label          = {item.label}
          onToggle       = {this.handleToogle.bind(this, item.id, 'codeboxes')} />
      )
    }.bind(this))
  },

  renderSchedules: function() {
    return (SchedulesStore.getSchedules() || []).map(function(item) {
      return (
        <Toggle
          key            = {item.id}
          name           = {item.label}
          value          = {item.id}
          label          = {item.label}
          onToggle       = {this.handleToogle.bind(this, item.id, 'schedules')}/>
      )
    }.bind(this))
  },

  renderTriggers: function() {
    return (TriggersStore.getTriggers() || []).map(function(item) {
      return (
        <Toggle
          key            = {item.id}
          name           = {item.label}
          value          = {item.id}
          label          = {item.label}
          onToggle       = {this.handleToogle.bind(this, item.id, 'triggers')}/>
      )
    }.bind(this))
  },

  renderChannels: function() {
    return (ChannelsStore.getItems() || []).map(function(item) {
      return (
        <Toggle
          key            = {item.name}
          name           = {item.name}
          value          = {item.name}
          label          = {item.name}
          onToggle       = {this.handleToogle.bind(this, item.name, 'channels')}/>
      )
    }.bind(this))
  },

  componentWillUpdate: function(nextProps, nextState) {
    console.debug('SolutionVersionDialog::componentWillUpdate');
    if (nextState._dialogVisible && nextState.instance != this.state.instance) {
      SessionActions.fetchInstance(nextState.instance).then();
    }
  },

  render: function() {
    var title = this.hasEditMode() ? 'Edit version of Solution' : 'Create version of Solution';

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
        onDismiss       = {this.resetDialogState}>
        <div>
          {this.renderFormNotifications()}

          <div className='row'>

              <div className='col-xs-8'>
                <TextField
                  ref               = 'version'
                  name              = 'version'
                  fullWidth         = {true}
                  disabled          = {this.hasEditMode() ? true : false}
                  valueLink         = {this.linkState('version')}
                  errorText         = {this.getValidationMessages('version').join(' ')}
                  hintText          = 'Short name for your Solution'
                  floatingLabelText = 'Version number' />
              </div>
              <div className='col-xs-26' style={{paddingLeft: 15}}>
                <SelectField
                    ref               = 'instance'
                    name              = 'instance'
                    onChange          = {this.handleInstanceChange}
                    fullWidth         = {true}
                    valueLink         = {this.linkState('instance')}
                    valueMember       = 'payload'
                    displayMember     = 'text'
                    floatingLabelText = 'Instances'
                    errorText         = {this.getValidationMessages('instance').join(' ')}
                    menuItems         = {InstancesStore.getInstancesDropdown()} />
              </div>
          </div>


          <Show if={this.state.instance}>
            <Tabs>
              <Tab
                label="Data Endpoints"
                route="solutions-market"
                onActive={this.handleTabActive}>

                {this.renderData()}

              </Tab>

              <Tab
                label="Classes"
                onActive={this.handleTabActive}>

                {this.renderClasses()}

              </Tab>

              <Tab
                label="CodeBox"
                onActive={this.handleTabActive}>

                <div style = {{height: 300}}>
                  {this.renderCodeBoxes()}
                </div>

              </Tab>

              <Tab
                label="Tasks"
                route="solutions-my"
                onActive={this.handleTabActive}>

                <div className='row'>

                  <div className='col-flex-1'>
                    <div>Triggers</div>
                    {this.renderTriggers()}

                  </div>

                  <div className='col-flex-1' style={{paddingLeft: 15}}>
                    <div>Schedules</div>
                    {this.renderSchedules()}
                  </div>

                </div>
              </Tab>

              <Tab
                label="Channels"
                onActive={this.handleTabActive}>

                {this.renderChannels()}

              </Tab>

          </Tabs>
          </Show>

        </div>
      </Dialog>
    );
  }

});