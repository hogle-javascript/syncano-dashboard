var Reflux              = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    StoreFormMixin      = require('../../mixins/StoreFormMixin'),
    WaitForStoreMixin   = require('../../mixins/WaitForStoreMixin'),

    //Stores & Actions
    SessionActions      = require('../Session/SessionActions'),
    UsersActions        = require('./UsersActions');
    GroupsActions       = require('./GroupsActions');


var UsersStore = Reflux.createStore({
  listenables : UsersActions,
  mixins      : [
    CheckListStoreMixin,
    StoreFormMixin,
    WaitForStoreMixin
  ],

  getInitialState: function () {
    return {
      items: [],
      isLoading: false
    }
  },

  init: function () {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      SessionActions.setInstance,
      GroupsActions.setGroups,
      UsersActions.fetch,
      this.refreshData
    );
    this.listenToForms();
  },

  refreshData: function () {
    UsersActions.fetchUsers();
  },

  setUsers: function (users) {
    this.data.items = Object.keys(users).map(function(key) {
        return users[key];
    });
    this.trigger(this.data);
  },

  onFetchUsers: function(items) {
    console.debug('UsersStore::onFetchUsers');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchUsersCompleted: function(users) {
    console.debug('UsersStore::onFetchUsersCompleted');
    this.data.isLoading = false;
    UsersActions.setUsers(users);
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