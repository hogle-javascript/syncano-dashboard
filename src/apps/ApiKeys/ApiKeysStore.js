var Reflux            = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin      = require('../../mixins/CheckListStoreMixin'),
    StoreFormMixin           = require('../../mixins/StoreFormMixin'),
    WaitForStoreMixin        = require('../../mixins/WaitForStoreMixin'),

    //Stores & Actions
    StoreLoadingMixin        = require('../../mixins/StoreLoadingMixin')
    SessionActions           = require('../Session/SessionActions'),
    ApiKeysActions           = require('./ApiKeysActions');

var ApiKeysStore = Reflux.createStore({
  listenables : ApiKeysActions,
  mixins      : [
    CheckListStoreMixin,
    StoreFormMixin,
    WaitForStoreMixin,
    StoreLoadingMixin
  ],

  getInitialState: function () {
    return {
      items     : [],
      isLoading : true
    }
  },

  init: function () {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      SessionActions.setInstance,
      this.refreshData
    );
    this.listenToForms();
    this.setLoadingStates();
  },

  refreshData: function () {
    console.debug('ApiKeysStore::refreshData');
    ApiKeysActions.fetchApiKeys();
  },

  setApiKeys: function (items) {
    console.debug('AdminsStore::setApiKeys');

    this.data.items = Object.keys(items).map(function(key) {
      return items[key];
    });

    this.trigger(this.data);
  },
  
  onFetchApiKeys: function(items) {
    this.trigger(this.data);
  },

  onFetchApiKeysCompleted: function(items) {
    console.debug('ApiKeysStore::onFetchApiKeysCompleted');
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
    console.debug('ApiKeysStore::onRemoveApiKeyCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onResetApiKeyCompleted: function(payload) {
    console.debug('ApiKeysStore::onResetApiKeyCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  }

});

module.exports = ApiKeysStore;