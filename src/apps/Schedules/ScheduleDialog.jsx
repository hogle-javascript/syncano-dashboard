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
import {AutoComplete, TextField} from 'syncano-material-ui';
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

  handleCrontabChange(value) {
    this.setState({crontab: value});
  },

  handleCrontabOpen() {
    this.refs.crontab._open();
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
    const {open, isLoading, scripts, codebox, crontab, canSubmit} = this.state;
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
            valueLink={this.linkState('label')}
            errorText={this.getValidationMessages('label').join(' ')}
            hintText="Schedule's label"
            floatingLabelText="Label"/>
          <SelectFieldWrapper
            name="script"
            options={scripts}
            value={codebox}
            onChange={(event, index, value) => this.setSelectFieldValue('codebox', value)}
            errorText={this.getValidationMessages('codebox').join(' ')}/>
          <AutoComplete
            ref="crontab"
            floatingLabelText="Crontab"
            hintText="Choose option from the dropdown or type your own crontab"
            filter={AutoComplete.noFilter}
            animated={false}
            fullWidth={true}
            searchText={crontab}
            onNewRequest={this.handleCrontabChange}
            onUpdateInput={this.handleCrontabChange}
            dataSource={this.renderCrontabDataSource()}
            errorText={this.getValidationMessages('crontab').join(' ')}
            onTouchTap={this.handleCrontabOpen}/>
        </Dialog.ContentSection>
      </Dialog.FullPage>
    );
  }
});
