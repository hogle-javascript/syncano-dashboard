var Reflux            = require('reflux'),

    SessionStore      = require('../Session/SessionStore'),
    ApiKeysActions    = require('./ApiKeysActions'),
    StoreLoadingMixin = require('../../mixins/StoreLoadingMixin');


var ApiKeysStore = Reflux.createStore({
  listenables: ApiKeysActions,

  mixins: [
    StoreLoadingMixin
  ],

  getInitialState: function () {
    return {
      // Lists
      items: [],

      // Dialogs
      errors: {}
    }
  },

  init: function () {

    this.data = {
      // List
      items: [],

      // Dialogs
      errors: {},
      canSubmit: true
    };

    // We want to know when we are ready to download data for this store,
    // it depends on instance we working on
    this.listenTo(SessionStore, this.refreshData);
    this.setLoadingStates();
  },

  refreshData: function (data) {
    console.debug('ApiKeysStore::refreshData');
    if (SessionStore.instance) {
      ApiKeysActions.getApiKeys();
    }
  },

  getNumberOfChecked: function() {
    var checkedFilter = function(item) {
      return item.checked === true;
    };
    return this.data.items.filter(checkedFilter).length;
  },
  
  onGetApiKeys: function(items) {
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onGetApiKeysCompleted: function(items) {
    console.debug('ApiKeysStore::onGetApiKeysCompleted');

    var data = this.data;
    data.items = [];
    Object.keys(items).map(function(item) {
        data.items.push(items[item]);
    });
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onCreateApiKeyCompleted: function(payload) {
    console.debug('ApiKeysStore::onCreateApiKeyCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onCreateApiKeyFailure: function(payload) {
    console.debug('ApiKeysStore::onCreateApiKeyFailure');

    // TODO: create a mixin for that
    if (typeof payload === 'string') {
      this.data.errors.feedback = payload;
    } else {
      if (payload.non_field_errors !== undefined) {
        this.data.errors.feedback = payload.non_field_errors.join();
      }

      for (var field in payload) {
        this.data.errors[field] = payload[field];
      }
    }
    this.trigger(this.data);
  },

  onCheckItem: function(checkId, state) {
    console.debug('ApiKeysStore::onCheckItem');

    this.data.items.forEach(function(item) {
      if (checkId == item.id) {
        item.checked = state;
      }
    }.bind(this));
    this.trigger(this.data);
  },

  onUncheckAll: function() {
    console.debug('ApiKeysStore::onCheckItem');

    this.data.items.forEach(function(item) {
        item.checked = false;
    });
    this.trigger(this.data);
  },

  onRemoveApiKeysCompleted: function(payload) {
    console.debug('ApiKeysStore::onRemoveApiKeyFailure');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onResetApiKeyCompleted: function(payload) {
    console.debug('ApiKeysStore::onResetApiKeyFailure');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  getCheckedItem: function() {
    console.debug('ApiKeysStore::getCheckedItem');

    // Looking for the first 'checked' item
    var checkedItem = null;
    this.data.items.some(function (item) {
      if (item.checked) {
        checkedItem = item;
        return true;
      }
    });
    return checkedItem;
  },

  getCheckedItems: function() {
    // Looking for the first 'checked' item
    var checkedItems = [];
    this.data.items.map(function (item) {
      if (item.checked) {
        checkedItems.push(item);
      }
    });
    return checkedItems;
  }

});

module.exports = ApiKeysStore;