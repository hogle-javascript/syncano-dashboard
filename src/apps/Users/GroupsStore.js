var Reflux              = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    StoreFormMixin      = require('../../mixins/StoreFormMixin'),
    WaitForStoreMixin   = require('../../mixins/WaitForStoreMixin'),

    //Stores & Actions
    SessionActions      = require('../Session/SessionActions'),
    GroupsActions       = require('./GroupsActions');

var GroupsStore = Reflux.createStore({
  listenables : GroupsActions,
  mixins      : [
    CheckListStoreMixin,
    StoreFormMixin,
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
    this.listenToForms();
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

  onCreateGroupCompleted: function(payload) {
    console.debug('GroupsStore::onCreateGroupCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onUpdateGroupCompleted: function(paylod) {
    console.debug('GroupsStore::onUpdateGroupCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onRemoveGroupsCompleted: function(payload) {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  }

});

module.exports = GroupsStore;
