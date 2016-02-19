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
    python: 'python',
    nodejs: 'javascript',
    ruby: 'ruby',
    golang: 'golang',
    swift: 'swift',
    php: 'php'
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
      scriptConfig: null,
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
    Actions.fetchScript(SessionStore.getRouter().getCurrentParams().scriptId);
    Actions.fetchScriptTraces(SessionStore.getRouter().getCurrentParams().scriptId);
  },

  mapConfig(originalConfig) {
    function getFieldValueType(fieldValue) {
      if (typeof fieldValue === 'number') {
        return 'integer';
      }
      return 'string';
    }
    let config = _.map(originalConfig, (value, key) => {
      return {
        key,
        value,
        type: getFieldValueType(value)
      };
    });

    return _.sortBy(config, 'key');
  },

  getCurrentScript() {
    console.debug('ScriptStore::getCurrentScript');
    return this.data.currentScript;
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

  onRunScriptWithUpdateCompleted() {
    console.debug('ScriptStore::onRunScriptWithUpdateCompleted');
    this.refreshData();
  },

  getEditorMode() {
    let currentScript = this.data.currentScript;

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
    if (this.data.traces.length > 0) {
      let lastTrace = this.data.traces[0];

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
