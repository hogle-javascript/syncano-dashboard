import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';
import moment from 'moment-timezone';

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
    const {label, crontab, script, timezone} = this.state;

    Actions.createSchedule({label, crontab, script, timezone});
  },

  handleEditSubmit() {
    const {id, label, crontab, script, timezone} = this.state;

    Actions.updateSchedule(id, {label, crontab, script, timezone});
  },

  handleChangeFields(key, value) {
    const keyMap = {
      timezone: value.text ? value.text : value,
      crontab: value.text ? value.text : value,
      label: value,
      interval_sec: !_.isEmpty(value) ? value : null
    };

    this.setState({[key] : keyMap[key]});
  },

  renderCrontabDataSource() {
    const crontabs = Store.getCrontabDropdown();

    return _.map(crontabs, (crontab) => ({
      text: crontab.payload,
      value: <AutoComplete.Item primaryText={crontab.text} secondaryText={crontab.payload} />
    }));
  },

  renderTimezoneDataSource() {
    const timezones = moment.tz.names();

    return _.map(timezones, (timezone) => ({
      text: timezone,
      value: <AutoComplete.Item primaryText={timezone} />
    }));
  },

  render() {
    const {open, isLoading, scripts, script, crontab, canSubmit, timezone} = this.state;
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
            value={this.state.label}
            onChange={(event, value) => this.handleChangeFields('label', value)}
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
            onNewRequest={(value) => this.handleChangeFields('crontab', value)}
            onUpdateInput={(value) => this.handleChangeFields('crontab', value)}
            dataSource={this.renderCrontabDataSource()}
            errorText={this.getValidationMessages('crontab').join(' ')} />
          <AutoComplete
            floatingLabelText="Timezone"
            hintText="Choose option from the dropdown or type timezone"
            animated={false}
            fullWidth={true}
            filter={(searchText, key) => _.toLower(key).includes(_.toLower(searchText))}
            maxSearchResults={5}
            searchText={timezone}
            openOnFocus={true}
            onNewRequest={(value) => this.handleChangeFields('timezone', value)}
            onUpdateInput={(value) => this.handleChangeFields('timezone', value)}
            dataSource={this.renderTimezoneDataSource()}
            errorText={this.getValidationMessages('timezone').join(' ')} />
        </Dialog.ContentSection>
      </Dialog.FullPage>
    );
  }
});
