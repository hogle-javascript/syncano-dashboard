var Reflux            = require('reflux'),

    AuthStore         = require('../Account/AuthStore'),
    CodeBoxesActions  = require('./CodeBoxesActions');


var CodeBoxesStore = Reflux.createStore({

  getInitialState: function () {
    return {
      checkedItemNumber: 0,
    }
  },

  init: function () {
    this.listenTo(CodeBoxesActions.getCodeBoxes.completed, this.onGetCodeboxesCompleted);

    this.data = {
      checkedItemNumber: 0,
    };

    // We want to know when we are ready to download data for this store,
    // it depends on instance we working on
    this.listenTo(AuthStore, this.getData);
  },

  getData: function (status) {
    if (status.currentInstance) {
      CodeBoxesActions.getCodeBoxes()
    }
  },

  // TODO: do something here! ;)
  onGetCodeboxesCompleted: function (payload) {
    console.log('onGetCodeboxesCompleted', payload)
  },

});


module.exports = CodeBoxesStore;
