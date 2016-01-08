import React from 'react' ;
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import {DialogMixin, FormMixin} from '../../mixins';

// Stores and Actions
import InstanceDialogStore from '../Instances/InstanceDialogStore';
import Store from './InstallDialogStore';
import Actions from './InstallDialogActions';

// Components
import {TextField, FlatButton} from 'syncano-material-ui' ;
import {SelectFieldWrapper, Notification, Loading, Dialog, Show} from '../../common';

export default React.createClass({
  displayName: 'SolutionInstallDialog',

  mixins: [
    Router.State,
    Router.Navigation,

    DialogMixin,
    FormMixin,

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

    if (this.state.instance) {
      instanceName = this.state.instance;
    } else if (this.state.instances.length === 1) {
      instanceName = this.state.instances[0].name;
    }
    if (!instanceName) {
      instanceName = InstanceDialogStore.genUniqueName();

      Actions.createInstance({name: instanceName}).then(() => {
        Actions.installSolution({
          solutionId: this.state.solutionId,
          versionId: this.state.version,
          instanceName
        });
      });
    } else {
      Actions.installSolution({
        solutionId: this.state.solutionId,
        versionId: this.state.version,
        instanceName
      });
    }
  },

  renderCustomFormNotifications() {
    let nonFormFields = ['classes'];
    let messages = [];

    Object.keys(this.state.errors).map((fieldName) => {
      if (nonFormFields.indexOf(fieldName) > -1) {
        this.state.errors[fieldName].map((error) => {
          Object.keys(error).map((key) => {
            messages.push(error[key]);
          });
        });
      }
    });
    if (messages.length > 0) {
      return <Notification type='error'>{messages.join(' ')}</Notification>;
    }
  },

  renderInstanceField() {
    if (this.state.instances === null) {
      return <Loading />;
    }

    if (this.state.instances instanceof Array && this.state.instances.length < 2) {
      return (
        <TextField
          ref="instance"
          name="instance"
          fullWidth={true}
          disabled={true}
          valueLink={this.linkState('instance')}
          errorText={this.getValidationMessages('instance').join(' ')}
          floatingLabelText="Instance Name"/>
      );
    }

    return (
      <SelectFieldWrapper
        name="instance"
        options={Store.getInstancesDropdown()}
        value={this.state.instance}
        floatingLabelText='Instances'
        onChange={this.setSelectFieldValue.bind(null, 'instance')}
        errorText={this.getValidationMessages('instance').join(' ')}/>
    );
  },

  render() {
    let title = 'Install a Solution';
    let dialogCustomActions = [
      <FlatButton
        ref='cancel'
        key='cancel'
        label='Cancel'
        onTouchTap={this.handleCancel}/>,
      <FlatButton
        ref='submit'
        key='confirm'
        label='Confirm'
        onTouchTap={this.handleFormValidation}
        primary={true}/>
    ];

    return (
      <Dialog
        key='dialog'
        ref="dialog"
        title={title}
        defaultOpen={this.props.defaultOpen}
        onRequestClose={this.handleCancel}
        open={this.state.open}
        actions={dialogCustomActions}>
        <div>
          {this.renderFormNotifications()}
          {this.renderCustomFormNotifications()}

          <div className='row'>
            <div className='col-flex-1'>
              {this.renderInstanceField()}
            </div>
          </div>

          <Show if={!this.state.hideVersionPicker}>
            <SelectFieldWrapper
              name="version"
              options={Store.getVersionsDropdown()}
              value={this.state.version}
              onChange={this.setSelectFieldValue.bind(null, 'version')}
              errorText={this.getValidationMessages('version').join(' ')}/>
          </Show>
        </div>
      </Dialog>
    );
  }
});
