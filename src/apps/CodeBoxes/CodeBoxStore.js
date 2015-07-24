import Reflux from 'reflux';

import StoreLoadingMixin from '../../mixins/StoreLoadingMixin';
import WaitForStoreMixin from '../../mixins/WaitForStoreMixin';

import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import CodeBoxActions from './CodeBoxActions';

let CodeBoxStore = Reflux.createStore({
  listenables: CodeBoxActions,
  mixins: [
    WaitForStoreMixin
  ],

  langMap: {
    python : 'python',
    nodejs : 'javascript',
    ruby   : 'ruby',
    golang : 'golang'
  },

  getInitialState() {
    return {
      currentCodeBox  : null,

      payload         : '{"abc":123}',
      traces          : [],
      lastTraceResult : null,
      lastTraceReady  : true,
      isLoading       : true
    }
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      SessionActions.setInstance,
      this.refreshData
    );
  },

  refreshData() {
    console.debug('CodeBoxStore::refreshData');
    CodeBoxActions.fetchCodeBox(SessionStore.getRouter().getCurrentParams().codeboxId);
    CodeBoxActions.fetchCodeBoxTraces(SessionStore.getRouter().getCurrentParams().codeboxId);
  },

  getCurrentCodeBox() {
    console.debug('CodeBoxStore::getCurrentCodeBox');
    return this.data.currentCodeBox;
  },

  onFetchCodeBoxCompleted(codeBox) {
    console.debug('CodeBoxStore::onFetchCodeBoxCompleted')
    this.data.currentCodeBox = codeBox;
    this.trigger(this.data);
  },

  getEditorMode() {
    return this.langMap[this.data.currentCodeBox.runtime_name];
  },

  fetchTraces() {
    console.debug('CodeBoxStore::fetchTraces');
    if (this.data.currentCodeBoxId === null) {
      return;
    }
    CodeBoxActions.fetchCodeBoxTraces(this.data.currentCodeBox.id);
  },

  onFetchCodeBoxTracesCompleted(traces) {
    console.debug('CodeBoxStore::onFetchCodeBoxTracesCompleted');
    this.data.traces = Object.keys(traces).map(key => traces[key]);
    this.data.isLoading = false;
    this.getCodeBoxLastTraceResult();
  },

  onRunCodeBoxCompleted() {
    console.debug('CodeBoxStore::onRunCodeBoxCompleted');
    this.refreshData();
  },

  getCodeBoxLastTraceResult() {
    console.debug('CodeBoxStore::getCodeBoxLastTraceResult');
    if (this.data.traces.length > 0) {
      let lastTrace = this.data.traces[this.data.traces.length - 1];
      if (lastTrace.status === 'pending') {
        this.data.lastTraceReady = false;
        setTimeout(() => {
          this.fetchTraces()
        }, 300);
      } else {
        if (lastTrace.result.stderr !== '') {
          this.data.lastTraceResult = lastTrace.result.stderr;
        } else {
          this.data.lastTraceResult = lastTrace.result.stdout;
        }
        this.data.lastTraceReady = true;
      }
    }
    this.trigger(this.data);
  }

});

export default CodeBoxStore;
