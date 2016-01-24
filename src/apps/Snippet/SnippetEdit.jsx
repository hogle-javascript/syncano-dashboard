import React from 'react';
import Reflux from 'reflux';
import {Navigation, State} from 'react-router';
import SnippetConstants from './SnippetConstants';

// Utils
import {
  DialogMixin,
  DialogsMixin,
  InstanceTabsMixin,
  FormMixin,
  MousetrapMixin,
  SnackbarNotificationMixin
} from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';
import UnsavedDataMixin from './UnsavedDataMixin';
import AutosaveMixin from './SnippetAutosaveMixin';

// Stores and Actions
import Actions from './SnippetActions';
import Store from './SnippetStore';

// Components
import {FlatButton, Styles, Checkbox} from 'syncano-material-ui';
import {Show, CharacterCounter, Loading} from 'syncano-components';
import {Dialog, Editor, Notification} from '../../common';

export default React.createClass({
  displayName: 'SnippetEdit',

  mixins: [
    State,
    Navigation,

    Reflux.connect(Store),
    DialogMixin,
    DialogsMixin,
    InstanceTabsMixin,
    MousetrapMixin,
    FormMixin,
    HeaderMixin,
    UnsavedDataMixin,
    AutosaveMixin,
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
        color: Styles.Colors.red400
      },
      statusSummarySuccess: {
        color: Styles.Colors.green400
      },
      notification: {
        marginTop: 20
      }
    };
  },

  isSaved() {
    if (this.state.currentSnippet && this.refs.editorSource) {
      let initialSnippetSource = this.state.currentSnippet.source;
      let currentSnippetSource = this.refs.editorSource.editor.getValue();

      return initialSnippetSource === currentSnippetSource;
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

  handleOnSourceChange() {
    this.resetForm();
    this.runAutoSave();
  },

  initDialogs() {
    return [{
      dialog: Dialog,
      params: {
        key: 'unsavedDataWarn',
        ref: 'unsavedDataWarn',
        title: 'Unsaved Snippet source',
        actions: [
          <FlatButton
            label="Just leave"
            secondary={true}
            onTouchTap={this._handleContinueTransition}/>,
          <FlatButton
            label="Continue editing"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.handleCancel.bind(null, 'unsavedDataWarn')}/>
        ],
        modal: true,
        children: "You're leaving Snippet Editor with unsaved changes. Are you sure you want to continue?"
      }
    }];
  },

  render() {
    let styles = this.getStyles();
    let source = null;
    let snippet = this.state.currentSnippet;
    let editorMode = 'python';
    let charactersCount = this.refs.editorSource ? this.refs.editorSource.editor.getValue().length : 0;
    let traceStyle =
      this.state.lastTraceStatus === 'success' ? styles.statusSummarySuccess : styles.statusSummaryFailed;

    let lastTraceStatus = null;

    if (this.state.lastTraceStatus) {
      lastTraceStatus = this.state.lastTraceStatus[0].toUpperCase() + this.state.lastTraceStatus.slice(1);
    }

    if (snippet) {
      source = snippet.source;
      editorMode = Store.getEditorMode();
    }

    return (
      <div>
        {this.getDialogs()}
        <Loading show={this.state.isLoading || !snippet}>
          <div>
            <Editor
              ref="editorSource"
              mode={editorMode}
              theme="tomorrow"
              onChange={this.handleOnSourceChange}
              onLoad={this.clearAutosaveTimer}
              value={source}/>
            <CharacterCounter
              charactersCountWarn={SnippetConstants.charactersCountWarn}
              characters={charactersCount}
              maxCharacters={SnippetConstants.maxCharactersCount}/>
            <Show if={this.getValidationMessages('source').length > 0}>
              <div style={styles.notification}>
                <Notification type="error">
                  {this.getValidationMessages('source').join(' ')}
                </Notification>
              </div>
            </Show>
            <Checkbox
              ref="autosaveCheckbox"
              name="autosaveCheckbox"
              label="Autosave"
              style={styles.autosaveCheckbox}
              defaultChecked={this.isAutosaveEnabled()}
              onCheck={this.saveCheckboxState}/>

            <div style={styles.tracePanel}>
              <Editor.Panel
                ref="tracePanel"
                onError={Actions.setPayloadValidator}
                handleChange={Actions.setPayloadValue}
                trace={this.state.lastTraceResult}
                loading={!this.state.lastTraceReady}/>
              <Show if={this.state.lastTraceDuration && this.state.lastTraceStatus}>
                <div style={styles.durationSummary}>
                  Last run status: <span style={traceStyle}>{lastTraceStatus} </span>
                  duration: {this.state.lastTraceDuration}ms
                </div>
              </Show>
            </div>
          </div>
        </Loading>
      </div>
    );
  }
});
