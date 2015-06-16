var Reflux            = require('reflux'),

    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),

    SessionStore      = require('../Session/SessionStore'),
    AuthStore         = require('../Account/AuthStore'),
    CodeBoxesActions  = require('./CodeBoxesActions');


var CodeBoxesStore = Reflux.createStore({
  mixins: [CheckListStoreMixin],
  listenables: CodeBoxesActions,

  getInitialState: function () {
    return {
      currentCodeBoxId: null,
      CodeBoxList: null,

      items: [],
      isLoading: true,

      checkedItemNumber: 0,
      AddDialogVisible: true,
      availableRuntimes: null,
      runtimes: null,
      canSubmit: true,
      name: '',
      payload: '{"112":111}',
      description: '',
      selectedRuntimeIndex: 0,
      traces: null,
    }
  },

  init: function () {

    this.data = {
      items: []
    };

    this.langMap = {
      python: 'python',
      nodejs: 'javascript',
      ruby: 'ruby',
      golang: 'golang'
    };

    // We want to know when we are ready to download data for this store,
    // it depends on instance we working on
    this.listenTo(SessionStore, this.refreshData);
  },

  getEditorMode: function (codeBox) {
    return this.langMap[codeBox.runtime_name]
  },

  getRuntimeColorIcon: function(runtime) {
    var colors = {
      nodejs: {color: '#80BD01', icon: 'language-python'},
      python: {color: '#4984B1', icon: 'language-javascript'},
      golang: {color: '#E0EBF5', icon: 'code-array'},
      ruby:   {color: '#B21000', icon: 'code-array'},
    }
    return colors[runtime];
  },

  getCurrentCodeBox: function() {

    if (!this.data.currentCodeBoxId){
      return null;
    }

    var currentItem = null;
    this.data.items.some(function(item){
      if (item.id.toString() === this.data.currentCodeBoxId.toString()) {
        currentItem = item;
        return true;
      }
    }.bind(this));
    return currentItem;
  },

  refreshData: function () {
    console.debug('CodeBoxesStore::refreshData');

    if (SessionStore.instance) {
      CodeBoxesActions.getCodeBoxRuntimes();
      CodeBoxesActions.getCodeBoxes();
      if (this.data.currentCodeBoxId) {
        CodeBoxesActions.getCodeBoxTraces(this.data.currentCodeBoxId);
      }
    }
  },

  onSetCurrentCodeBoxId: function(CodeBoxId) {
    console.debug('CodeBoxesStore::onSetCurrentCodeBoxIdCompleted', CodeBoxId);
    this.data.currentCodeBoxId = CodeBoxId;
  },

  onGetCodeBoxRuntimes: function(runtimes) {
    console.debug('CodeBoxesStore::onGetCodeBoxRuntimes');
    if (!this.data.isLoading) {
      this.data.isLoading = true;
      this.trigger(this.data);
    }
  },

  onGetCodeBoxRuntimesCompleted: function(runtimes) {
    console.debug('CodeBoxesStore::onGetCodeBoxRuntimes');
    this.data.runtimes = Object.keys(runtimes).map(function(runtime){
      return {payload: runtime, text: runtime}
    });
    this.trigger(this.data);
  },

  onRemoveCodeBoxesCompleted: function(payload) {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onGetCodeBoxes: function() {
    if (!this.data.isLoading) {
      this.data.isLoading = true;
      this.trigger(this.data);
    }
  },

  onGetCodeBoxesCompleted: function (items) {
    console.debug('CodeBoxesStore::onGetCodeBoxesCompleted');

    var data = this.data;
    data.items = [];
    Object.keys(items).map(function(item) {
        data.items.push(items[item]);
    });
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onAddCodeBoxCompleted: function (resp) {
    console.debug('CodeBoxesStore::onAddCodeBoxCompleted');
    SessionStore.router.transitionTo('codeboxes-edit', {instanceName: SessionStore.instance.name, codeboxId: resp.id});
    CodeBoxesActions.getCodeBoxes();
  },

  onRunCodeBoxCompleted: function (trace) {
    console.debug('CodeBoxesStore::onAddCodeBoxCompleted');
    this.data.lastTrace = trace;
    CodeBoxesActions.getCodeBoxTrace(this.data.currentCodeBoxId, trace.id);
  },

  onGetCodeBoxTraceCompleted: function (trace) {
    console.debug('CodeBoxesStore::onGetCodeBoxTrace');
    if (trace.status == 'pending') {
      var CodeBoxId = this.data.currentCodeBoxId;
      setTimeout(function(){CodeBoxesActions.getCodeBoxTrace(CodeBoxId, trace.id)}, 300);
    } else {
      this.data.lastTraceResult = trace.result;
      this.data.traceLoading = false;
    }
    this.trigger(this.data);
  },

  onGetCodeBoxTracesCompleted: function (traces) {
    console.debug('CodeBoxesStore::onGetCodeBoxTraces');
    this.data.traces = traces;
    this.trigger(this.data);
  }

});

module.exports = CodeBoxesStore;