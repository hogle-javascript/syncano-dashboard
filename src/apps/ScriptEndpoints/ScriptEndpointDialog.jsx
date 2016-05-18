import React from 'react';
import {State, Navigation} from 'react-router';
import Reflux from 'reflux';

// Utils
import {DialogMixin, FormMixin} from '../../mixins';

// Stores and Actions
import Actions from './ScriptEndpointsActions';
import DialogStore from './ScriptEndpointDialogStore';
import ScriptsActions from '../Scripts/ScriptsActions';

// Components
import {TextField, Toggle, Styles} from 'syncano-material-ui';
import {Dialog, LinkWrapper, SelectFieldWrapper} from '../../common/';

export default React.createClass({
  displayName: 'ScriptEndpointDialog',

  mixins: [
    Reflux.connect(DialogStore),
    DialogMixin,
    FormMixin,
    State,
    Navigation
  ],

  validatorConstraints: {
    name: {
      presence: true
    },
    script: {
      presence: {
        message: `^Script can't be blank`
      }
    }
  },

  getScriptEndpointParams() {
    const {name, script, description} = this.state;
    const params = {
      public: this.state.public,
      name,
      script,
      description
    };

    return params;
  },

  handleDialogShow() {
    console.info('ScriptEndpointDialog::handleDialogShow');
    ScriptsActions.fetch();
  },

  handleAddSubmit() {
    Actions.createScriptEndpoint(this.getScriptEndpointParams());
  },

  handleEditSubmit() {
    const {name} = this.state;

    Actions.updateScriptEndpoint(name, this.getScriptEndpointParams());
  },

  handleToogle(event, status) {
    let state = {};

    state[event.target.name] = status;
    this.setState(state);
  },

  render() {
    const {open, isLoading, canSubmit, scripts, script} = this.state;
    const title = this.hasEditMode() ? 'Edit' : 'Add';

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={`${title} a Script Endpoint`}
        onRequestClose={this.handleCancel}
        open={open}
        isLoading={isLoading}
        actions={
          <Dialog.StandardButtons
            disabled={!canSubmit}
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}/>
        }
        sidebar={
          <Dialog.SidebarBox>
            <Dialog.SidebarSection>
              Script Endpoints are URLs that run your custom code in the cloud.
              This code can be created with Scripts.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection title="Script">
              A Script is an object that contains a piece of code that can be run on Syncano servers.
              If you haven&#39;t created one you can do so&nbsp;
              <LinkWrapper
                style={{color: Styles.Colors.blue400}}
                to="scripts"
                params={this.getParams()}>
                here
              </LinkWrapper>
            </Dialog.SidebarSection>
            <Dialog.SidebarSection title="Public">
              Determines whether the Script Endpoint public link is active. They are accessible to anyone who knows the
               Script Endpoint URL.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection last={true}>
              <Dialog.SidebarLink to="http://docs.syncano.io/docs/endpoints-scripts">
                Learn more
              </Dialog.SidebarLink>
            </Dialog.SidebarSection>
          </Dialog.SidebarBox>
        }>
        {this.renderFormNotifications()}
        <Dialog.ContentSection>
          <TextField
            ref="name"
            name="name"
            autoFocus={true}
            fullWidth={true}
            disabled={this.hasEditMode()}
            valueLink={this.linkState('name')}
            errorText={this.getValidationMessages('name').join(' ')}
            hintText="Script Endpoint's name"
            floatingLabelText="Name"/>
          <TextField
            ref="description"
            name="description"
            fullWidth={true}
            valueLink={this.linkState('description')}
            errorText={this.getValidationMessages('description').join(' ')}
            hintText="Script Endpoint's description"
            floatingLabelText="Description (optional)"/>
          <SelectFieldWrapper
            name="script"
            options={scripts}
            value={script}
            onChange={(event, index, value) => this.setSelectFieldValue('script', value)}
            errorText={this.getValidationMessages('script').join(' ')}/>
          <Toggle
            ref='public'
            name='public'
            onToggle={this.handleToogle}
            style={{marginTop: 20}}
            defaultToggled={this.state.public}
            label='Make this Script Endpoint public?'/>
        </Dialog.ContentSection>
      </Dialog.FullPage>
    );
  }
});
