var Reflux           = require('reflux'),

    // Utils & Mixins
    StoreFormMixin   = require('../../mixins/StoreFormMixin'),
    DialogStoreMixin = require('../../mixins/DialogStoreMixin'),

    //Stores & Actions
    DataObjectsActions     = require('./DataObjectsActions');

var DataObjectDialogStore = Reflux.createStore({
  listenables : DataObjectsActions,
  mixins      : [
    StoreFormMixin,
    DialogStoreMixin
  ],

  getInitialState: function() {
    return {
      username : null,
      password : null
    }
  },

  init: function() {
    this.listenToForms();
  },

  onCreateDataObjectCompleted: function() {
    console.debug('DataObjectDialogStore::onCreateDataObjectCompleted');
    this.dismissDialog();
  },

  onUpdateDataObjectCompleted: function() {
    console.debug('DataObjectDialogStore::onUpdateDataObjectCompleted');
    this.dismissDialog();
  }

});

module.exports = DataObjectDialogStore;
