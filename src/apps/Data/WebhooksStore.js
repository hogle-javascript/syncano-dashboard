var Reflux              = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    WaitForStoreMixin   = require('../../mixins/WaitForStoreMixin'),

    //Stores & Actions
    ClassesActions      = require('../Classes/ClassesActions'),
    CodeBoxesActions    = require('../CodeBoxes/CodeBoxesActions'),
    SessionActions      = require('../Session/SessionActions'),
    WebhooksActions     = require('./WebhooksActions');

var WebhooksStore = Reflux.createStore({
  listenables : WebhooksActions,
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
      ClassesActions.fetchClasses,
      CodeBoxesActions.fetchCodeBoxes,
      this.refreshData
    );
  },

  setWebhooks: function(items) {
    this.data.items = Object.keys(items).map(function(item) {
      return items[item];
    });
    this.trigger(this.data);
  },

  getWebhooks: function(empty) {
    return this.data.items || empty || null;
  },

  refreshData: function() {
    WebhooksActions.fetchWebhooks();
  },

  onFetchWebhooks: function() {
    console.debug('WebhooksStore::onFetchWebhooks');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchWebhooksCompleted: function(items) {
    console.debug('WebhooksStore::onFetchWebhooksCompleted');
    this.data.isLoading = false;
    WebhooksActions.setWebhooks(items);
  },

  onRemoveWebhooksCompleted: function() {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  }

});

module.exports = WebhooksStore;
