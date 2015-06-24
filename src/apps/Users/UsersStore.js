var Reflux              = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    StoreFormMixin      = require('../../mixins/StoreFormMixin'),

    //Stores & Actions
    SessionActions      = require('../Session/SessionActions'),
    UsersActions        = require('./UsersActions');


var UsersStore = Reflux.createStore({
  listenables : UsersActions,
  mixins      : [
    CheckListStoreMixin,
    StoreFormMixin
  ],

  getInitialState: function () {
    return {
      items: [],
      isLoading: false
    }
  },

  init: function () {
    this.data    = this.getInitialState();
    this.joinTrailing(
      SessionActions.setUser,
      SessionActions.setInstance,
      UsersActions.fetch,
      this.fetch
    );
    this.listenToForms();
    this.isReady = false;
  },

  fetch: function () {
    console.debug('UsersStore::fetch', this.isReady);
    if (this.isReady === false) {
      return this.isReady = true;
    }
    UsersActions.getUsers();
  },

  refreshData: function () {
    UsersActions.getUsers();
  },

  onGetUsers: function(items) {
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onGetUsersCompleted: function(items) {
    console.debug('UsersStore::onGetUsersCompleted');

    this.data.items = Object.keys(items).map(function(item) {
        return items[item];
    });
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onCreateUserCompleted: function(payload) {
    console.debug('UsersStore::onCreateUserCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onUpdateUserCompleted: function(paylod) {
    console.debug('UsersStore::onUpdateUserCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onRemoveUsersCompleted: function(payload) {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

});

module.exports = UsersStore;