var Reflux              = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    WaitForStoreMixin   = require('../../mixins/WaitForStoreMixin'),
    StoreLoadingMixin   = require('../../mixins/StoreLoadingMixin'),

    //Stores & Actions
    SessionActions      = require('../Session/SessionActions'),
    GroupsActions       = require('./GroupsActions'),
    UsersActions        = require('./UsersActions'),
    UsersStore          = require('./UsersStore');

var GroupsStore = Reflux.createStore({
  listenables : GroupsActions,
  mixins      : [
    CheckListStoreMixin,
    StoreLoadingMixin,
    WaitForStoreMixin
  ],

  getInitialState: function() {
    return {
      items: [],
      activeGroup: null,
      isLoading: true
    }
  },

  init: function() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      SessionActions.setInstance,
      this.refreshData
    );
    this.setLoadingStates();
  },

  setGroups: function(groups) {
    console.debug('GroupsStore::setGroups');

    this.data.items = Object.keys(groups).map(function(key) {
      return groups[key];
    });

    this.trigger(this.data);
  },

  getGroups: function(empty) {
    return this.data.items || empty || null;
  },

  getActiveGroup: function(empty) {
    return this.data.activeGroup || empty || null;
  },

  refreshData: function() {
    GroupsActions.fetchGroups();
  },

  onSetActiveGroup: function(group) {
    console.debug('GroupsStore::onSetActiveGroup');

    var isCurrentActiveGroup = this.data.activeGroup && this.data.activeGroup.id === group.id;
    this.data.activeGroup = isCurrentActiveGroup ? null : group;
    this.trigger(this.data);
  },

  onFetchGroups: function(items) {
    console.debug('GroupsStore::onFetchGroups');
    this.trigger(this.data);
  },

  onFetchGroupsCompleted: function(items) {
    console.debug('GroupsStore::onFetchGroupsCompleted');
    GroupsActions.setGroups(items);
  },

  onRemoveGroupsCompleted: function(payload) {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onFetchGroupUsers: function() {
    this.data.isLoading = false;
    this.trigger(this.data);
  }

});

module.exports = GroupsStore;
