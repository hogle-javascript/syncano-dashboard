var Reflux = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin      = require('../../mixins/CheckListStoreMixin'),
    StoreFormMixin           = require('../../mixins/StoreFormMixin'),
    WaitForStoreMixin        = require('../../mixins/WaitForStoreMixin'),

    //Stores & Actions
    SessionActions           = require('../Session/SessionActions'),
    ApiKeysActions           = require('./ApiKeysActions');

var ApiKeysStore = Reflux.createStore({
  listenables : ApiKeysActions,
  mixins      : [
    CheckListStoreMixin,
    StoreFormMixin,
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
    this.listenToForms();
  },

  refreshData: function() {
    console.debug('ApiKeysStore::refreshData');
    ApiKeysActions.fetchApiKeys();
  },

  setApiKeys: function(items) {
    console.debug('AdminsStore::setApiKeys');

    this.data.items = Object.keys(items).map(function(key) {
      return items[key];
    });

    this.trigger(this.data);
  },

  onFetchApiKeys: function(items) {
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchApiKeysCompleted: function(items) {
    console.debug('ApiKeysStore::onFetchApiKeysCompleted');
    this.data.isLoading = false;
    ApiKeysActions.setApiKeys(items);

  },

  onCreateApiKeyCompleted: function(payload) {
    console.debug('ApiKeysStore::onCreateApiKeyCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onUpdateApiKeyCompleted: function(paylod) {
    console.debug('ApiKeysStore::onUpdateApiKeyCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onRemoveApiKeysCompleted: function(payload) {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onResetApiKeyCompleted: function(payload) {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  }

});

module.exports = ApiKeysStore;
