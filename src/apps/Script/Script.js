import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';
import {State, Navigation} from 'react-router';

import {DialogsMixin, FormMixin, MousetrapMixin, SnackbarNotificationMixin} from '../../mixins';
import AutosaveMixin from './ScriptAutosaveMixin';

import Store from './ScriptStore';
import Actions from './ScriptActions';

import {RaisedButton, FontIcon, Checkbox} from 'syncano-material-ui';
import {Loading, Show, TogglePanel} from 'syncano-components';
import {Dialog, InnerToolbar, Editor, Notification} from '../../common';
import Traces from '../Traces';
import ScriptConfig from './ScriptConfig';

export default React.createClass({
  displayName: 'Script',

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  mixins: [
    State,
    Navigation,

    Reflux.connect(Store),
    SnackbarNotificationMixin,
    AutosaveMixin,
    FormMixin,
    MousetrapMixin,
    DialogsMixin
  ],

  autosaveAttributeName: 'scriptSourceAutosave',

  componentDidMount() {
    Actions.fetch();
    this.bindShortcut(['command+s', 'ctrl+s'], () => {
      this.handleUpdate();
      return false;
    });

    this.runScript = _.debounce(Actions.runScript, 500, {leading: true});
  },

  componentWillUnmount() {
    Store.clearCurrentScript();
  },

  getStyles() {
    return {
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
    let currentScript = this.state.currentScript;

    return currentScript ? `Script: ${currentScript.label} (id: ${currentScript.id})` : '';
  },

  isSaved() {
    if (this.state.currentScript && this.refs.editorSource) {
      let initialScriptSource = this.state.currentScript.source;
      let currentScriptSource = this.refs.editorSource.editor.getValue();

      return initialScriptSource === currentScriptSource;
    }
  },

  handleUpdate() {
    let source = this.refs.editorSource.editor.getValue();

    this.clearAutosaveTimer();
    Actions.updateScript(this.state.currentScript.id, {source});
    this.setSnackbarNotification({
      message: 'Saving...'
    });
  },

  handleOnSourceChange() {
    this.resetForm();
    this.runAutoSave();
  },

  handleRunScript() {
    this.handleUpdate();
    if (this.state.isPayloadValid) {
      this.runScript({
        id: this.state.currentScript.id,
        payload: this.state.payloadValue
      });
    } else {
      this.setSnackbarNotification({
        message: "Can't run Script with invalid payload",
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
        title: `Traces for ${this.getToolbarTitle()}`,
        actions: [],
        onRequestClose: () => this.handleCancel('scriptTraces'),
        children: <Traces.List
                    isLoading={this.state.isLoading}
                    tracesFor="script"
                    name="Traces"
                    items={this.state.traces}/>
      }
    }];
  },

  render() {
    const styles = this.getStyles();
    const {currentScript, lastTraceStatus, isLoading, lastTraceDuration, lastTraceResult} = this.state;
    let source = null;
    let editorMode = 'python';

    if (currentScript) {
      source = currentScript.source;
      editorMode = Store.getEditorMode();
    }

    return (
      <div className="col-flex-1" style={{padding: 0, height: '100px', display: 'flex', flexDirection: 'column'}}>
        {this.getDialogs()}
        <InnerToolbar
          title={this.getToolbarTitle()}
          backFallback={() => this.transitionTo('scripts', this.getParams())}
          forceBackFallback={true}
          backButtonTooltip="Go back to Scripts list">
          <div style={{display: 'inline-block'}}>
            <Checkbox
              ref="autosaveCheckbox"
              name="autosaveCheckbox"
              label="Autosave"
              labelStyle={{whiteSpace: 'nowrap', width: 'auto'}}
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
            onTouchTap={this.handleRunScript}/>
        </InnerToolbar>
        <Loading show={isLoading || !currentScript}>
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
                  <ScriptConfig/>
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
                      '    "foo": "bar",',
                      '    "bar": "foo"',
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
