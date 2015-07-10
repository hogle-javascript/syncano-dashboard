var Reflux           = require('reflux'),

    // Utils & Mixins
    StoreFormMixin   = require('../../mixins/StoreFormMixin'),
    DialogStoreMixin = require('../../mixins/DialogStoreMixin'),

    //Stores & Actions
    UsersActions     = require('./UsersActions');

var UserDialogStore = Reflux.createStore({
  listenables : UsersActions,
  mixins      : [
    StoreFormMixin,
    DialogStoreMixin
  ],

  getInitialState: function() {
    return {
      username : null,
      password : null,
      groups    : null
    };
  },

  init: function() {
    this.listenToForms();
  },

  onCreateUserCompleted: function() {
    console.debug('UserDialogStore::onCreateUserCompleted');
    this.dismissDialog();
    UsersActions.fetchUsers();
  },

  onUpdateUserCompleted: function() {
    console.debug('UserDialogStore::onUpdateUserCompleted');
    this.dismissDialog();
    UsersActions.fetchUsers();
  }

});

module.exports = UserDialogStore;
