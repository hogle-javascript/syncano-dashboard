import React from 'react' ;
import Reflux from 'reflux';
import Router from 'react-router';
import MUI from 'material-ui' ;

// Utils
import Mixins from '../../mixins';

// Stores and Actions
import InstanceDialogStore from '../Instances/InstanceDialogStore';
import Store from './InstallDialogStore';
import Actions from './InstallDialogActions';

// Components
import Common from '../../common';

export default React.createClass({

  displayName: 'SolutionInstallDialog',

  mixins: [
    Router.State,
    Router.Navigation,

    React.addons.LinkedStateMixin,
    Mixins.Form,
    Mixins.Dialog,

    Reflux.connect(Store)
  ],

  validatorConstraints: {
    instance: {
      presence: true
    },
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

  handleDialogShow() {
    console.debug('SolutionInstallDialog::handleDialogShow');
  },

  renderInstanceField() {
    if (this.state.instances === null) {
      return <Common.Loading />
    }

    if (this.state.instances instanceof Array && this.state.instances.length < 2) {
      return (
        <MUI.TextField
          ref               = "instance"
          name              = "instance"
          fullWidth         = {true}
          disabled          = {true}
          valueLink         = {this.linkState('instance')}
          errorText         = {this.getValidationMessages('instance').join(' ')}
          floatingLabelText = "Instance Name" />
      )
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
    let title = 'Install a Solution';
    let dialogCustomActions = [
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
      <Common.Dialog
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

          <Common.Show if={!this.state.hideVersionPicker}>
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
          </Common.Show>
        </div>
      </Common.Dialog>
    );
  }
});
