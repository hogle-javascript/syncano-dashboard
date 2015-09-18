import React from 'react';
import Reflux from 'reflux';

// Utils
import Mixins from '../../mixins';

// Stores and Actions
import Actions from './CodeBoxesActions';
import Store from './CodeBoxDialogStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'CodeBoxDialog',

  mixins: [
    Reflux.connect(Store),
    Mixins.Dialog,
    Mixins.Form
  ],

  validatorConstraints: {
    label: {
      presence: true
    },
    runtime_name: {
      presence: true
    }
  },

  handleDialogShow() {
    console.info('ScheduleDialog::handleDialogShow');
    Actions.fetchCodeBoxRuntimes();
  },

  handleEditSubmit() {
    Actions.updateCodeBox(this.state.id, {
      label: this.state.label,
      description: this.state.description,
      runtime_name: this.state.runtime_name
    });
  },

  handleAddSubmit() {
    Actions.createCodeBox({
      label: this.state.label,
      description: this.state.description,
      runtime_name: this.state.runtime_name
    });
  },

  render() {
    let title = this.hasEditMode() ? 'Edit' : 'Add';
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
        ref="submit"/>
    ];

    return (
      <form
        onSubmit={this.handleFormValidation}
        acceptCharset='UTF-8'
        method='post'>
        <Common.Dialog
          ref='dialog'
          title={title + ' a CodeBox'}
          actions={dialogStandardActions}
          onDismiss={this.resetDialogState}
          onShow={this.handleDialogShow}
          contentStyle={{padding: '8px 0 0 0'}}>
          <div>
            {this.renderFormNotifications()}
            <MUI.TextField
              ref='label'
              valueLink={this.linkState('label')}
              errorText={this.getValidationMessages('label').join(' ')}
              name='label'
              style={{width: 500}}
              hintText='Short name for your CodeBox'
              floatingLabelText='Label of a CodeBox'/>
            <MUI.TextField
              ref='description'
              name='description'
              valueLink={this.linkState('description')}
              errorText={this.getValidationMessages('description').join(' ')}
              style={{width: 500}}
              className='text-field'
              multiLine={true}
              hintText='Multiline CodeBox description (optional)'
              floatingLabelText='Description of a CodeBox'/>
            <MUI.SelectField
              ref='runtime_name'
              name='runtime_name'
              floatingLabelText='Runtime environment'
              valueLink={this.linkState('runtime_name')}
              errorText={this.getValidationMessages('runtime_name').join(' ')}
              valueMember='payload'
              displayMember='text'
              fullWidth={true}
              menuItems={this.state.runtimes}/>
          </div>
          <Common.Loading
            type='linear'
            position='bottom'
            show={this.state.isLoading}/>
        </Common.Dialog>
      </form>
    );
  }
});

