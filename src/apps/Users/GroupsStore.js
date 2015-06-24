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
      GroupsActions.fetch,
      this.refreshData
    );
    this.listenToForms();
  },

  setItems: function (items) {
    console.debug('GroupsStore::setItems');

    this.data.items = Object.keys(items).map(function(item) {
        return items[item];
    });

    this.data.items = items;
    this.trigger(this.data);
  },

  getItems: function (empty) {
    return this.items || empty || null;
  },

  refreshData: function () {
    GroupsActions.fetchGroups();
  },

  onFetchGroups: function(items) {
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchGroupsCompleted: function(items) {
    console.debug('GroupsStore::onGetInstanesCompleted');
    this.data.isLoading = false;
    GroupsActions.setItems(items);
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