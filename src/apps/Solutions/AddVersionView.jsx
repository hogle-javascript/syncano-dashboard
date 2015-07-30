import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import EditViewActions from './EditViewActions';
import EditViewStore from './EditViewStore';

import Store from './AddVersionViewStore';
import Actions from './AddVersionViewActions';

// Components
import MUI from 'material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'AddVersionView',

  mixins: [
    React.addons.LinkedStateMixin,
    Router.State,
    Router.Navigation,

    Mixins.Dialog,
    Mixins.Form,
    HeaderMixin,
    Reflux.connect(Store),
  ],

  validatorConstraints: {
    instance: {
      presence: true,
    }
  },

  headerMenuItems() {
    return [
      {
        label  : 'Instances',
        route  : 'instances'
      },
      {
        label : 'Solutions',
        route : 'solutions'
      }
    ];
  },

  componentWillMount() {
    Actions.fetchInstances();
    Actions.fetch();
  },

  handleBackClick() {
    this.context.router.transitionTo('solutions-edit', this.getParams());
  },

  handleEditSubmit() {
    Actions.updateSolution({
      description: this.state.description
    });
  },

  handleInstanceChange(event, index, obj) {
    Actions.setInstance(obj.payload)
  },

  pkMap(section) {
    let map = {
      views     : 'name',
      classes   : 'name',
      webhooks  : 'name',
      channels  : 'name',
      codeboxes : 'id',
      triggers  : 'id',
      schedules : 'id'
    };
    return map[section];
  },

  prepareExportSpec() {
    let spec         = this.state.exportSpec;
    let formatedSpec = {};

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
      type        : this.state.type,
      export_spec : JSON.stringify(this.prepareExportSpec()),
      instance    : this.state.instance
    }
  },

  handleSubmit(type) {
    this.setState({type: type});
    this.handleFormValidation();
  },

  handleAddSubmit() {
    Actions.createVersion(this.getParams().solutionId, this.prepareVersionData());
  },

  handleOnCheck(name, type, event, status) {
    let exportSpec = this.state.exportSpec;
    exportSpec[type][name] = status;

    this.setState({exportSpec: exportSpec});
  },

  renderCheckboxes(label, data, pk, labelPk, type) {

    // TODO: move all the styles to getStyles()
    let sectionStyle = {
      paddingTop    : 10,
      paddingBottom : 20,
      margin        : 1,
      background    : '#F4F4F4',
    };

    let sectionTitleStyle = {
      fontSize: '1.2rem',
      marginTop: 15,
      marginBottom: 10,
    };

    let checkboxes = data.map(item => {
      return (
        <div
          key       = {`checkbox-${type}-${item[pk]}`}
          className = "col-xs-35 col-md-17 col-lg-17"
          style     = {{paddingRight: 10}}>
          <MUI.Checkbox
            ref        = {`checkbox-${type}-${item[pk]}`}
            iconStyle  = {{fill: '#4D4D4D'}}
            labelStyle = {{color: '#4D4D4D'}}
            name       = {item[pk]}
            value      = {item[pk]}
            label      = {item[labelPk].substring(0, 25)}
            onCheck    = {this.handleOnCheck.bind(this, item[pk], type)}
          />
        </div>
      )
    });

    if (checkboxes.length === 0)
      return null;

    return (
      <div className="col-xs-35 col-md-35 col-lg-35">
        <div style={sectionTitleStyle}>{label}</div>
        <div style={sectionStyle}>
          <div className="row">
              {checkboxes}
          </div>
        </div>
     </div>
    )
  },

  renderInfo() {
    if (this.state.dataReady === true) {
      return;
    } else if (this.state.dataReady === 'loading') {
      return (
          <Common.Loading key="loading" style={{marginTop: 30}} show={true} />
      )
    }
    return (
      <div key="info" style={{padding: 100, margin: '0 auto'}}>
        <div style={{color: '#B8B8B8', width: 300, height: 27, lineHeight: '27px', fontSize: '1rem', verticalAlign: 'middle', textAlign: 'center'}}>
          Choose the Instance which you want to use to export new solution version.
        </div>
      </div>
    )
  },

  render() {

    let types = [{
      text    : 'stable',
      payload : 'stable'
    },
    {
      text    : 'development',
      payload : 'devel'
    }];

    return (
      <div>
        <MUI.Toolbar style={{background: 'transparent', padding: '0px 32px 0 24px'}}>

          <MUI.ToolbarGroup>
            <MUI.IconButton
              iconClassName = "synicon-arrow-left"
              onClick       = {this.handleBackClick}
              touch         = {true}
              style         = {{marginTop: 4}}
              iconStyle     = {{color: 'rgba(0,0,0,.4)'}}
            />
          </MUI.ToolbarGroup>

          <MUI.ToolbarGroup>
            <MUI.ToolbarTitle text={'Solution: ' + this.getParams().solutionId} />
          </MUI.ToolbarGroup>

          <MUI.ToolbarGroup float="right">

          </MUI.ToolbarGroup>

        </MUI.Toolbar>
        <Common.Container style={{width: '80%', margin: '65px auto', maxWidth: 800}}>
          <div style={{fontSize: '2rem', lineHeight: '2rem'}}>Add Version</div>
          <div style={{marginTop: 40}}>
            {this.renderFormNotifications()}
            <div className='row'>
              <div className='col-xs-35 col-lg-8'>
                <MUI.SelectField
                  ref               = 'type'
                  name              = 'type'
                  fullWidth         = {true}
                  valueLink         = {this.linkState('type')}
                  valueMember       = 'payload'
                  displayMember     = 'text'
                  floatingLabelText = 'Type'
                  menuItems         =  {types}
                />
              </div>
              <div className='col-xs-35 col-lg-26' style={{paddingLeft: 15}}>
                <MUI.SelectField
                  ref               = 'instance'
                  name              = 'instance'
                  onChange          = {this.handleInstanceChange}
                  fullWidth         = {true}
                  value             = {null}
                  valueMember       = 'payload'
                  displayMember     = 'text'
                  floatingLabelText = 'Instances'
                  errorText         = {this.getValidationMessages('instance').join(' ')}
                  menuItems         = {Store.getInstancesDropdown()}
                />
              </div>
            </div>
          </div>
          <div className="row">
            {this.renderInfo()}
          </div>
          <div className="row" style={{marginTop: 30}}>
             {this.renderCheckboxes('Classes', this.state.instanceData.classes, 'name', 'name', 'classes')}
             {this.renderCheckboxes('Data', this.state.instanceData.views, 'name', 'name', 'views')}
             {this.renderCheckboxes('CodeBoxes', this.state.instanceData.codeboxes, 'id', 'label', 'codeboxes')}
             {this.renderCheckboxes('Webhooks', this.state.instanceData.webhooks, 'name', 'name', 'webhooks')}
             {this.renderCheckboxes('Triggers', this.state.instanceData.triggers, 'id', 'label', 'triggers')}
             {this.renderCheckboxes('Schedules', this.state.instanceData.schedules, 'id', 'label', 'schedules')}
             {this.renderCheckboxes('Channels', this.state.instanceData.channels, 'name', 'name', 'channels')}
          </div>
          <div className="row" style={{paddingTop: 30}}>
            <div className="col-flex-1">
            </div>
            <div className="col-lg-25" style={{display: 'flex', justifyContent: 'flex-end'}}>
                <MUI.FlatButton
                  style      = {{marginRight: 10}}
                  ref        = 'cancel'
                  key        = 'cancel'
                  label      = 'Cancel'
                  onTouchTap = {this.handleCancel} />
                <MUI.RaisedButton
                  style      = {{marginRight: 10}}
                  ref        = 'submit'
                  key        = 'confirm'
                  label      = 'Confirm'
                  disable    = {this.state.instance ? false : true}
                  primary    = {true}
                  onTouchTap = {this.handleFormValidation} />
            </div>
          </div>
        </Common.Container>
    </div>
    );
  }
});
