var Reflux              = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
  
    //Stores & Actions
    SessionStore        = require('../Session/SessionStore'),
    GroupsActions       = require('./GroupsActions');


var GroupsStore = Reflux.createStore({
  listenables : GroupsActions,
  mixins      : [CheckListStoreMixin],

  getInitialState: function () {
    return {
      // Lists
      items: [],
      isLoading: false,

      // Dialogs
      errors: {}
    }
  },

  init: function () {

    this.data = {
      // List
      items: [],
      isLoading: false,

      // Dialogs
      errors: {},
      canSubmit: true
    };

    // We want to know when we are ready to download data for this store,
    // it depends on instance we working on
    this.listenTo(SessionStore, this.refreshData);
  },

  refreshData: function (data) {
    console.debug('GroupsStore::refreshData');
    if (SessionStore.instance) {
      GroupsActions.getGroups();
    }
  },

  onGetGroups: function(items) {
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onGetGroupsCompleted: function(items) {
    console.debug('GroupsStore::onGetInstanesCompleted');

    this.data.items = Object.keys(items).map(function(item) {
        return items[item];
    });
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onCreateGroupCompleted: function(payload) {
    console.debug('GroupsStore::onCreateGroupCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onCreateGroupFailure: function(payload) {
    console.debug('GroupsStore::onCreateGroupCompleted');

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
  
  onUpdateGroupCompleted: function(paylod) {
    console.debug('GroupsStore::onUpdateGroupCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onUpdateGroupFailure: function(payload) {
    console.debug('GroupsStore::onUpdateGroupFailure');

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

  onRemoveGroupsCompleted: function(payload) {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

});

module.exports = GroupsStore;