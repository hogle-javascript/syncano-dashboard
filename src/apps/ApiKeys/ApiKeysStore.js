var Reflux            = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin      = require('../../mixins/CheckListStoreMixin'),
    WaitForStoreMixin        = require('../../mixins/WaitForStoreMixin'),

    //Stores & Actions
    StoreLoadingMixin        = require('../../mixins/StoreLoadingMixin'),
    SessionActions           = require('../Session/SessionActions'),
    ApiKeysActions           = require('./ApiKeysActions');

var ApiKeysStore = Reflux.createStore({
  listenables : ApiKeysActions,
  mixins      : [
    CheckListStoreMixin,
    WaitForStoreMixin,
    StoreLoadingMixin
  ],

  getInitialState: function() {
    return {
      items     : [],
      isLoading : false
    };
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

  onFetchApiKeys: function() {
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchApiKeysCompleted: function(items) {
    console.debug('ApiKeysStore::onFetchApiKeysCompleted');
    ApiKeysActions.setApiKeys(items);
  },

  onRemoveApiKeysCompleted: function() {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onResetApiKeyCompleted: function() {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  }

});

module.exports = ApiKeysStore;
