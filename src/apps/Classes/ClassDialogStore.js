var Reflux           = require('reflux'),

    // Utils & Mixins
    StoreFormMixin   = require('../../mixins/StoreFormMixin'),
    DialogStoreMixin = require('../../mixins/DialogStoreMixin'),

    //Stores & Actions
    ClassesActions   = require('./ClassesActions');

var ClassDialogStore = Reflux.createStore({
  listenables : ClassesActions,
  mixins      : [
    StoreFormMixin,
    DialogStoreMixin
  ],

  getInitialState: function() {
    return {
      description : '',
      name        : '',
      fields      : []
    };
  },

  init: function() {
    this.listenToForms();
  },

  onCreateClassCompleted: function() {
    console.debug('ClassDialogStore::onCreateClassCompleted');
    this.dismissDialog();
    ClassesActions.fetchClasses();
  },

  onUpdateClassCompleted: function() {
    console.debug('ClassDialogStore::onUpdateClassCompleted');
    this.dismissDialog();
    ClassesActions.fetchClasses();
  }

});

module.exports = ClassDialogStore;
