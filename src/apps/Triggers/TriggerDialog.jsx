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
    codebox: {
      presence: {
        message: `^Script can't be blank`
      }
    }
  },

  handleDialogShow() {
    console.info('TriggerDialog::handleDialogShow');
    ScriptsActions.fetch();
    ClassesActions.fetch();
  },

  handleAddSubmit() {
    Actions.createTrigger({
      label: this.state.label,
      codebox: this.state.codebox,
      class: this.state.class,
      signal: this.state.signal
    });
  },

  handleEditSubmit() {
    Actions.updateTrigger(
      this.state.id, {
        label: this.state.label,
        codebox: this.state.codebox,
        class: this.state.class,
        signal: this.state.signal
      }
    );
  },

  render() {
    const title = this.hasEditMode() ? 'Edit' : 'Add';

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={`${title} a Trigger Socket`}
        onRequestClose={this.handleCancel}
        open={this.state.open}
        isLoading={this.state.isLoading}
        actions={
          <Dialog.StandardButtons
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
            value={this.state.signal}
            onChange={(event, index, value) => this.setSelectFieldValue('signal', value)}
            errorText={this.getValidationMessages('signal').join(' ')}/>
          <SelectFieldWrapper
            name="class"
            options={this.state.classes}
            value={this.state.class}
            onChange={(event, index, value) => this.setSelectFieldValue('class', value)}
            errorText={this.getValidationMessages('class').join(' ')}/>
          <SelectFieldWrapper
            name="script"
            options={this.state.scripts}
            value={this.state.codebox}
            onChange={(event, index, value) => this.setSelectFieldValue('codebox', value)}
            errorText={this.getValidationMessages('codebox').join(' ')}/>
        </Dialog.ContentSection>
      </Dialog.FullPage>
    );
  }
});
