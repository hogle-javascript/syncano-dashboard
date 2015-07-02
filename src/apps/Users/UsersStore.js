var Reflux              = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    WaitForStoreMixin   = require('../../mixins/WaitForStoreMixin'),
    StoreLoadingMixin   = require('../../mixins/StoreLoadingMixin'),

    //Stores & Actions
    SessionActions      = require('../Session/SessionActions'),
    UsersActions        = require('./UsersActions'),
    GroupsActions       = require('./GroupsActions');

var UsersStore = Reflux.createStore({
  listenables : UsersActions,
  mixins      : [
    CheckListStoreMixin,
    StoreLoadingMixin,
    WaitForStoreMixin
  ],

  getInitialState: function() {
    return {
      items: [],
      isLoading: true
    }
  },

  init: function() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      SessionActions.setInstance,
      GroupsActions.setGroups,
      this.refreshData
    );
    this.setLoadingStates();
  },

  refreshData: function() {
    UsersActions.fetchUsers();
  },

  setUsers: function(users) {
    this.data.items = Object.keys(users).map(function(key) {
      return users[key];
    });
    this.trigger(this.data);
  },

  onFetchUsers: function(items) {
    console.debug('UsersStore::onFetchUsers');
    this.trigger(this.data);
  },

  onFetchUsersCompleted: function(users) {
    console.debug('UsersStore::onFetchUsersCompleted');
    UsersActions.setUsers(users);
  },

  onRemoveUsersCompleted: function(payload) {
    console.debug('UsersStore::onRemoveUsersCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  }

});

module.exports = UsersStore;
