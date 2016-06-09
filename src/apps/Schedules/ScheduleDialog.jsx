import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';

// Utils
import {DialogMixin, FormMixin} from '../../mixins';

// Stores and Actions
import Actions from './SchedulesActions';
import Store from './ScheduleDialogStore';
import ScriptsActions from '../Scripts/ScriptsActions';

// Components
import {AutoComplete, TextField} from 'material-ui';
import {Dialog, SelectFieldWrapper} from '../../common/';

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
    script: {
      presence: true
    }
  },

  handleDialogShow() {
    console.info('ScheduleDialog::handleDialogShow');
    ScriptsActions.fetch();
  },

  handleAddSubmit() {
    const {label, crontab, script, interval_sec} = this.state;

    Actions.createSchedule({label, crontab, script, interval_sec});
  },

  handleEditSubmit() {
    const {id, label, crontab, script, interval_sec} = this.state;

    Actions.updateSchedule(id, {label, crontab, script, interval_sec});
  },

  handleCrontabChange(value) {
    const crontab = value.text ? value.text : value;

    this.setState({crontab});
  },

  handleIntervalSecChange(event, value) {
    const newValue = !_.isEmpty(value) ? value : null;
    
    this.setState({interval_sec: newValue});
  },

  renderCrontabDataSource() {
    const crontabs = Store.getCrontabDropdown();

    return _.map(crontabs, (crontab) => {
      return {
        text: crontab.payload,
        value: (
          <AutoComplete.Item
            primaryText={crontab.text}
            secondaryText={crontab.payload} />
        )
      };
    });
  },

  render() {
    const {open, isLoading, scripts, script, crontab, canSubmit, interval_sec, label} = this.state;
    const title = this.hasEditMode() ? 'Edit' : 'Add';

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={`${title} a Schedule Socket`}
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
              Schedule Sockets are one of the available ways of running your Snippet Scripts. Thanks to Schedules
               you can execute Scripts at some time interval.
               (e.g. every 5 minutes).
            </Dialog.SidebarSection>
            <Dialog.SidebarSection title="Script">
              Chosen Script will be executed at selected time interval writen as crontab.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection title="Crontab">
              We prepared some crontabs to choose from. You can also write your own.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection last={true}>
              <Dialog.SidebarLink to="http://docs.syncano.io/docs/schedules">
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
            value={label}
            onChange={(event, value) => this.setState({label: value})}
            errorText={this.getValidationMessages('label').join(' ')}
            hintText="Schedule's label"
            floatingLabelText="Label"/>
          <SelectFieldWrapper
            name="script"
            options={scripts}
            value={script}
            onChange={(event, index, value) => this.setSelectFieldValue('script', value)}
            errorText={this.getValidationMessages('script').join(' ')}/>
          <AutoComplete
            ref="crontab"
            floatingLabelText="Crontab"
            hintText="Choose option from the dropdown or type your own crontab"
            filter={AutoComplete.noFilter}
            animated={false}
            fullWidth={true}
            searchText={crontab}
            openOnFocus={true}
            onNewRequest={this.handleCrontabChange}
            onUpdateInput={this.handleCrontabChange}
            dataSource={this.renderCrontabDataSource()}
            errorText={this.getValidationMessages('crontab').join(' ')} />
          <TextField
            ref="Interval"
            name="interval_sec"
            fullWidth={true}
            value={interval_sec}
            onChange={this.handleIntervalSecChange}
            errorText={this.getValidationMessages('interval_sec').join(' ')}
            hintText="Type interval time in miliseconds"
            floatingLabelText="Interval"/>
        </Dialog.ContentSection>
      </Dialog.FullPage>
    );
  }
});
