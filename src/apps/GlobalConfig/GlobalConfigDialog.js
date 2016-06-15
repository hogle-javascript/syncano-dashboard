import React from 'react';
import Reflux from 'reflux';

import { DialogMixin, FormMixin } from '../../mixins';

import Actions from './GlobalConfigDialogActions';
import Store from './GlobalConfigDialogStore';

import { Dialog, Editor, Loading, Show, Notification } from '../../common';

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
    const { globalConfig } = this.state;

    Actions.updateGlobalConfig(JSON.parse(globalConfig));
  },

  handleChangeConfig(value) {
    this.setState({
      globalConfig: value
    });
  },

  render() {
    const { open, isLoading, isConfigLoading, globalConfig } = this.state;

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title="Global Config"
        onRequestClose={this.handleCancel}
        open={open}
        isLoading={isLoading}
        bindShortcuts={false}
        onConfirm={this.handleFormValidation}
        actions={
          <Dialog.StandardButtons
            disabled={isLoading}
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}
          />
        }
        sidebar={
          <Dialog.SidebarBox key="sidebarbox">
            <Dialog.SidebarSection>
              {`Global Config allows you to save some data like tokens or api keys. This data can be
                 accessed in all your Snippets.`}
            </Dialog.SidebarSection>
            <Dialog.SidebarSection title="Globacl Config">
              {`Global Config is a JSON object and will not overwrite you Snippet Config but will be merged
                with it. If both Configs contains the same key the Snippets Config value will be used.`}
            </Dialog.SidebarSection>
            <Dialog.SidebarSection last>
              <Dialog.SidebarLink to="http://docs.syncano.io/">
                Learn more
              </Dialog.SidebarLink>
            </Dialog.SidebarSection>
          </Dialog.SidebarBox>
        }
      >
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
              ].join('\n')}
            />
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
