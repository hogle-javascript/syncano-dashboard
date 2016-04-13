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
import {SelectFieldWrapper} from 'syncano-components';
import {Dialog, LinkWrapper} from '../../common';

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
    codebox: {
      presence: {
        message: `^Script can't be blank`
      }
    }
  },

  handleDialogShow() {
    console.info('ScriptEndpointDialog::handleDialogShow');
    ScriptsActions.fetch();
  },

  handleAddSubmit() {
    Actions.createScriptEndpoint({
      name: this.state.name,
      codebox: this.state.codebox,
      description: this.state.description,
      public: this.state.public
    });
  },

  handleEditSubmit() {
    Actions.updateScriptEndpoint(this.state.name, {
      codebox: this.state.codebox,
      description: this.state.description,
      public: this.state.public
    });
  },

  handleToogle(event, status) {
    let state = {};

    state[event.target.name] = status;
    this.setState(state);
  },

  render() {
    const title = this.hasEditMode() ? 'Edit' : 'Add';

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={`${title} a Script Endpoint`}
        onRequestClose={this.handleCancel}
        open={this.state.open}
        isLoading={this.state.isLoading}
        actions={
          <Dialog.StandardButtons
            disabled={!this.state.canSubmit}
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
            options={this.state.scripts}
            value={this.state.codebox}
            onChange={(event, index, value) => this.setSelectFieldValue('codebox', value)}
            errorText={this.getValidationMessages('codebox').join(' ')}/>
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
