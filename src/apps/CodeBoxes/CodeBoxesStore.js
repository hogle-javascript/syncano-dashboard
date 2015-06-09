var Reflux            = require('reflux'),

    SessionStore      = require('../Session/SessionStore'),
    AuthStore         = require('../Account/AuthStore'),
    CodeBoxesActions  = require('./CodeBoxesActions');


var CodeBoxesStore = Reflux.createStore({
  listenables: CodeBoxesActions,

  getInitialState: function () {
    return {
      currentCodeBoxId: null,
      CodeBoxList: null,
      checkedItemNumber: 0,
      AddDialogVisible: true,
      availableRuntimes: null,
      runtimes: null,
      canSubmit: true,
      name: '',
      payload: '{"112":111}',
      description: '',
      selectedRuntimeIndex: 0,
    }
  },

  init: function () {

    this.data = {};

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
    this.data.currentCodeBoxId = CodeBoxId;
  },

  onGetCodeBoxRuntimesCompleted: function(runtimes) {
    console.debug('CodeBoxesStore::onGetCodeBoxRuntimes');
    this.data.runtimes = Object.keys(runtimes).map(function(runtime){
      return {payload: runtime, text: runtime}
    });
    this.trigger(this.data);
  },

  onGetCodeBoxesCompleted: function (list) {
    console.debug('CodeBoxesStore::onGetCodeBoxesCompleted');
    this.data.CodeBoxList = list;
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

  onGetCodeboxTrace: function (trace) {
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

  onGetCodeboxTraces: function (traces) {
    console.debug('CodeBoxesStore::onGetCodeBoxTraces');
    this.data.traces = traces;
    this.trigger(this.data);
  }

});

module.exports = CodeBoxesStore;
