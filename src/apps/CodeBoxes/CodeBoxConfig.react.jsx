import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import Radium from 'radium';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import UnsavedDataMixin from './UnsavedDataMixin';
import AutosaveMixin from './CodeBoxAutosaveMixin';
import Mixins from '../../mixins';

// Stores and Actions
import Actions from './CodeBoxActions';
import Store from './CodeBoxStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';
import Container from '../../common/Container/Container.react';

let SnackbarNotificationMixin = Common.SnackbarNotification.Mixin;

export default Radium(React.createClass({

  displayName: 'CodeBoxConfig',

  mixins: [
    Router.State,
    Router.Navigation,
    React.addons.LinkedStateMixin,

    Reflux.connect(Store),
    HeaderMixin,
    SnackbarNotificationMixin,
    UnsavedDataMixin,
    AutosaveMixin,
    Mixins.Mousetrap,
    Mixins.Dialogs,
    Mixins.InstanceTabs
  ],

  autosaveAttributeName: 'codeBoxConfigAutosave',

  componentDidMount() {
    Actions.fetch();
    this.bindShortcut(['command+s', 'ctrl+s'], () => {
      this.handleUpdate();
      return false;
    });
  },

  getStyles() {
    return {
      container: {
        margin: '25px auto',
        width: '100%',
        maxWidth: '1140px'
      },
      autosaveCheckbox: {
        marginTop: 30
      }
    }
  },

  isSaved() {
    if (this.state.currentCodeBox && this.refs.editorConfig) {
      let initialCodeBoxConfig = JSON.stringify(this.state.currentCodeBox.config, null, 2);
      let currentCodeBoxConfig = this.refs.editorConfig.editor.getValue();

      return initialCodeBoxConfig === currentCodeBoxConfig;
    }
  },

  isConfigValid() {
    let configValue = this.refs.editorConfig ? this.refs.editorConfig.editor.getValue() : null;

    if (configValue) {
      try {
        JSON.parse(configValue);
        return true
      } catch (err) {
        return false
      }
    }
  },

  handleUpdate() {
    let config = this.refs.editorConfig.editor.getValue();

    if (this.isConfigValid()) {
      this.clearAutosaveTimer();
      Actions.updateCodeBox(this.state.currentCodeBox.id, {config});
      this.setSnackbarNotification({
        message: 'Saving...'
      });
    } else {
      this.setSnackbarNotification({
        message: 'Config is not Valid. Please verify if it is valid JSON format',
        autoHideDuration: 4000
      });
    }
  },

  initDialogs() {
    return [{
      dialog: Common.Dialog,
      params: {
        ref: 'unsavedDataWarn',
        title: 'Unsaved CodeBox config',
        actions: [
          {
            text: 'Just leave',
            onClick: this._handleContinueTransition
          },
          {
            text: 'Continue editing',
            onClick: this.handleCancel
          }
        ],
        modal: true,
        children: "You're leaving CodeBox Config with unsaved changes. Are you sure you want to continue?"
      }
    }]
  },

  renderEditor() {
    let styles = this.getStyles();
    let config = null;
    let codeBox = this.state.currentCodeBox;

    if (codeBox) {
      config = JSON.stringify(codeBox.config, null, 2);

      return (
        <div>
          <Common.Editor
            ref="editorConfig"
            height={300}
            mode="javascript"
            onLoad={this.clearAutosaveTimer}
            onChange={this.runAutoSave}
            theme="github"
            value={config} />
          <MUI.Checkbox
            ref="autosaveCheckbox"
            name="autoSaveCheckbox"
            label="Autosave"
            style={styles.autosaveCheckbox}
            defaultChecked={this.isAutosaveEnabled()}
            onCheck={this.saveCheckboxState} />
        </div>
      )
    }
  },

  render() {
    console.debug('CodeBoxConfig::render');
    let styles = this.getStyles();

    return (
      <Container style={styles.container}>
        {this.getDialogs()}
        <Common.Fab position="top">
          <Common.Fab.TooltipItem
            tooltip="Click here to save CodeBox"
            mini={true}
            onClick={this.handleUpdate}
            iconClassName="synicon-content-save"/>
        </Common.Fab>
        <Common.Loading show={this.state.isLoading}>
          {this.renderEditor()}
        </Common.Loading>
      </Container>
    );
  }
}));
