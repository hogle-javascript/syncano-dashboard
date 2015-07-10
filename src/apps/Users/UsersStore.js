var Reflux              = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    WaitForStoreMixin   = require('../../mixins/WaitForStoreMixin'),
    StoreLoadingMixin   = require('../../mixins/StoreLoadingMixin'),

    //Stores & Actions
    SessionActions      = require('../Session/SessionActions'),
    UsersActions        = require('./UsersActions'),
    GroupsActions       = require('./GroupsActions'),
    GroupsStore         = require('./GroupsStore');

var UsersStore = Reflux.createStore({
  listenables : [UsersActions, GroupsActions],
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
    var activeGroup = GroupsStore.getActiveGroup();

    if (activeGroup) {
      GroupsActions.fetchGroupUsers(activeGroup.id).then(function (payload) {
        UsersStore.setUsers(payload);
      });
    } else {
      UsersActions.fetchUsers();
    }
  },

  setUsers: function(users) {
    this.data.items = Object.keys(users).map(function(key) {
      if (users[key].user) {
        return users[key].user;
      }
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
  },

  onUpdateUserCompleted: function() {
    console.debug('UsersStore::onUpdateUserCompleted');
  },

  onUpdateGroupCompleted: function() {
    console.debug('UsersStore::onUpdateGroupCompleted');
    this.refreshData();
  },

  onRemoveGroupsCompleted: function() {
    console.debug('UsersStore::onRemoveGroupsCompleted');
    this.refreshData();
  },

  onSetActiveGroup: function() {
    console.debug('UsersStore::onSetActiveGroup');
    this.refreshData();
  }
});

module.exports = UsersStore;
