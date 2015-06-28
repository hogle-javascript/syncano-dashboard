var Reflux              = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    WaitForStoreMixin   = require('../../mixins/WaitForStoreMixin'),

    //Stores & Actions
    SessionActions      = require('../Session/SessionActions'),
    GroupsActions       = require('./GroupsActions');

var GroupsStore = Reflux.createStore({
  listenables : GroupsActions,
  mixins      : [
    CheckListStoreMixin,
    WaitForStoreMixin
  ],

  getInitialState: function() {
    return {
      items: [],
      isLoading: false
    }
  },

  init: function() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      SessionActions.setInstance,
      this.refreshData
    );
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

  refreshData: function() {
    GroupsActions.fetchGroups();
  },

  onFetchGroups: function(items) {
    console.debug('GroupsStore::onFetchGroups');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchGroupsCompleted: function(items) {
    console.debug('GroupsStore::onFetchGroupsCompleted');
    this.data.isLoading = false;
    GroupsActions.setGroups(items);
  },

  onRemoveGroupsCompleted: function(payload) {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  }

});

module.exports = GroupsStore;
