var Reflux              = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    StoreFormMixin      = require('../../mixins/StoreFormMixin'),
    WaitForStoreMixin   = require('../../mixins/WaitForStoreMixin'),

    //Stores & Actions
    ClassesActions      = require('../Classes/ClassesActions'),
    CodeBoxesActions    = require('../CodeBoxes/CodeBoxesActions'),
    SessionActions      = require('../Session/SessionActions'),
    TriggersActions     = require('./TriggersActions');


var TriggersStore = Reflux.createStore({
  listenables : TriggersActions,
  mixins      : [
    CheckListStoreMixin,
    StoreFormMixin,
    WaitForStoreMixin
  ],

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
    this.listenToForms();
  },

  setTriggers: function(items) {
    this.data.items = Object.keys(items).map(function(item) {
      return items[item];
    });
    this.trigger(this.data);
  },

  getTriggers: function(empty) {
    return this.data.items || empty || null;
  },

  refreshData: function() {
    TriggersActions.fetchTriggers();
  },

  getSignalsDropdown: function() {
    return this.signalMenuItems;
  },

  onFetchTriggers: function() {
    console.debug('TriggersStore::onFetchTriggers');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchTriggersCompleted: function(items) {
    console.debug('TriggersStore::onFetchTriggersCompleted');
    this.data.isLoading = false;
    TriggersActions.setTriggers(items);
  },

  onCreateTriggerCompleted: function() {
    console.debug('TriggersStore::onCreateTriggerCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onUpdateTriggerCompleted: function() {
    console.debug('TriggersStore::onUpdateTriggerCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onRemoveTriggersCompleted: function() {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  }

});

module.exports = TriggersStore;
