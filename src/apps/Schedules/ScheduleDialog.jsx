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
    this.setState({crontab: value}
  },

  handleCrontabOpen() {
    this.refs.crontab._open()
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
    const {open, isLoading, scripts, codebox, crontab} = this.state;
    const title = this.hasEditMode() ? 'Edit' : 'Create';

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
            options={scripts}
            value={codebox}
            onChange={this.setSelectFieldValue.bind(null, 'codebox')}
            errorText={this.getValidationMessages('codebox').join(' ')}/>
          <AutoComplete
            ref="crontab"
            floatingLabelText="Crontab"
            filter={AutoComplete.noFilter}
            animated={false}
            fullWidth={true}
            searchText={crontab}
            onNewRequest={this.handleCrontabChange}
            onUpdateInput={this.handleCrontabChange}
            dataSource={this.renderCrontabDataSource()}
            errorText={this.getValidationMessages('crontab').join(' ')}
            onTouchTap={this.handleCrontabOpen}/>
        </div>
      </Dialog.FullPage>
    );
  }
});

