var Reflux           = require('reflux'),

    // Utils & Mixins
    StoreFormMixin   = require('../../mixins/StoreFormMixin'),
    DialogStoreMixin = require('../../mixins/DialogStoreMixin'),

    //Stores & Actions
    ApiKeysActions     = require('./ApiKeysActions');

var ApiKeyDialogStore = Reflux.createStore({
  listenables : ApiKeysActions,
  mixins      : [
    StoreFormMixin,
    DialogStoreMixin
  ],

  getInitialState: function() {
    return {
      description       : "",
      ignore_acl        : false,
      allow_user_create : false
    }
  },

  init: function() {
    this.listenToForms();
  },

  onCreateApiKeyCompleted: function() {
    console.debug('ApiKeyDialogStore::onCreateApiKeyCompleted');
    this.dismissDialog();
    ApiKeysActions.fetchApiKeys();
  },

  onUpdateApiKeyCompleted: function() {
    console.debug('ApiKeyDialogStore::onUpdateApiKeyCompleted');
    this.dismissDialog();
    ApiKeysActions.fetchApiKeys();
  }

});

module.exports = ApiKeyDialogStore;
