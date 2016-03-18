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
    const title = this.hasEditMode() ? 'Edit' : 'Create';

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
        }>
        <div>
          {this.renderFormNotifications()}
          <TextField
            ref="label"
            name="label"
            fullWidth={true}
            valueLink={this.linkState('label')}
            errorText={this.getValidationMessages('label').join(' ')}
            hintText="Trigger's label"
            floatingLabelText="Label"/>
          <SelectFieldWrapper
            name="signal"
            options={Store.getSignalsDropdown()}
            value={this.state.signal}
            onChange={this.setSelectFieldValue.bind(null, 'signal')}
            errorText={this.getValidationMessages('signal').join(' ')}/>
          <SelectFieldWrapper
            name="class"
            options={this.state.classes}
            value={this.state.class}
            onChange={this.setSelectFieldValue.bind(null, 'class')}
            errorText={this.getValidationMessages('class').join(' ')}/>
          <SelectFieldWrapper
            name="script"
            options={this.state.scripts}
            value={this.state.codebox}
            onChange={this.setSelectFieldValue.bind(null, 'codebox')}
            errorText={this.getValidationMessages('codebox').join(' ')}/>
        </div>
      </Dialog.FullPage>
    );
  }
});
