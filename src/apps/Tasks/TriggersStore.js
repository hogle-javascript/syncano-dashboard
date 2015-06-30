var Reflux              = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    WaitForStoreMixin   = require('../../mixins/WaitForStoreMixin'),

    //Stores & Actions
    SessionActions      = require('../Session/SessionActions'),
    TriggersActions     = require('./TriggersActions');

var TriggersStore = Reflux.createStore({
  listenables : TriggersActions,
  mixins      : [
    CheckListStoreMixin,
    WaitForStoreMixin
  ],

  getInitialState: function() {
    return {
      items     : [],
      isLoading : false
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

  setTriggers: function(items) {
    this.data.items = Object.keys(items).map(function(item) {
      return items[item];
    });
    this.trigger(this.data);
  },

  getTriggers: function(empty) {
    return this.data.items || empty || null;
  },

  refreshData: function() {
    TriggersActions.fetchTriggers();
  },

  onFetchTriggers: function() {
    console.debug('TriggersStore::onFetchTriggers');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchTriggersCompleted: function(items) {
    console.debug('TriggersStore::onFetchTriggersCompleted');
    this.data.isLoading = false;
    TriggersActions.setTriggers(items);
  },

  onRemoveTriggersCompleted: function(payload) {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  }

});

module.exports = TriggersStore;
