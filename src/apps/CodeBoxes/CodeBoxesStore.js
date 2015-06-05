var Reflux            = require('reflux'),

    MainStore         = require('../Main/MainStore'),
    AuthStore         = require('../Account/AuthStore');
    CodeBoxesActions  = require('./CodeBoxesActions');


var CodeBoxesStore = Reflux.createStore({

  getInitialState: function () {
    return {
      CodeBoxList: null,
      checkedItemNumber: 0,
      AddDialogVisible: true,
      availableRuntimes: null,
      runtimes: null,
      canSubmit: true,
      name: '',
      description: '',
      selectedRuntimeIndex: 0,
    }
  },

  init: function () {
    this.listenTo(CodeBoxesActions.addCodeBox.completed, this.onAddCodeBoxCompleted);
    this.listenTo(CodeBoxesActions.getCodeBoxRuntimes.completed, this.onGetCodeBoxRuntimes);
    this.listenTo(CodeBoxesActions.getCodeBoxes.completed, this.onGetCodeboxesCompleted);

    this.data = {
      checkedItemNumber: 0,
      canSubmit: true,
      name: '',
      description: '',
    };

    // We want to know when we are ready to download data for this store,
    // it depends on instance we working on
    this.listenTo(AuthStore, this.getData);
  },

  getData: function (status) {
    if (status.currentInstance) {
      CodeBoxesActions.getCodeBoxRuntimes();
      CodeBoxesActions.getCodeBoxes();
    }
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
  }

});


module.exports = CodeBoxesStore;
