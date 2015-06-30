var Reflux           = require('reflux'),

    // Utils & Mixins
    StoreFormMixin   = require('../../mixins/StoreFormMixin'),
    DialogStoreMixin = require('../../mixins/DialogStoreMixin'),

    //Stores & Actions
    SessionStore     = require('../Session/SessionStore'),
    CodeBoxesActions = require('./CodeBoxesActions');

var CodeBoxDialogStore = Reflux.createStore({
  listenables : CodeBoxesActions,
  mixins      : [
    StoreFormMixin,
    DialogStoreMixin
  ],

  getInitialState: function() {
    return {
      label                : '',
      description          : '',
      runtime_name         : '',
      runtimes             : [
        {payload: '', text: 'Loading...'}
      ]
    };
  },

  init: function() {
    this.listenToForms();
  },

  setCodeBoxRuntimes: function(runtimes) {
    var runtimes = Object.keys(runtimes).map(function(runtime) {
      return {payload: runtime, text: runtime}
    });
    this.trigger({runtimes: runtimes});
  },

  onCreateCodeBoxCompleted: function(resp) {
    console.debug('CodeBoxesStore::onCreateCodeBoxCompleted');
    this.dismissDialog();
    SessionStore.getRouter().transitionTo('codeboxes-edit', {
      instanceName: SessionStore.getInstance().name,
      codeboxId: resp.id
    });
  },

  onUpdateCodeBoxCompleted: function() {
    console.debug('CodeBoxDialogStore::onUpdateCodeBoxCompleted');
    this.dismissDialog();
    CodeBoxesActions.fetchCodeBoxes();
  },

  onFetchCodeBoxRuntimesCompleted: function(runtimes) {
    console.debug('CodeBoxDialogStore::onFetchCodeBoxRuntimesCompleted');
    CodeBoxesActions.setCodeBoxRuntimes(runtimes);
  }

});

module.exports = CodeBoxDialogStore;
