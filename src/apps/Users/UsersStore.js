var Reflux              = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    StoreFormMixin      = require('../../mixins/StoreFormMixin'),

    //Stores & Actions
    SessionStore        = require('../Session/SessionStore'),
    StoreLoadingMixin   = require('../../mixins/StoreLoadingMixin'),
    UsersActions        = require('./UsersActions');


var UsersStore = Reflux.createStore({
  listenables : UsersActions,
  mixins      : [
    CheckListStoreMixin,
    StoreFormMixin,
    StoreLoadingMixin
  ],

  getInitialState: function () {
    return {
      items: [],
      isLoading: false
    }
  },

  init: function () {
    this.data = this.getInitialState();
    this.listenTo(SessionStore, this.refreshData);
    this.listenToForms();
    this.setLoadingStates();
  },

  refreshData: function (data) {
    console.debug('UsersStore::refreshData');
    if (SessionStore.instance) {
      UsersActions.getUsers();
    }
  },

  onGetUsers: function(items) {
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onGetUsersCompleted: function(items) {
    console.debug('UsersStore::onGetInstanesCompleted');

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