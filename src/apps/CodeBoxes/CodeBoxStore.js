var Reflux            = require('reflux'),

    StoreLoadingMixin = require('../../mixins/StoreLoadingMixin'),
    WaitForStoreMixin = require('../../mixins/WaitForStoreMixin'),

    SessionActions    = require('../Session/SessionActions'),
    SessionStore      = require('../Session/SessionStore'),
    CodeBoxActions    = require('./CodeBoxActions');

var CodeBoxStore = Reflux.createStore({
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

  getInitialState: function() {
    return {
      currentCodeBox  : null,

      payload         : '{"abc":123}',
      traces          : [],
      lastTraceResult : null,
      isLoading       : true
    }
  },

  init: function() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      SessionActions.setInstance,
      this.refreshData
    );
  },

  refreshData: function() {
    console.debug('CodeBoxStore::refreshData', this.data.currentCodeBox);
    CodeBoxActions.fetchCodeBox(SessionStore.getRouter().getCurrentParams().codeboxId);
    CodeBoxActions.fetchCodeBoxTraces(SessionStore.getRouter().getCurrentParams().codeboxId);
  },

  getCurrentCodeBox: function() {
    console.debug("CodeBoxStore::getCurrentCodeBox");
    return this.data.currentCodeBox;
  },

  onFetchCodeBoxCompleted: function(codeBox) {
    console.debug("CodeBoxStore::onFetchCodeBoxCompleted")
    this.data.currentCodeBox = codeBox;
  },

  getEditorMode: function() {
    return this.langMap[this.data.currentCodeBox.runtime_name];
  },

  fetchTraces: function() {
    console.debug('CodeBoxStore::fetchTraces');
    if (this.data.currentCodeBoxId === null) {
      return;
    }
    CodeBoxActions.fetchCodeBoxTraces(this.data.currentCodeBox.id);
  },

  onFetchCodeBoxTracesCompleted: function(traces) {
    console.debug('CodeBoxStore::onFetchCodeBoxTracesCompleted');
    this.data.traces = Object.keys(traces).map(function(key) {
      return traces[key]
    });
    this.data.isLoading = false;
    this.getCodeBoxLastTraceResult();
  },

  onRunCodeBoxCompleted: function() {
    console.debug('CodeBoxStore::onRunCodeBoxCompleted');
    this.refreshData();
  },

  getCodeBoxLastTraceResult: function() {
    console.debug('CodeBoxStore::getCodeBoxLastTraceResult');
    if (this.data.traces.length > 0) {
      var lastTrace = this.data.traces[this.data.traces.length - 1];
      if (lastTrace.status === "pending") {
        setTimeout(function() {
          this.fetchTraces()
        }.bind(this), 300);
      } else {
        if (lastTrace.result.stderr !== "") {
          this.data.lastTraceResult = lastTrace.result.stderr;
        } else {
          this.data.lastTraceResult = lastTrace.result.stdout;
        }
        this.trigger(this.data);
      }
    }
  }

});

module.exports = CodeBoxStore;
