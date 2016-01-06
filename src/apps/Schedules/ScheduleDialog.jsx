import React from 'react';
import Reflux from 'reflux';

// Utils
import Mixins from '../../mixins';

// Stores and Actions
import Actions from './SchedulesActions';
import Store from './ScheduleDialogStore';
import SnippetsActions from '../Snippets/SnippetsActions';

// Components
import {FlatButton, TextField} from 'syncano-material-ui';
import {Dialog, SelectFieldWrapper} from '../../common';

export default React.createClass({
  displayName: 'ScheduleDialog',

  mixins: [
    Reflux.connect(Store),
    Mixins.Dialog,
    Mixins.Form
  ],

  validatorConstraints: {
    label: {
      presence: true
    },
    codebox: {
      presence: true
    },
    crontab: {
      presence: true
    }
  },

  handleDialogShow() {
    console.info('ScheduleDialog::handleDialogShow');
    SnippetsActions.fetch();
  },

  handleAddSubmit() {
    Actions.createSchedule({
      label: this.state.label,
      crontab: this.state.crontab,
      codebox: this.state.codebox
    });
  },

  handleEditSubmit() {
    Actions.updateSchedule(
      this.state.id, {
        label: this.state.label,
        crontab: this.state.crontab,
        codebox: this.state.codebox
      }
    );
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
        title={`${title} a Schedule Socket`}
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
            floatingLabelText="Label of the schedule"/>
          <SelectFieldWrapper
            name="snippet"
            options={this.state.snippets}
            value={this.state.codebox}
            onChange={this.setSelectFieldValue.bind(null, 'codebox')}
            errorText={this.getValidationMessages('codebox').join(' ')}/>
          <SelectFieldWrapper
            name="crontab"
            options={Store.getCrontabDropdown()}
            value={this.state.crontab}
            floatingLabelText="CronTab"
            onChange={this.setSelectFieldValue.bind(null, 'crontab')}
            errorText={this.getValidationMessages('crontab').join(' ')}/>
        </div>
      </Dialog>
    );
  }
});

