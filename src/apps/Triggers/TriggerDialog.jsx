import React from 'react';
import Reflux from 'reflux';

// Utils
import {DialogMixin, FormMixin} from '../../mixins';

// Stores and Actions
import Actions from './TriggersActions';
import Store from './TriggerDialogStore';
import SnippetsActions from '../Snippets/SnippetsActions';
import ClassesActions from '../Classes/ClassesActions';

// Components
import {TextField, FlatButton} from 'syncano-material-ui';
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
        message: `^Snippet can't be blank`
      }
    }
  },

  handleDialogShow() {
    console.info('TriggerDialog::handleDialogShow');
    SnippetsActions.fetch();
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
      });
  },

  render() {
    let title = this.hasEditMode() ? 'Edit' : 'Create';
    let dialogStandardActions = [
      <FlatButton
        key="cancel"
        label="Cancel"
        onTouchTap={this.handleCancel}
        ref="cancel"/>,
      <FlatButton
        key="confirm"
        label="Confirm"
        primary={true}
        onTouchTap={this.handleFormValidation}
        ref="submit"/>
    ];

    return (
      <Dialog
        key="dialog"
        ref="dialog"
        title={`${title} a Trigger Socket`}
        defaultOpen={this.props.defaultOpen}
        onRequestClose={this.handleCancel}
        open={this.state.open}
        actions={dialogStandardActions}>
        <div>
          {this.renderFormNotifications()}
          <TextField
            ref="label"
            name="label"
            fullWidth={true}
            valueLink={this.linkState('label')}
            errorText={this.getValidationMessages('label').join(' ')}
            hintText="Label of the trigger"
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
            name="snippet"
            options={this.state.snippets}
            value={this.state.codebox}
            onChange={this.setSelectFieldValue.bind(null, 'codebox')}
            errorText={this.getValidationMessages('codebox').join(' ')}/>
        </div>
      </Dialog>
    );
  }
});

