import React from 'react';
import Reflux from 'reflux';

import {DialogMixin, FormMixin} from '../../mixins';

import Actions from './GlobalConfigDialogActions';
import Store from './GlobalConfigDialogStore';

import {Dialog, Editor, Loading, Show, Notification} from '../../common';

export default React.createClass({
  displayName: 'GlobalConfig',

  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints: {
    globalConfig: (value) => {
      try {
        JSON.parse(value);
      } catch (e) {
        return {
          inclusion: {
            within: [],
            message: '^is not a valid JSON'
          }
        };
      }
      return null;
    }
  },

  componentWillUpdate(nextProps, nextState) {
    if (!this.state._dialogVisible && nextState._dialogVisible) {
      Actions.fetch();
    }
  },

  handleAddSubmit() {
    const {globalConfig} = this.state;

    Actions.updateGlobalConfig(JSON.parse(globalConfig));
  },

  handleChangeConfig(value) {
    this.setState({
      globalConfig: value
    });
  },

  render() {
    const {open, isLoading, isConfigLoading, globalConfig} = this.state;

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title="Global Config"
        onRequestClose={this.handleCancel}
        open={open}
        isLoading={isLoading}
        onConfirm={this.handleFormValidation}
        actions={
          <Dialog.StandardButtons
            disabled={isLoading}
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}/>
        }
        sidebar={
          <Dialog.SidebarBox key="sidebarbox">
            <Dialog.SidebarSection>
              Instance gathers all the data associated with a project into a shared space. It can be an equivalent
               of an app or a piece of functionality.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection>
              <Dialog.SidebarLink to="http://docs.syncano.io/#adding-an-instance">
                Learn more
              </Dialog.SidebarLink>
            </Dialog.SidebarSection>
            <Dialog.SidebarSection title="Restore from Backup">
              When adding a new instance, you can restore it from an existing backup. Use the dropdown menu
              to do a restore from a full or partial backup that is available within your account.
              You can also do a partial backup restore from a zip archive.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection last={true}>
              <Dialog.SidebarLink to="http://docs.syncano.io/v1.1/docs/overview-9">
                Learn more
              </Dialog.SidebarLink>
            </Dialog.SidebarSection>
          </Dialog.SidebarBox>
        }>
        <div className="vm-2-t">
          <Loading show={isConfigLoading}>
            <Editor
              name="globalConfigEditor"
              ref="globalConfigEditor"
              mode="json"
              height="400px"
              onChange={(value) => this.handleChangeConfig(value)}
              value={globalConfig || [
                '{',
                '    "name": "John",',
                '    "lastName": "Doe"',
                '}'
              ].join('\n')} />
          </Loading>
        </div>
        <div className="vm-2-t">
          <Show if={this.getValidationMessages('globalConfig').length}>
            <Notification type="error">
              {this.getValidationMessages('globalConfig')}
            </Notification>
          </Show>
        </div>
        <div className="vm-2-t">
          {this.renderFormNotifications()}
        </div>
      </Dialog.FullPage>
    );
  }
});
