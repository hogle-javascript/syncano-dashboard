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
    // jscs:disable
    return {
      label                : null,
      description          : null,
      runtime_name         : '',
      runtimes             : [
        {payload: '', text: 'Loading...'}
      ]
    };
    // jscs:enable
  },

  init: function() {
    this.listenToForms();
  },

  setCodeBoxRuntimes: function(payload) {
    var runtimes = Object.keys(payload).map(function(runtime) {
      return {payload: runtime, text: runtime};
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
