import React from 'react';
import Reflux from 'reflux';

// Utils
import {DialogMixin, FormMixin} from '../../mixins';

// Stores and Actions
import Actions from './TriggersActions';
import Store from './TriggerDialogStore';
import ScriptsActions from '../Scripts/ScriptsActions';
import ClassesActions from '../Classes/ClassesActions';

// Components
import {TextField} from 'syncano-material-ui';
import {SelectFieldWrapper} from 'syncano-components';
import {Dialog} from '../../common';

export default React.createClass({
  displayName: 'TriggerDialog',

  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints: {
    label: {
      presence: true
    },
    signal: {
      presence: true
    },
    class: {
      presence: true
    },
    script: {
      presence: {
        message: `^Script can't be blank`
      }
    }
  },

  getTriggerParams() {
    const {label, script, signal} = this.state;
    const params = {
      class: this.state.class,
      label,
      script,
      signal
    };

    return params;
  },

  handleDialogShow() {
    console.info('TriggerDialog::handleDialogShow');
    ScriptsActions.fetch();
    ClassesActions.fetch();
  },

  handleAddSubmit() {
    Actions.createTrigger(this.getTriggerParams());
  },

  handleEditSubmit() {
    const {id} = this.state;

    Actions.updateTrigger(id, this.getTriggerParams());
  },

  render() {
    const {open, isLoading, canSubmit, signal, classes, script, scripts} = this.state;
    const title = this.hasEditMode() ? 'Edit' : 'Add';

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={`${title} a Trigger Socket`}
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
              Trigger Sockets execute a Script when a Data Object inside selected Class is created,
               updated or deleted (depends on "signal" field value).
            </Dialog.SidebarSection>
            <Dialog.SidebarSection title="Signal">
              Signal indicates which operation performed on Data Object should execute the Trigger.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection title="Class">
              Operations on Data Objects in selected Class will execute the Trigger.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection title="Script">
              Snippet Script name that'll be executed by this Trigger.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection last={true}>
              <Dialog.SidebarLink to="http://docs.syncano.io/docs/triggers">
                Learn more
              </Dialog.SidebarLink>
            </Dialog.SidebarSection>
          </Dialog.SidebarBox>
        }>
        <Dialog.ContentSection>
          {this.renderFormNotifications()}
          <TextField
            ref="label"
            name="label"
            autoFocus={true}
            fullWidth={true}
            valueLink={this.linkState('label')}
            errorText={this.getValidationMessages('label').join(' ')}
            hintText="Trigger's label"
            floatingLabelText="Label"/>
          <SelectFieldWrapper
            name="signal"
            options={Store.getSignalsDropdown()}
            value={signal}
            onChange={(event, index, value) => this.setSelectFieldValue('signal', value)}
            errorText={this.getValidationMessages('signal').join(' ')}/>
          <SelectFieldWrapper
            name="class"
            options={classes}
            value={this.state.class}
            onChange={(event, index, value) => this.setSelectFieldValue('class', value)}
            errorText={this.getValidationMessages('class').join(' ')}/>
          <SelectFieldWrapper
            name="script"
            options={scripts}
            value={script}
            onChange={(event, index, value) => this.setSelectFieldValue('script', value)}
            errorText={this.getValidationMessages('script').join(' ')}/>
        </Dialog.ContentSection>
      </Dialog.FullPage>
    );
  }
});
