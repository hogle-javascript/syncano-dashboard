import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';
import UnsavedDataMixin from './UnsavedDataMixin';
import AutosaveMixin from './CodeBoxAutosaveMixin';

// Stores and Actions
import Actions from './CodeBoxActions';
import Store from './CodeBoxStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';
import Container from '../../common/Container';

let SnackbarNotificationMixin = Common.SnackbarNotification.Mixin;

export default React.createClass({

  displayName: 'CodeBoxEdit',

  mixins: [
    Router.State,
    Router.Navigation,
    React.addons.LinkedStateMixin,

    Reflux.connect(Store),
    Mixins.Dialogs,
    HeaderMixin,
    UnsavedDataMixin,
    AutosaveMixin,
    Mixins.InstanceTabs,
    Mixins.Mousetrap,
    SnackbarNotificationMixin
  ],

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
      tracePanel: {
        marginTop: 30,
        height: 300
      },
      durationSummary: {
        marginTop: 8
      },
      autosaveCheckbox: {
        marginTop: 30
      },
      statusSummaryFailed: {
        color: MUI.Styles.Colors.red400
      },
      statusSummarySuccess: {
        color: MUI.Styles.Colors.green400
      }
    }
  },

  isPayloadValid() {
    let payloadErrors = this.refs.tracePanel.state.errors;
    let payloadIsValid = typeof payloadErrors.payloadValue === 'undefined';

    return payloadIsValid;
  },

  isSaved() {
    if (this.state.currentCodeBox && this.refs.editorSource) {
      let initialCodeBoxSource = this.state.currentCodeBox.source;
      let currentCodeBoxSource = this.refs.editorSource.editor.getValue();

      return initialCodeBoxSource === currentCodeBoxSource;
    }
  },

  handleConfirm() {
    let source = this.refs.editorSource.editor.getValue();
    let payload = this.refs.tracePanel.refs.payloadField.getValue();

    if (this.isPayloadValid()) {
      Actions.runCodeBoxWithUpdate(this.state.currentCodeBox.id, {source}, {payload})
      this.hideDialogs(true);
    } else {
      this.hideDialogs(true);
      this.setSnackbarNotification({
        message: "Can't run CodeBox with invalid payload",
        autoHideDuration: 3000
      });
    }
  },

  handleRun() {
    if (this.isPayloadValid()) {
      Actions.runCodeBox({
        id: this.state.currentCodeBox.id,
        payload: this.refs.tracePanel.refs.payloadField.getValue()
      });
    } else {
      this.setSnackbarNotification({
        message: "Can't run CodeBox with invalid payload",
        autoHideDuration: 3000
      });
    }
  },

  handleUpdate() {
    clearTimeout(this._timeout);
    let source = this.refs.editorSource.editor.getValue();

    Actions.updateCodeBox(this.state.currentCodeBox.id, {source});
    this.setSnackbarNotification({
      message: 'Saving...'
    });
  },

  initDialogs() {
    return [{
      dialog: Common.Dialog,
      params: {
        ref: 'runUnsavedCodeBox',
        title: 'Unsaved CodeBox',
        actions: [
          {
            text: 'Cancel',
            onClick: this.handleCancel
          },
          {
            text: 'Save',
            onClick: this.handleConfirm
          }
        ],
        modal: true,
        children: "You're trying to run unsaved CodeBox. Do You wan't to save it before run?"
      }
    },
    {
      dialog: Common.Dialog,
      params: {
        ref: 'unsavedDataWarn',
        title: 'Unsaved CodeBox source',
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
        children: "You're leaving CodeBox Editor with unsaved changes. Are you sure you want to continue?"
      }
    }]
  },

  shouldCodeBoxRun() {
    if (this.isSaved()) {
      this.handleRun();
    } else {
      this.showDialog('runUnsavedCodeBox');
    }
  },

  renderEditor() {
    let styles = this.getStyles();
    let source = null;
    let codeBox = this.state.currentCodeBox;
    let editorMode = 'python';
    let traceStyle =
      this.state.lastTraceStatus === 'success' ? styles.statusSummarySuccess : styles.statusSummaryFailed;

    let lastTraceStatus = null;

    if (this.state.lastTraceStatus) {
      lastTraceStatus = this.state.lastTraceStatus[0].toUpperCase() + this.state.lastTraceStatus.slice(1);
    }

    if (codeBox) {
      source = codeBox.source;
      editorMode = Store.getEditorMode();

      return (
        <div>
          <Common.Editor
            ref="editorSource"
            mode={editorMode}
            theme="tomorrow"
            onChange={this.runAutoSave}
            onLoad={clearTimeout(this._timeout)}
            value={source}/>
          <MUI.Checkbox
            ref="autosaveCheckbox"
            name="autosaveCheckbox"
            label="Autosave"
            style={styles.autosaveCheckbox}
            defaultChecked={JSON.parse(this.getLocalStorageItem())}
            onCheck={this.saveCheckboxState}/>

          <div style={styles.tracePanel}>
            <Common.Editor.Panel
              ref="tracePanel"
              trace={this.state.lastTraceResult}
              loading={!this.state.lastTraceReady}/>
            <div style={styles.durationSummary}>
              Last run status: <span style={traceStyle}>{lastTraceStatus} </span>
              duration: {this.state.lastTraceDuration}ms
            </div>
          </div>
        </div>
      )
    }
  },

  render() {
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
          <Common.Fab.TooltipItem
            tooltip="Click here to execute CodeBox"
            mini={true}
            onClick={this.shouldCodeBoxRun}
            iconClassName="synicon-play"/>
        </Common.Fab>
        <Common.Loading show={this.state.isLoading}>
          {this.renderEditor()}
        </Common.Loading>
      </Container>
    );
  }
});
