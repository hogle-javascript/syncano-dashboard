var Reflux              = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
  
    //Stores & Actions
    SessionStore        = require('../Session/SessionStore'),
    TriggersActions     = require('./TriggersActions');


var TriggersStore = Reflux.createStore({
  listenables : TriggersActions,
  mixins      : [CheckListStoreMixin],

  signalMenuItems: [
    {
      payload : 'post_create',
      text    : 'create'
    },
    {
      payload : 'post_update',
      text    : 'update'
    },
    {
      payload : 'post_delete',
      text    : 'delete'
    }
  ],

  classMenuItems: [
    {
      payload : 'user_profile',
      text    : 'UserProfile'
    },
    {
      payload : 'user_profile',
      text    : 'UserProfile'
    }

  ],

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
    console.debug('TriggersStore::refreshData');
    if (SessionStore.instance) {
      TriggersActions.getTriggers();
    }
  },

  getSignalsDropdown: function() {
    return this.signalMenuItems;
  },

  getClassesDropdown: function() {
    return this.classMenuItems;
  },

  onGetTriggers: function(items) {
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onGetTriggersCompleted: function(items) {
    console.debug('TriggersStore::onGetInstanesCompleted');

    this.data.items = Object.keys(items).map(function(item) {
        return items[item];
    });
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onCreateTriggerCompleted: function(payload) {
    console.debug('TriggersStore::onCreateTriggerCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onCreateTriggerFailure: function(payload) {
    console.debug('TriggersStore::onCreateTriggerCompleted');

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
  
  onUpdateTriggerCompleted: function(paylod) {
    console.debug('TriggersStore::onUpdateTriggerCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onUpdateTriggerFailure: function(payload) {
    console.debug('TriggersStore::onUpdateTriggerFailure');

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

  onRemoveTriggersCompleted: function(payload) {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

});

module.exports = TriggersStore;