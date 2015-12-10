import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';
import UnsavedDataMixin from './UnsavedDataMixin';
import AutosaveMixin from './SnippetAutosaveMixin';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

// Stores and Actions
import Actions from './SnippetActions';
import Store from './SnippetStore';

// Components
import MUI from 'syncano-material-ui';
import Common from '../../common';
import Container from '../../common/Container';

let SnackbarNotificationMixin = Common.SnackbarNotification.Mixin;

export default React.createClass({

  displayName: 'SnippetEdit',

  mixins: [
    Router.State,
    Router.Navigation,
    LinkedStateMixin,

    Reflux.connect(Store),
    Mixins.Dialog,
    Mixins.Dialogs,
    HeaderMixin,
    UnsavedDataMixin,
    AutosaveMixin,
    Mixins.InstanceTabs,
    Mixins.Mousetrap,
    SnackbarNotificationMixin
  ],

  autosaveAttributeName: 'snippetSourceAutosave',

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
    };
  },

  isPayloadValid() {
    let payloadErrors = this.refs.tracePanel.state.errors;
    let payloadIsValid = typeof payloadErrors.payloadValue === 'undefined';

    return payloadIsValid;
  },

  isSaved() {
    if (this.state.currentSnippet && this.refs.editorSource) {
      let initialSnippetSource = this.state.currentSnippet.source;
      let currentSnippetSource = this.refs.editorSource.editor.getValue();

      return initialSnippetSource === currentSnippetSource;
    }
  },

  handleConfirm() {
    let source = this.refs.editorSource.editor.getValue();
    let payload = this.refs.tracePanel.refs.payloadField.getValue();

    if (this.isPayloadValid()) {
      Actions.runSnippetWithUpdate(this.state.currentSnippet.id, {source}, {payload});
      this.hideDialogs(true);
    } else {
      this.hideDialogs(true);
      this.setSnackbarNotification({
        message: "Can't run Snippet with invalid payload",
        autoHideDuration: 3000
      });
    }
  },

  handleRun() {
    if (this.isPayloadValid()) {
      Actions.runSnippet({
        id: this.state.currentSnippet.id,
        payload: this.refs.tracePanel.refs.payloadField.getValue()
      });
    } else {
      this.setSnackbarNotification({
        message: "Can't run Snippet with invalid payload",
        autoHideDuration: 3000
      });
    }
  },

  handleUpdate() {
    let source = this.refs.editorSource.editor.getValue();

    this.clearAutosaveTimer();
    Actions.updateSnippet(this.state.currentSnippet.id, {source});
    this.setSnackbarNotification({
      message: 'Saving...'
    });
  },

  initDialogs() {
    return [{
      dialog: Common.Dialog,
      params: {
        key: 'runUnsavedSnippet',
        ref: 'runUnsavedSnippet',
        title: 'Unsaved Snippet',
        actions: [
          {
            text: 'Cancel',
            onClick: this.handleCancel.bind(null, 'runUnsavedSnippet')
          },
          {
            text: 'Save',
            onClick: this.handleConfirm
          }
        ],
        modal: true,
        children: "You're trying to run unsaved Snippet. Do You wan't to save it before run?"
      }
    }, {
      dialog: Common.Dialog,
      params: {
        key: 'unsavedDataWarn',
        ref: 'unsavedDataWarn',
        title: 'Unsaved Snippet source',
        actions: [
          {
            text: 'Just leave',
            onClick: this._handleContinueTransition
          },
          {
            text: 'Continue editing',
            onClick: this.handleCancel.bind(null, 'unsavedDataWarn')
          }
        ],
        modal: true,
        children: "You're leaving Snippet Editor with unsaved changes. Are you sure you want to continue?"
      }
    }];
  },

  shouldSnippetRun() {
    if (this.isSaved()) {
      this.handleRun();
    } else {
      this.showDialog('runUnsavedSnippet');
    }
  },

  renderEditor() {
    let styles = this.getStyles();
    let source = null;
    let snippet = this.state.currentSnippet;
    let editorMode = 'python';
    let traceStyle =
      this.state.lastTraceStatus === 'success' ? styles.statusSummarySuccess : styles.statusSummaryFailed;

    let lastTraceStatus = null;

    if (this.state.lastTraceStatus) {
      lastTraceStatus = this.state.lastTraceStatus[0].toUpperCase() + this.state.lastTraceStatus.slice(1);
    }

    if (snippet) {
      source = snippet.source;
      editorMode = Store.getEditorMode();

      return (
        <div>
          <Common.Editor
            ref="editorSource"
            mode={editorMode}
            theme="tomorrow"
            onChange={this.runAutoSave}
            onLoad={this.clearAutosaveTimer}
            value={source}/>
          <MUI.Checkbox
            ref="autosaveCheckbox"
            name="autosaveCheckbox"
            label="Autosave"
            style={styles.autosaveCheckbox}
            defaultChecked={this.isAutosaveEnabled()}
            onCheck={this.saveCheckboxState}/>

          <div style={styles.tracePanel}>
            <Common.Editor.Panel
              ref="tracePanel"
              trace={this.state.lastTraceResult}
              loading={!this.state.lastTraceReady}/>
            <Common.Show if={this.state.lastTraceDuration && this.state.lastTraceStatus}>
              <div style={styles.durationSummary}>
                Last run status: <span style={traceStyle}>{lastTraceStatus} </span>
                duration: {this.state.lastTraceDuration}ms
              </div>
            </Common.Show>
          </div>
        </div>
      );
    }
  },

  render() {
    let styles = this.getStyles();

    return (
      <Container style={styles.container}>
        {this.getDialogs()}
        <Common.Fab position="top">
          <Common.Fab.TooltipItem
            tooltip="Click here to save Snippet"
            mini={true}
            onClick={this.handleUpdate}
            iconClassName="synicon-content-save"/>
          <Common.Fab.TooltipItem
            tooltip="Click here to execute Snippet"
            mini={true}
            onClick={this.shouldSnippetRun}
            iconClassName="synicon-play"/>
        </Common.Fab>
        <Common.Loading show={this.state.isLoading}>
          {this.renderEditor()}
        </Common.Loading>
      </Container>
    );
  }
});
