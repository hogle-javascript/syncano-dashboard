var Reflux              = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
  
    //Stores & Actions
    SessionStore        = require('../Session/SessionStore'),
    AdminsActions       = require('./AdminsActions');


var AdminsStore = Reflux.createStore({
  listenables : AdminsActions,
  mixins      : [CheckListStoreMixin],

  getInitialState: function () {
    return {
      // Lists
      items: [],
      isLoading: false,

      // Dialogs
      errors: {},
    }
  },

  init: function () {

    this.data = {
      // List
      items: [],
      isLoading: false,

      // Dialogs
      errors: {},
      canSubmit: true,
    };

    // We want to know when we are ready to download data for this store,
    // it depends on instance we working on
    this.listenTo(SessionStore, this.refreshData);
  },

  refreshData: function (data) {
    console.debug('AdminsStore::refreshData');
    console.debug('SessionStore.instance', SessionStore.instance)
    if (SessionStore.instance) {
      AdminsActions.getAdmins();
    }
  },
  
  onGetAdmins: function(items) {
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onGetAdminsCompleted: function(items) {
    console.debug('AdminsStore::onGetInstanesCompleted');

    var data = this.data;
    data.items = [];
    Object.keys(items).map(function(item) {
        data.items.push(items[item]);
    });
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onCreateAdminCompleted: function(payload) {
    console.debug('AdminsStore::onCreateAdminCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onCreateAdminFailure: function(payload) {
    console.debug('AdminsStore::onCreateAdminCompleted');

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
  
  onUpdateAdminCompleted: function(paylod) {
    console.debug('AdminsStore::onUpdateAdminCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onUpdateAdminFailure: function(payload) {
    console.debug('AdminsStore::onUpdateAdminFailure');

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

  onRemoveAdminsCompleted: function(payload) {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

});

module.exports = AdminsStore;