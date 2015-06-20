var Reflux              = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
  
    //Stores & Actions
    SessionStore        = require('../Session/SessionStore'),
    UsersActions    = require('./UsersActions');


var UsersStore = Reflux.createStore({
  listenables : UsersActions,
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
    console.debug('UsersStore::refreshData');
    if (SessionStore.instance) {
      UsersActions.getUsers();
    }
  },
  
  onGetUsers: function(items) {
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onGetUsersCompleted: function(items) {
    console.debug('UsersStore::onGetInstanesCompleted');

    this.data.items = Object.keys(items).map(function(item) {
        return items[item];
    });
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onCreateUserCompleted: function(payload) {
    console.debug('UsersStore::onCreateUserCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onCreateUserFailure: function(payload) {
    console.debug('UsersStore::onCreateUserCompleted');

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
  
  onUpdateUserCompleted: function(paylod) {
    console.debug('UsersStore::onUpdateUserCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onUpdateUserFailure: function(payload) {
    console.debug('UsersStore::onUpdateUserFailure');

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

  onRemoveUsersCompleted: function(payload) {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

});

module.exports = UsersStore;