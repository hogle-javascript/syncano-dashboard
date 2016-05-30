import React from 'react';
import Reflux from 'reflux';

import {DialogMixin, FormMixin} from '../../../mixins';

import Actions from './PartialBackupsActions';
import Store from './PartialBackupsDialogStore';

import {TextField} from 'material-ui';
import {Dialog, Editor, Notification, Show, TogglePanel} from '../../../common';

export default React.createClass({
  displayName: 'CreatePartialBackupDialog',

  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints: {
    label: {
      presence: true,
      length: {
        minimum: 5,
        maximum: 64
      }
    },
    description: {
      length: {
        maximum: 256
      }
    },
    queryArgs: (value) => {
      try {
        JSON.parse(value);
      } catch (e) {
        return {
          inclusion: {
            within: [],
            message: 'is not a valid JSON'
          }
        };
      }
      return null;
    }
  },

  getStyles() {
    return {
      queryArgsLabel: {
        color: '#AAA',
        fontSize: 10,
        fontWeight: 800,
        margin: '20px 0 10px 0'
      }
    };
  },

  handleQueryArgsChange(value) {
    this.setState({
      queryArgs: value
    });
  },

  handleAddSubmit() {
    const {label, description, queryArgs} = this.state;

    Actions.createPartialBackup({label, description, query_args: JSON.parse(queryArgs)});
  },

  render() {
    const {isLoading, open, queryArgs} = this.state;
    const styles = this.getStyles();

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        contentSize="medium"
        title="Create Instance Partial Backup"
        onRequestClose={this.handleCancel}
        open={open}
        isLoading={isLoading}
        actions={
          <Dialog.StandardButtons
            disabled={isLoading}
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}/>
        }>
        <div>
          <TextField
            autoFocus={true}
            fullWidth={true}
            valueLink={this.linkState('label')}
            errorText={this.getValidationMessages('label').join(' ')}
            hintText="Backup's label"
            floatingLabelText="Label" />
          <TextField
            fullWidth={true}
            valueLink={this.linkState('description')}
            errorText={this.getValidationMessages('description').join(' ')}
            hintText="Backup's description"
            floatingLabelText="Description" />
          <div className="vm-3-t">
            <div style={styles.queryArgsLabel}>QUERY ARGS</div>
            <Editor
              name="queryArgsEditor"
              ref="queryArgsEditor"
              mode="json"
              height="400px"
              onChange={this.handleQueryArgsChange}
              value={queryArgs}/>
          </div>
          <div className="vm-2-t">
            {this.renderFormNotifications()}
            <Show if={this.getValidationMessages('queryArgs').length}>
              <Notification type="error">
                {this.getValidationMessages('queryArgs').join(' ')}
              </Notification>
            </Show>
          </div>
        </div>
      </Dialog.FullPage>
    );
  }
});
