import React from 'react';
import Reflux from 'reflux';

// Utils
import Mixins from '../../mixins';

// Stores and Actions
import TriggersActions from './TriggersActions';
import TriggerDialogStore from './TriggerDialogStore';
import SnippetsActions from '../Snippets/SnippetsActions';
import ClassesActions from '../Classes/ClassesActions';

// Components
import MUI from 'syncano-material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'TriggerDialog',

  mixins: [
    Reflux.connect(TriggerDialogStore),
    Mixins.Dialog,
    Mixins.Form
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
      presence: true
    }
  },

  handleDialogShow() {
    console.info('TriggerDialog::handleDialogShow');
    SnippetsActions.fetch();
    ClassesActions.fetch();
  },

  handleAddSubmit() {
    TriggersActions.createTrigger({
      label: this.state.label,
      codebox: this.state.codebox,
      class: this.state.class,
      signal: this.state.signal
    });
  },

  handleEditSubmit() {
    TriggersActions.updateTrigger(
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
      <MUI.FlatButton
        key="cancel"
        label="Cancel"
        onTouchTap={this.handleCancel}
        ref="cancel"/>,
      <MUI.FlatButton
        key="confirm"
        label="Confirm"
        primary={true}
        onTouchTap={this.handleFormValidation}
        ref="submit"/>
    ];

    return (
      <Common.Dialog
        key='dialog'
        ref="dialog"
        title={`${title} a Trigger Socket`}
        defaultOpen={this.props.defaultOpen}
        onRequestClose={this.handleCancel}
        actions={dialogStandardActions}>
        <div>
          {this.renderFormNotifications()}
          <MUI.TextField
            ref="label"
            name="label"
            fullWidth={true}
            valueLink={this.linkState('label')}
            errorText={this.getValidationMessages('label').join(' ')}
            hintText="Label of the trigger"
            floatingLabelText="Label"/>
          <MUI.SelectField
            ref="signal"
            name="signal"
            className="signal-dropdown"
            floatingLabelText="Signal"
            fullWidth={true}
            valueLink={this.linkState('signal')}
            errorText={this.getValidationMessages('signal').join(' ')}
            valueMember="payload"
            displayMember="text"
            menuItems={TriggerDialogStore.getSignalsDropdown()}/>
          <MUI.SelectField
            ref="class"
            name="class"
            className="class-dropdown"
            floatingLabelText="Class"
            fullWidth={true}
            valueLink={this.linkState('class')}
            errorText={this.getValidationMessages('class').join(' ')}
            valueMember="payload"
            displayMember="text"
            menuItems={this.state.classes}/>
          <MUI.SelectField
            ref="snippet"
            name="snippet"
            className="snippet-dropdown"
            floatingLabelText="Snippet"
            valueLink={this.linkState('codebox')}
            errorText={this.getValidationMessages('codebox').join(' ')}
            valueMember="payload"
            displayMember="text"
            fullWidth={true}
            menuItems={this.state.snippets}/>
        </div>
      </Common.Dialog>
    );
  }
});

