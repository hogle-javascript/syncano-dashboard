import Reflux from 'reflux';
import _ from 'lodash';

import {StoreFormMixin, WaitForStoreMixin, SnackbarNotificationMixin} from '../../mixins';

import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import Actions from './SnippetActions';

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

  getInitialState() {
    return {
      currentSnippet: null,
      snippetConfig: null,

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
    console.debug('SnippetStore::refreshData');
    Actions.fetchSnippet(SessionStore.getRouter().getCurrentParams().snippetId);
    Actions.fetchSnippetTraces(SessionStore.getRouter().getCurrentParams().snippetId);
  },

  mapConfig(originalConfig) {
    let config = _.map(originalConfig, (value, key) => {
      return {
        key,
        value
      };
    });

    return _.sortBy(config, 'key');
  },

  getCurrentSnippet() {
    console.debug('SnippetStore::getCurrentSnippet');
    return this.data.currentSnippet;
  },

  clearCurrentSnippet() {
    this.data.currentSnippet = null;
  },

  onFetchSnippetCompleted(snippet) {
    console.debug('SnippetStore::onFetchSnippetCompleted');
    this.data.snippetConfig = this.mapConfig(snippet.config);
    this.data.currentSnippet = snippet;
    this.trigger(this.data);
  },

  onRunSnippetWithUpdateCompleted() {
    console.debug('SnippetStore::onRunSnippetWithUpdateCompleted');
    this.refreshData();
  },

  getEditorMode() {
    let currentSnippet = this.data.currentSnippet;

    return currentSnippet ? this.langMap[currentSnippet.runtime_name] : 'python';
  },

  fetchTraces() {
    console.debug('SnippetStore::fetchTraces');
    if (this.data.currentSnippetId === null) {
      return;
    }
    Actions.fetchSnippetTraces(this.data.currentSnippet.id);
  },

  onFetchSnippetTracesCompleted(traces) {
    console.debug('SnippetStore::onFetchSnippetTracesCompleted');
    this.data.traces = traces._items;
    this.data.isLoading = false;
    this.getSnippetLastTraceResult();
  },

  onRunSnippetCompleted() {
    console.debug('SnippetStore::onRunSnippetCompleted');
    this.refreshData();
  },

  getSnippetLastTraceResult() {
    console.debug('SnippetStore::getSnippetLastTraceResult', this.data.traces);
    this.data.lastTraceResult = null;
    this.data.lastTraceStatus = null;
    this.data.lastTraceDuration = null;
    if (this.data.traces.length > 0) {
      let lastTrace = this.data.traces[0];

      if (lastTrace.status === 'pending') {
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

  onUpdateSnippetCompleted(snippet) {
    this.data.currentSnippet = snippet;
    this.dismissSnackbarNotification();
    this.refreshData();
  },

  onUpdateSnippetFailure() {
    this.dismissSnackbarNotification();
  }
});
