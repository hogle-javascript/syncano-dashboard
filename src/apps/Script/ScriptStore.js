import Reflux from 'reflux';
import _ from 'lodash';

import {StoreFormMixin, WaitForStoreMixin, SnackbarNotificationMixin} from '../../mixins';

import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import Actions from './ScriptActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    StoreFormMixin,
    WaitForStoreMixin,
    SnackbarNotificationMixin
  ],

  langMap: {
    nodejs: 'javascript',
    'nodejs_library_v0.4': 'javascript',
    'nodejs_library_v1.0': 'javascript',
    python: 'python',
    'python_library_v4.2': 'python',
    'python_library_v5.0': 'python',
    ruby: 'ruby',
    golang: 'golang',
    php: 'php',
    swift: 'swift'
  },

  scriptConfigValueTypes: [
    {
      payload: 'string',
      text: 'String'
    },
    {
      payload: 'integer',
      text: 'Integer'
    }
  ],

  getInitialState() {
    return {
      currentScript: null,
      scriptConfig: [],
      isPayloadValid: true,

      traces: [],
      lastTraceResult: null,
      lastTraceStatus: null,
      lastTraceDuration: null,
      lastTraceReady: true,
      isLoading: true
    };
  },

  init() {
    this.data = this.getInitialState();
    this.listenToForms();
    this.waitFor(
      SessionActions.setInstance,
      this.refreshData
    );
  },

  refreshData() {
    console.debug('ScriptStore::refreshData');
    const {scriptId} = SessionStore.getRouter().getCurrentParams();

    if (scriptId) {
      Actions.fetchScript(scriptId);
      Actions.fetchScriptTraces(scriptId);
    }
  },

  mapConfig(originalConfig) {
    const config = _.map(originalConfig, (value, key) => {
      return {
        key,
        value,
        type: _.isNumber(value) ? 'integer' : 'string'
      };
    });

    return _.sortBy(config, 'key');
  },

  clearCurrentScript() {
    this.data.currentScript = null;
  },

  onFetchScriptCompleted(script) {
    console.debug('ScriptStore::onFetchScriptCompleted');
    this.data.scriptConfig = this.mapConfig(script.config);
    this.data.currentScript = script;
    this.trigger(this.data);
  },

  getEditorMode() {
    const {currentScript} = this.data;

    return currentScript ? this.langMap[currentScript.runtime_name] : 'python';
  },

  fetchTraces() {
    console.debug('ScriptStore::fetchTraces');
    if (this.data.currentScriptId === null) {
      return;
    }
    Actions.fetchScriptTraces(this.data.currentScript.id);
  },

  onFetchScriptTracesCompleted(traces) {
    console.debug('ScriptStore::onFetchScriptTracesCompleted');
    this.data.traces = traces._items;
    this.data.isLoading = false;
    this.getScriptLastTraceResult();
  },

  onRunScriptCompleted() {
    console.debug('ScriptStore::onRunScriptCompleted');
    this.refreshData();
  },

  getScriptLastTraceResult() {
    console.debug('ScriptStore::getScriptLastTraceResult', this.data.traces);
    this.data.lastTraceResult = null;
    this.data.lastTraceStatus = null;
    this.data.lastTraceDuration = null;
    if (this.data.traces && this.data.traces.length > 0) {
      const lastTrace = this.data.traces[0];

      if (lastTrace.status !== 'success' && lastTrace.status !== 'failure') {
        this.data.lastTraceReady = false;
        setTimeout(() => {
          this.fetchTraces();
        }, 300);
      } else {
        this.data.lastTraceResult = lastTrace.result.stdout !== '' ? lastTrace.result.stdout : 'Success';
        if (lastTrace.result.stderr !== '') {
          this.data.lastTraceResult = lastTrace.result.stderr;
        }
        this.data.lastTraceStatus = lastTrace.status;
        this.data.lastTraceDuration = lastTrace.duration;
        this.data.lastTraceReady = true;
      }
    }
    this.trigger(this.data);
  },

  getScriptConfigValueTypes() {
    return this.scriptConfigValueTypes;
  },

  onUpdateScriptCompleted(script) {
    this.data.currentScript = script;
    this.dismissSnackbarNotification();
    this.refreshData();
  },

  onUpdateScriptFailure() {
    this.dismissSnackbarNotification();
  }
});
