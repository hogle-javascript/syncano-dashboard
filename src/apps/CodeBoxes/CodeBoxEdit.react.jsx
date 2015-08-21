import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import Actions from './CodeBoxActions';
import Store from './CodeBoxStore';

// Components
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
      }
    }
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
    }]
  },

  checkIsSaved() {
    let initialCodeBoxSource = this.state.currentCodeBox.source;
    let currentCodeBoxSource = this.refs.editorSource.editor.getValue();

    if (initialCodeBoxSource === currentCodeBoxSource) {
      this.handleRun();
    } else {
      this.showDialog('runUnsavedCodeBox');
    }
  },

  handleConfirm() {
    this.handleUpdate(this.handleRun);
    this.hideDialogs(true);
  },

  handleRun() {
    let payloadErrors = this.refs.tracePanel.state.errors;
    let payloadIsValid = typeof payloadErrors.payloadValue === 'undefined';

    if (payloadIsValid) {
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

  handleUpdate(callback) {
    let source = this.refs.editorSource.editor.getValue();

    Actions.updateCodeBox(this.state.currentCodeBox.id, {source}).then(callback);
    this.setSnackbarNotification({
      message: 'Saving...'
    });
  },

  renderEditor() {
    let styles = this.getStyles();
    let source = null;
    let codeBox = this.state.currentCodeBox;
    let editorMode = 'python';

    if (codeBox) {
      source = codeBox.source;
      editorMode = Store.getEditorMode();

      return (
        <div>
          <Common.Editor
            ref="editorSource"
            mode={editorMode}
            theme="tomorrow"
            value={source}/>

          <div style={styles.tracePanel}>
            <Common.Editor.Panel
              ref="tracePanel"
              trace={this.state.lastTraceResult}
              loading={!this.state.lastTraceReady}/>
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
            onClick={this.checkIsSaved}
            iconClassName="synicon-play"/>
        </Common.Fab>
        <Common.Loading show={this.state.isLoading}>
          {this.renderEditor()}
        </Common.Loading>
      </Container>
    );
  }
});
