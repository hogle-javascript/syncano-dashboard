var Reflux           = require('reflux'),

    // Utils & Mixins
    StoreFormMixin   = require('../../mixins/StoreFormMixin'),
    DialogStoreMixin = require('../../mixins/DialogStoreMixin'),

    //Stores & Actions
    InstancesActions = require('./InstancesActions');


var InstanceDialogStore = Reflux.createStore({
  listenables : InstancesActions,
  mixins      : [
    StoreFormMixin,
    DialogStoreMixin
  ],

  getInitialState: function() {
    return {
      name        : null,
      description : null
    }
  },

  init: function() {
    this.listenToForms();
  },

  onCreateInstanceCompleted: function() {
    console.debug('InstanceDialogStore::onCreateInstanceCompleted');
    this.dismissDialog();
    InstancesActions.fetchInstances();
  },

  onUpdateInstanceCompleted: function() {
    console.debug('InstanceDialogStore::onUpdateInstanceCompleted');
    this.dismissDialog();
    InstancesActions.fetchInstances();
  }

});

module.exports = InstanceDialogStore;
