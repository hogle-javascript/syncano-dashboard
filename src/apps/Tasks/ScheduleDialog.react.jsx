import React from 'react';
import Reflux from 'reflux';

// Utils
import Mixins from '../../mixins';

// Stores and Actions
import SchedulesActions from './SchedulesActions';
import ScheduleDialogStore from './ScheduleDialogStore';
import CodeBoxesActions from '../CodeBoxes/CodeBoxesActions';

// Components
import MUI from 'material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'ScheduleDialog',

  mixins: [
    Reflux.connect(ScheduleDialogStore),
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
    CodeBoxesActions.fetch();
  },

  handleAddSubmit() {
    SchedulesActions.createSchedule({
      label: this.state.label,
      crontab: this.state.crontab,
      codebox: this.state.codebox
    });
  },

  handleEditSubmit() {
    SchedulesActions.updateSchedule(
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
      <MUI.FlatButton
        key="cancel"
        label="Cancel"
        onTouchTap={this.handleCancel}
        ref="cancel"/>,
      <MUI.FlatButton
        type="submit"
        key="confirm"
        label="Confirm"
        primary={true}
        onTouchTap={this.handleFormValidation}
        ref="submit"/>
    ];

    return (
      <form
        onSubmit={this.handleFormValidation}
        acceptCharset='UTF-8'
        method='post'>
        <Common.Dialog
          ref='dialog'
          title={title + ' a Schedule'}
          openImmediately={this.props.openImmediately}
          actions={dialogStandardActions}
          onShow={this.handleDialogShow}
          onDismiss={this.resetDialogState}>
          <div>
            {this.renderFormNotifications()}
            <MUI.TextField
              ref='label'
              name='label'
              fullWidth={true}
              valueLink={this.linkState('label')}
              errorText={this.getValidationMessages('label').join(' ')}
              floatingLabelText='Label of the schedule'/>
            <MUI.SelectField
              ref='codebox'
              name='codebox'
              className='codebox-dropdown'
              floatingLabelText='CodeBox'
              valueLink={this.linkState('codebox')}
              errorText={this.getValidationMessages('codebox').join(' ')}
              valueMember='payload'
              displayMember='text'
              fullWidth={true}
              menuItems={this.state.codeboxes}/>
            <MUI.SelectField
              ref='crontab'
              name='crontab'
              className='crontab-dropdown'
              floatingLabelText='CronTab'
              valueLink={this.linkState('crontab')}
              errorText={this.getValidationMessages('crontab').join(' ')}
              valueMember='payload'
              displayMember='text'
              fullWidth={true}
              menuItems={ScheduleDialogStore.getCrontabDropdown()}/>
          </div>
        </Common.Dialog>
      </form>
    );
  }
});

