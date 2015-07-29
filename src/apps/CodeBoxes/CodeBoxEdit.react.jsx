import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import InstanceTabsMixin from '../../mixins/InstanceTabsMixin';

// Stores and Actions
import Actions from './CodeBoxActions';
import Store from './CodeBoxStore';

// Components
import Common from '../../common';
import Container from '../../common/Container';
import SnackbarNotificationActions from '../../common/SnackbarNotification/SnackbarNotificationActions';

export default React.createClass({

  displayName: 'CodeBoxEdit',

  mixins: [
    Router.State,
    Router.Navigation,
    React.addons.LinkedStateMixin,

    Reflux.connect(Store),
    HeaderMixin,
    InstanceTabsMixin
  ],

  componentDidMount() {
    Actions.fetch();
  },

  getStyles() {
    return {
      container: {
        margin   : '25px auto',
        width    : '100%',
        maxWidth : '1140px'
      },
      tracePanel: {
        marginTop : 30,
        height    : 300
      }
    }
  },

  handleRun() {
    Actions.runCodeBox({
      id      : this.state.currentCodeBox.id,
      payload : this.refs.tracePanel.refs.payloadField.getValue()
    });

  },

  handleUpdate() {
    let source = this.refs.editorSource.editor.getValue();
    Actions.updateCodeBox(this.state.currentCodeBox.id, {source: source});
    SnackbarNotificationActions.set({
      message: 'Saving...'
    });
  },

  renderEditor() {
    let styles     = this.getStyles(),
        source     = null,
        codeBox    = this.state.currentCodeBox,
        editorMode = 'python';

    if (codeBox) {
      source     = codeBox.source;
      editorMode = Store.getEditorMode();

      return (
        <div>
          <Common.Editor
            ref   = "editorSource"
            mode  = {editorMode}
            theme = "github"
            value = {source} />
          <div style={styles.tracePanel}>
            <Common.Editor.Panel
              ref     = "tracePanel"
              trace   = {this.state.lastTraceResult}
              loading = {!this.state.lastTraceReady} />
          </div>
        </div>
      )
    }
  },

  render() {
    let styles = this.getStyles();
    return (
      <Container style={styles.container}>
        <Common.Fab position="top">
          <Common.Fab.Item
            label         = "Click here to save CodeBox"
            mini          = {true}
            onClick       = {this.handleUpdate}
            iconClassName = "synicon-content-save" />
          <Common.Fab.Item
            label         = "Click here to execute CodeBox"
            mini          = {true}
            onClick       = {this.handleRun}
            iconClassName = "synicon-play" />
        </Common.Fab>
        <Common.Loading show={this.state.isLoading}>
          {this.renderEditor()}
        </Common.Loading>
      </Container>
    );
  }
});
