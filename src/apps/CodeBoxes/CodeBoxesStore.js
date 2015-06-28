var Reflux              = require('reflux'),

    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    StoreFormMixin      = require('../../mixins/StoreFormMixin'),
    WaitForStoreMixin   = require('../../mixins/WaitForStoreMixin'),

    SessionActions      = require('../Session/SessionActions'),
    SessionStore        = require('../Session/SessionStore'),
    AuthStore           = require('../Account/AuthStore'),
    CodeBoxesActions    = require('./CodeBoxesActions');

var CodeBoxesStore = Reflux.createStore({
  listenables: CodeBoxesActions,
  mixins: [
    CheckListStoreMixin,
    StoreFormMixin,
    WaitForStoreMixin
  ],

  langMap: {
    python : 'python',
    nodejs : 'javascript',
    ruby   : 'ruby',
    golang : 'golang'
  },

  runtimeColors: {
    nodejs: {color: '#80BD01', icon: 'language-python'},
    python: {color: '#4984B1', icon: 'language-javascript'},
    golang: {color: '#E0EBF5', icon: 'code-array'},
    ruby:   {color: '#B21000', icon: 'code-array'}
  },

  getInitialState: function() {
    return {
      items: [],
      isLoading: true,

      currentCodeBoxId: null,

      AddDialogVisible: true,
      availableRuntimes: null,
      runtimes: null,
      label: '',
      payload: '{"112":111}',
      description: '',
      selectedRuntimeIndex: 0,
      traces: []
    }
  },

  init: function() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      SessionActions.setInstance,
      this.refreshData
    );
    this.listenToForms();

    this.listenTo(CodeBoxesActions.setCurrentCodeBoxId, this.fetchTraces)
  },

  fetchTraces: function() {
    console.debug('CodeBoxesStore::fetchTraces');
    CodeBoxesActions.fetchCodeBoxTraces(this.data.currentCodeBoxId);
  },

  getEditorMode: function(codeBox) {
    // jscs:disable
    return this.langMap[codeBox.runtime_name];
    // jscs:enable
  },

  getRuntimeColorIcon: function(runtime) {
    return this.runtimeColors[runtime];
  },

  getRuntimeIndex: function(runtimeName) {
    var runtimeIndex = null;
    this.data.runtimes.some(function(runtime, index) {
      console.log(runtimeName, runtime.payload);
      if (runtimeName === runtime.payload) {
        runtimeIndex = index;
        return true;
      }
    });
    return runtimeIndex;
  },

  getCodeBoxesDropdown: function() {
    return this.data.items.map(function(item) {
      return {
        payload : item.id,
        text    : item.label
      }
    });
  },

  getCurrentCodeBox: function() {

    if (!this.data.currentCodeBoxId) {
      return null;
    }

    var currentItem = null;
    this.data.items.some(function(item) {
      if (item.id.toString() === this.data.currentCodeBoxId.toString()) {
        currentItem = item;
        return true;
      }
    }.bind(this));
    return currentItem;
  },

  getCodeBoxById: function(id) {
    var codeBox = null;
    this.data.items.some(function(item) {
      if (item.id.toString() === id.toString()) {
        codeBox = item;
        return true;
      }
    }.bind(this));
    return codeBox;
  },

  getCodeBoxIndex: function(id) {
    var codeBoxIndex = null;
    this.data.items.some(function(item, index) {
      if (item.id.toString() === id.toString()) {
        codeBoxIndex = index;
        return true;
      }
    });
    return codeBoxIndex;
  },

  refreshData: function() {
    console.debug('CodeBoxesStore::refreshData');

    CodeBoxesActions.fetchCodeBoxes();
    if (!this.data.runtimes) {
      CodeBoxesActions.fetchCodeBoxRuntimes();
    }
    //if (this.data.currentCodeBoxId) {
    //  CodeBoxesActions.getCodeBoxTraces(this.data.currentCodeBoxId);
    //}
  },

  setCodeBoxes: function(items) {
    this.data.items = Object.keys(items).map(function(key) {
      return items[key];
    });
    this.trigger(this.data);
  },

  setCodeBoxTraces: function(items) {
    this.data.traces = Object.keys(items).map(function(key) {
      return items[key];
    });
    this.trigger(this.data);
  },

  onSetCurrentCodeBoxId: function(CodeBoxId) {
    console.debug('CodeBoxesStore::onSetCurrentCodeBoxId', CodeBoxId);
    this.data.currentCodeBoxId = CodeBoxId;
    this.trigger(this.data);
  },

  onFetchCodeBoxRuntimes: function(runtimes) {
    console.debug('CodeBoxesStore::onFetchCodeBoxRuntimes');
  },

  onFetchCodeBoxRuntimesCompleted: function(runtimes) {
    console.debug('CodeBoxesStore::onFetchCodeBoxRuntimesCompleted');
    this.data.runtimes = Object.keys(runtimes).map(function(runtime) {
      return {payload: runtime, text: runtime}
    });
    this.trigger(this.data);
  },

  onRemoveCodeBoxesCompleted: function(payload) {
    console.debug('CodeBoxesStore::onRemoveCodeBoxesCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onFetchCodeBoxes: function() {
    console.debug('CodeBoxesStore::onFetchCodeBoxes');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchCodeBoxesCompleted: function(items) {
    console.debug('CodeBoxesStore::onFetchCodeBoxesCompleted');
    this.data.isLoading = false;
    CodeBoxesActions.setCodeBoxes(items);
  },

  onCreateCodeBoxCompleted: function(resp) {
    console.debug('CodeBoxesStore::onCreateCodeBoxCompleted');
    SessionStore.router.transitionTo('codeboxes-edit', {instanceName: SessionStore.instance.name, codeboxId: resp.id});
    CodeBoxesActions.fetchCodeBoxes();
  },

  onUpdateCodeBoxCompleted: function(resp) {
    console.debug('CodeBoxesStore::onUpdateCodeBoxCompleted');
    CodeBoxesActions.fetchCodeBoxes();
    this.data.hideDialogs = true;
    this.trigger(this.data);
  },

  onRunCodeBox: function(trace) {
    console.debug('CodeBoxesStore::onRunCodeBox');
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onRunCodeBoxCompleted: function(trace) {
    console.debug('CodeBoxesStore::onRunCodeBoxCompleted');
    this.data.lastTrace = trace;
    CodeBoxesActions.fetchCodeBoxTrace(this.data.currentCodeBoxId, trace.id);
  },

  onFetchCodeBoxTraceCompleted: function(trace) {
    console.debug('CodeBoxesStore::onFetchCodeBoxTrace');
    if (trace.status == 'pending') {
      var CodeBoxId = this.data.currentCodeBoxId;
      setTimeout(function() {CodeBoxesActions.fetchCodeBoxTrace(CodeBoxId, trace.id)}, 300);
    } else {
      this.data.lastTraceResult = trace.result;
      this.data.isLoading = false;
    }
    this.trigger(this.data);
  },

  onFetchCodeBoxTracesCompleted: function(items) {
    console.debug('CodeBoxesStore::onFetchCodeBoxTraces');
    this.data.isLoading = false;
    CodeBoxesActions.setCodeBoxTraces(items);
  }

});

module.exports = CodeBoxesStore;
