import React from 'react';
import Reflux from 'reflux';
import {State, Navigation} from 'react-router';

import HeaderMixin from '../Header/HeaderMixin';
import {DialogsMixin, FormMixin, InstanceTabsMixin, MousetrapMixin, SnackbarNotificationMixin} from '../../mixins';
import AutosaveMixin from './SnippetAutosaveMixin';

import Store from './SnippetStore';
import Actions from './SnippetActions';

import {RaisedButton, FontIcon, Checkbox} from 'syncano-material-ui';
import {Loading, Show, TogglePanel} from 'syncano-components';
import {Dialog, InnerToolbar, Editor, Notification} from '../../common';
import Traces from '../Traces';
import SnippetConfig from './SnippetConfig';

export default React.createClass({
  displayName: 'Snippet',

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  mixins: [
    State,
    Navigation,

    Reflux.connect(Store),
    HeaderMixin,
    InstanceTabsMixin,
    SnackbarNotificationMixin,
    AutosaveMixin,
    FormMixin,
    MousetrapMixin,
    DialogsMixin
  ],

  autosaveAttributeName: 'snippetSourceAutosave',

  componentDidMount() {
    Actions.fetch();
    this.bindShortcut(['command+s', 'ctrl+s'], () => {
      this.handleUpdate();
      return false;
    });
  },

  componentWillUnmount() {
    Store.clearCurrentSnippet();
  },

  getStyles() {
    return {
      autosaveCheckbox: {
        marginTop: 16,
        whiteSpace: 'nowrap'
      },
      notification: {
        marginTop: 20
      },
      lastResultContainer: {
        position: 'fixed',
        bottom: 20,
        right: 20
      }
    };
  },

  getToolbarTitle() {
    let currentSnippet = this.state.currentSnippet;

    return currentSnippet ? `Snippet: ${currentSnippet.label} (id: ${currentSnippet.id})` : '';
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

  handleRunSnippet() {
    this.handleUpdate();
    if (this.state.isPayloadValid) {
      Actions.runSnippet({
        id: this.state.currentSnippet.id,
        payload: this.state.payloadValue
      });
    } else {
      this.setSnackbarNotification({
        message: "Can't run Snippet with invalid payload",
        autoHideDuration: 3000
      });
    }
  },

  initDialogs() {
    return [{
      dialog: Dialog.FullPage,
      params: {
        key: 'scriptTraces',
        ref: 'scriptTraces',
        title: 'Traces for',
        actions: [],
        onRequestClose: () => this.handleCancel('scriptTraces'),
        avoidResetState: true,
        children: <Traces.List
                    isLoading={this.state.isLoading}
                    tracesFor="snippet"
                    name="Traces"
                    items={this.state.traces}/>
      }
    }];
  },

  render() {
    const styles = this.getStyles();
    const {currentSnippet, lastTraceStatus, isLoading, lastTraceDuration, lastTraceResult} = this.state;
    let source = null;
    let editorMode = 'python';

    if (currentSnippet) {
      source = currentSnippet.source;
      editorMode = Store.getEditorMode();
    }

    return (
      <div className="col-flex-1" style={{padding: 0, height: '100px', display: 'flex', flexDirection: 'column'}}>
        {this.getDialogs()}
        <InnerToolbar
          title={this.getToolbarTitle()}
          backFallback={() => this.transitionTo('snippets', this.getParams())}
          forceBackFallback={true}
          backButtonTooltip="Go back to Snippets list">
          <div style={{display: 'inline-block', float: 'left'}}>
            <Checkbox
              ref="autosaveCheckbox"
              name="autosaveCheckbox"
              label="Autosave"
              style={styles.autosaveCheckbox}
              defaultChecked={this.isAutosaveEnabled()}
              onCheck={this.saveCheckboxState}/>
          </div>
          <RaisedButton
            label="TRACES"
            onTouchTap={() => this.showDialog('scriptTraces')}/>
          <RaisedButton
            label="RUN"
            secondary={true}
            style={{marginLeft: 0, marginRight: 0}}
            icon={<FontIcon className="synicon-play"/>}
            onTouchTap={this.handleRunSnippet}/>
        </InnerToolbar>
        <Loading show={isLoading || !currentSnippet}>
          <div className="row">
            <div className="col-flex-1" style={{borderRight: '1px solid rgba(224,224,224,.5)'}}>
              <TogglePanel
                title="Code"
                initialOpen={true}>
                <Show if={this.getValidationMessages('source').length > 0}>
                  <div style={styles.notification}>
                    <Notification type="error">
                      {this.getValidationMessages('source').join(' ')}
                    </Notification>
                  </div>
                </Show>
                <Editor
                  ref="editorSource"
                  mode={editorMode}
                  onChange={this.handleOnSourceChange}
                  onLoad={this.clearAutosaveTimer}
                  value={source}
                  maxLines="Infinity"/>
              </TogglePanel>
            </div>
            <div className="col-flex-1" style={{padding: 0}}>

              <div style={{borderBottom: '1px solid rgba(224,224,224,.5)'}}>
                <TogglePanel
                  title="Config"
                  initialOpen={true}>
                  <SnippetConfig/>
                </TogglePanel>
              </div>

              <div style={{borderBottom: '1px solid rgba(224,224,224,.5)'}}>
                <TogglePanel
                  title="Payload"
                  initialOpen={true}>
                  <Editor
                    name="payload-editor"
                    ref="payloadSource"
                    mode="json"
                    height="200px"
                    onChange={(payload) => this.setState({payloadValue: payload})}
                    value={[
                      '{',
                      '    "language": "JSON",',
                      '    "foo": "bar",',
                      '    "trailing": "comma"',
                      '}'
                    ].join('\n')} />
                </TogglePanel>
              </div>

              <div>
                <TogglePanel
                  title="Result"
                  initialOpen={true}>
                  <div style={{
                    color: '#121212',
                    fontFamily: 'Ubuntu Mono',
                    fontSize: 14
                  }}>
                    {lastTraceResult}
                  </div>
                </TogglePanel>
              </div>
            </div>
            <Show if={lastTraceDuration && lastTraceStatus}>
              <div style={styles.lastResultContainer}>
                <Notification type={lastTraceStatus === 'success' ? 'info' : 'error'}>
                  {`Last run status: ${lastTraceStatus} Duration: ${lastTraceDuration}ms`}
                </Notification>
              </div>
            </Show>
          </div>
        </Loading>
      </div>
    );
  }
});
