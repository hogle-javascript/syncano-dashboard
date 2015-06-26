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

  getInitialState: function () {
    return {
      username : null,
      password : null
    }
  },

  init: function () {
    this.listenToForms();
  },

  onCreateUserCompleted: function(payload) {
    console.debug('UserDialogStore::onCreateUserCompleted');
    this.dismissDialog();
    UsersActions.fetchUsers();
  },

  onUpdateUserCompleted: function(paylod) {
    console.debug('UserDialogStore::onUpdateUserCompleted');
    this.dismissDialog();
    UsersActions.fetchUsers();
  }

});

module.exports = UserDialogStore;