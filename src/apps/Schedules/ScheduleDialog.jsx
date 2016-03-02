import React from 'react';
import Reflux from 'reflux';

// Utils
import {DialogMixin, FormMixin} from '../../mixins';

// Stores and Actions
import Actions from './SchedulesActions';
import Store from './ScheduleDialogStore';
import ScriptsActions from '../Scripts/ScriptsActions';

// Components
import {TextField} from 'syncano-material-ui';
import {SelectFieldWrapper} from 'syncano-components';
import {Dialog} from '../../common';

export default React.createClass({
  displayName: 'ScheduleDialog',

  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin
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
    ScriptsActions.fetch();
  },

  handleAddSubmit() {
    const {label, crontab, codebox} = this.state;

    Actions.createSchedule({label, crontab, codebox});
  },

  handleEditSubmit() {
    const {id, label, crontab, codebox} = this.state;

    Actions.updateSchedule(id, {label, crontab, codebox});
  },

  render() {
    const title = this.hasEditMode() ? 'Edit' : 'Create';

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={`${title} a Schedule Socket`}
        defaultOpen={this.props.defaultOpen}
        onRequestClose={this.handleCancel}
        open={this.state.open}
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
            floatingLabelText="Label of the schedule"/>
          <SelectFieldWrapper
            name="script"
            options={this.state.scripts}
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
      </Dialog.FullPage>
    );
  }
});

