import React from 'react' ;
import Reflux from 'reflux';
import Router from 'react-router';
import MUI from 'material-ui' ;

// Utils
import Mixins from '../../mixins';

// Stores and Actions
import InstanceDialogStore from '../Instances/InstanceDialogStore';
import Store from './SolutionInstallDialogStore';
import Actions from './SolutionInstallDialogActions';

// Components
import Common from '../../common';

module.exports = React.createClass({

  displayName: 'SolutionInstallDialog',

  mixins: [
    Router.State,
    Router.Navigation,

    React.addons.LinkedStateMixin,
    Mixins.Form,
    Mixins.Dialog,

    Reflux.connect(Store),
  ],

  validatorConstraints: {
    version: {
      presence: true
    }
  },

  handleEditSubmit() {
    console.debug('SolutionInstallDialog::handleEditSubmit');
  },

  handleAddSubmit() {
    let instanceName = null;

    if (this.state.instance)
      instanceName = this.state.instance;
    else if (this.state.instances.length === 1)
      instanceName = this.state.instances[0].name;

    if (!instanceName) {
      instanceName = InstanceDialogStore.genUniqueName();

      Actions.createInstance({name: instanceName}).then(() => {
        Actions.installSolution({
          solutionId: this.state.solutionId,
          versionId: this.state.version,
          instanceName: instanceName
        })
      });
    }
    else
      Actions.installSolution({
        solutionId   : this.state.solutionId,
        versionId    : this.state.version,
        instanceName : instanceName
      });
  },

  componentWillUpdate(nextProps, nextState) {
    console.debug('SolutionInstallDialog::componentWillUpdate');
    if (nextState._dialogVisible && nextState.instance != this.state.instance) {
      SessionActions.fetchInstance(nextState.instance).then();
    }
  },

  handleDialogShow() {
    console.debug('SolutionInstallDialog::handleDialogShow');
  },

  renderInstanceField() {
    if (this.state.instances === null) {
      return <Common.Loading />
    }

    if (this.state.instances instanceof Array && this.state.instances.length < 2) {
      return;
    }

    return (
      <MUI.SelectField
        ref               = 'instance'
        name              = 'instance'
        fullWidth         = {true}
        valueLink         = {this.linkState('instance')}
        valueMember       = 'payload'
        displayMember     = 'text'
        floatingLabelText = 'Instances'
        errorText         = {this.getValidationMessages('instance').join(' ')}
        menuItems         = {Store.getInstancesDropdown()} />
    )
  },

  render() {
    var title = 'Install a Solution';

    var dialogCustomActions = [
      <MUI.FlatButton
        ref        = 'cancel'
        key        = 'cancel'
        label      = 'Cancel'
        onTouchTap = {this.handleCancel} />,
      <MUI.FlatButton
        ref        = 'submit'
        key        = 'confirm'
        label      = 'Confirm'
        primary    = {true}
        onTouchTap = {this.handleFormValidation} />
    ];

    return (
      <MUI.Dialog
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
                {this.renderInstanceField()}
              </div>
          </div>

          <MUI.SelectField
              ref               = 'version'
              name              = 'version'
              fullWidth         = {true}
              valueLink         = {this.linkState('version')}
              valueMember       = 'payload'
              displayMember     = 'text'
              floatingLabelText = 'Version'
              errorText         = {this.getValidationMessages('version').join(' ')}
              menuItems         = {Store.getVersionsDropdown()} />
        </div>
      </MUI.Dialog>
    );
  }

});