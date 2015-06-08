var Reflux            = require('reflux'),

    MainStore         = require('../Main/MainStore'),
    AuthStore         = require('../Account/AuthStore');
    CodeBoxesActions  = require('./CodeBoxesActions');


var CodeBoxesStore = Reflux.createStore({

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

    this.listenTo(CodeBoxesActions.setCurrentCodeBoxId, this.onSetCurrentCodeBoxId);
    this.listenTo(CodeBoxesActions.loadCodeboxTrace.completed, this.onLoadCodeboxTrace);
    this.listenTo(CodeBoxesActions.runCodeBox.completed, this.onRunCodeBoxCompleted);
    this.listenTo(CodeBoxesActions.addCodeBox.completed, this.onAddCodeBoxCompleted);
    this.listenTo(CodeBoxesActions.getCodeBoxRuntimes.completed, this.onGetCodeBoxRuntimes);
    this.listenTo(CodeBoxesActions.getCodeBoxes.completed, this.onGetCodeboxesCompleted);

    this.data = {};

    this.langMap = {
      python: 'python',
      nodejs: 'javascript',
      ruby: 'ruby',
      golang: 'golang'
    };

    // We want to know when we are ready to download data for this store,
    // it depends on instance we working on
    this.listenTo(AuthStore, this.refreshData);
  },

  getEditorMode: function (codeBox) {
    return this.langMap[codeBox.runtime_name]
  },

  refreshData: function () {
    console.log('Refresh CodeBoxes data', status);

    if (AuthStore.data.currentInstance) {
      CodeBoxesActions.getCodeBoxRuntimes();
      CodeBoxesActions.getCodeBoxes();
    }
  },

  onSetCurrentCodeBoxId: function(CodeBoxId) {
    this.data.currentCodeBoxId = CodeBoxId;
  },

  onGetCodeBoxRuntimes: function(runtimes) {
    this.data.runtimes = Object.keys(runtimes).map(function(runtime){
      return {payload: runtime, text: runtime}
    });
    this.trigger(this.data);
  },

  onGetCodeboxesCompleted: function (list) {
    this.data.CodeBoxList = list;
    this.trigger(this.data);
  },

  onAddCodeBoxCompleted: function (resp) {
    MainStore.router.transitionTo('codeboxesedit', {instanceName: AuthStore.getCurrentInstanceName(), codeboxId: resp.id});
    CodeBoxesActions.getCodeBoxes();
  },

  onRunCodeBoxCompleted: function (trace) {
    this.data.lastTrace = trace;
    CodeBoxesActions.loadCodeboxTrace(this.data.currentCodeBoxId, trace.id);
  },

  onLoadCodeboxTrace: function (trace) {
    if (trace.status == 'pending') {
      var CodeBoxId = this.data.currentCodeBoxId;
      setTimeout(function(){CodeBoxesActions.loadCodeboxTrace(CodeBoxId, trace.id)}, 300);
    } else {
      this.data.lastTraceResult = trace.result;
      this.data.traceLoading = false;
    }
    this.trigger(this.data);
  }


});


module.exports = CodeBoxesStore;
