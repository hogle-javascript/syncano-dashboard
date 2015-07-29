import React from 'react';
import Reflux from 'reflux';

// Utils
import Mixins from '../../mixins';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import SolutionsActions from './SolutionsActions';
import SolutionEditActions from './SolutionEditActions';
import SolutionEditStore from './SolutionEditStore';

import Store from './SolutionVersionDialogStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'SolutionVersionDialog',

  mixins: [
    Reflux.connect(Store),

    React.addons.LinkedStateMixin,
    Mixins.Dialog,
    Mixins.Form
  ],

  validatorConstraints: {
    version: {
      presence: true,
      length: {
        minimum: 1
      }
    }
  },

  handleEditSubmit() {
    SolutionsActions.updateSolution({
      description: this.state.description
    });
  },

  pkMap(section) {
    let map = {
      data      : 'name',
      classes   : 'name',
      webhooks  : 'slug',
      channels  : 'name',
      codeboxes : 'id',
      triggers  : 'id',
      schedules : 'id'
    };
    return map[section];
  },

  prepareExportSpec() {
    let spec         = this.state.exportSpec,
        formatedSpec = {};

    Object.keys(spec).map(section => {
      let pkName = this.pkMap(section);
      formatedSpec[section] = [];
      Object.keys(spec[section]).map(function(item) {
        if (spec[section][item] === true) {
          let obj = {};
          if (pkName === 'id') {
            item = parseInt(item);
          }
          obj[pkName] = item;
          formatedSpec[section].push(obj);
        }
      })
    });

    return formatedSpec;
  },

  prepareVersionData() {
    return {
      number      : this.state.version,
      export_spec : JSON.stringify(this.prepareExportSpec()),
      instance    : this.state.instance
    }
  },

  handleAddSubmit() {
    SolutionEditActions.createVersion(SolutionEditStore.getSolution().id, this.prepareVersionData());
  },

  handleToogle(name, type, event, status) {
    let exportSpec = this.state.exportSpec;
    exportSpec[type][name] = status;

    this.setState({exportSpec: exportSpec});
  },

  renderData() {
    return // For now - waiting for support
    return (DataViewsStore.getDataViews() || []).map(item => {
      return (
        <Toggle
          key      = {item.name}
          name     = {item.name}
          value    = {item.name}
          label    = {item.name}
          onToggle = {this.handleToogle.bind(this, item.name, 'data')}
        />
      )
    });
  },

  renderClasses() {
    return (ClassesStore.getItems() || []).map(item => {
      return (
        <Toggle
          key      = {item.name}
          name     = {item.name}
          value    = {item.name}
          label    = {item.name}
          onToggle = {this.handleToogle.bind(this, item.name, 'classes')}
        />
      )
    });
  },

  renderCodeBoxes() {
    return (CodeBoxesStore.getItems() || []).map(item => {
      return (
        <Toggle
          key      = {item.id}
          name     = {item.label}
          value    = {item.id}
          label    = {item.label}
          onToggle = {this.handleToogle.bind(this, item.id, 'codeboxes')}
        />
      )
    });
  },

  renderSchedules() {
    return (SchedulesStore.getSchedules() || []).map(item => {
      return (
        <Toggle
          key      = {item.id}
          name     = {item.label}
          value    = {item.id}
          label    = {item.label}
          onToggle = {this.handleToogle.bind(this, item.id, 'schedules')}
        />
      )
    });
  },

  renderTriggers() {
    return (TriggersStore.getTriggers() || []).map(item => {
      return (
        <Toggle
          key      = {item.id}
          name     = {item.label}
          value    = {item.id}
          label    = {item.label}
          onToggle = {this.handleToogle.bind(this, item.id, 'triggers')}
        />
      )
    });
  },

  renderChannels() {
    return (ChannelsStore.getItems() || []).map(item => {
      return (
        <Toggle
          key      = {item.name}
          name     = {item.name}
          value    = {item.name}
          label    = {item.name}
          onToggle = {this.handleToogle.bind(this, item.name, 'channels')}
        />
      )
    });
  },

  componentWillUpdate(nextProps, nextState) {
    console.debug('SolutionVersionDialog::componentWillUpdate');
    if (nextState._dialogVisible && nextState.instance != this.state.instance) {
      SessionActions.fetchInstance(nextState.instance).then();
    }
  },

  render() {
    let title = this.hasEditMode() ? 'Edit version of Solution' : 'Create version of Solution';
    let dialogCustomActions = [
      <MUI.FlatButton
        ref        = 'cancel'
        key        = 'cancel'
        label      = 'Cancel'
        onTouchTap = {this.handleCancel}
      />,
      <MUI.FlatButton
        ref        = 'submit'
        key        = 'confirm'
        label      = 'Confirm'
        primary    = {true}
        onTouchTap = {this.handleFormValidation}
      />
    ];

    return (
      <Common.Dialog
        ref             = "dialog"
        title           = {title}
        openImmediately = {this.props.openImmediately}
        actions         = {dialogCustomActions}
        onDismiss       = {this.resetDialogState}
      >
        <div>
          {this.renderFormNotifications()}

          <div className='row'>
            <div className='col-xs-8'>
              <MUI.TextField
                ref               = 'version'
                name              = 'version'
                fullWidth         = {true}
                disabled          = {this.hasEditMode() ? true : false}
                valueLink         = {this.linkState('version')}
                errorText         = {this.getValidationMessages('version').join(' ')}
                hintText          = 'Short name for your Solution'
                floatingLabelText = 'Version number'
              />
            </div>
            <div className='col-xs-26' style={{paddingLeft: 15}}>
              <MUI.SelectField
                ref               = 'instance'
                name              = 'instance'
                onChange          = {this.handleInstanceChange}
                fullWidth         = {true}
                valueLink         = {this.linkState('instance')}
                valueMember       = 'payload'
                displayMember     = 'text'
                floatingLabelText = 'Instances'
                errorText         = {this.getValidationMessages('instance').join(' ')}
                menuItems         = {InstancesStore.getInstancesDropdown()}
              />
            </div>
          </div>

          <Common.Show if={this.state.instance}>
            <MUI.Tabs>
              <MUI.Tab
                label    = "Data Endpoints"
                route    = "solutions-market"
                onActive = {this.handleTabActive}
              >
                {this.renderData()}
              </MUI.Tab>
              <MUI.Tab
                label    = "Classes"
                onActive = {this.handleTabActive}
              >
                {this.renderClasses()}
              </MUI.Tab>
              <MUI.Tab
                label    = "CodeBox"
                onActive = {this.handleTabActive}
              >
                <div style = {{height: 300}}>
                  {this.renderCodeBoxes()}
                </div>
              </MUI.Tab>
              <MUI.Tab
                label    = "Tasks"
                route    = "solutions-my"
                onActive = {this.handleTabActive}
              >
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
              </MUI.Tab>
              <MUI.Tab
                label    = "Channels"
                onActive = {this.handleTabActive}
              >
                {this.renderChannels()}
              </MUI.Tab>
            </MUI.Tabs>
          </Common.Show>
        </div>
      </Common.Dialog>
    );
  }
});
