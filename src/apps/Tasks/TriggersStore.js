var Reflux              = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    StoreFormMixin      = require('../../mixins/StoreFormMixin'),

    //Stores & Actions
    SessionStore        = require('../Session/SessionStore'),
    TriggersActions     = require('./TriggersActions');


var TriggersStore = Reflux.createStore({
  listenables : TriggersActions,
  mixins      : [
    CheckListStoreMixin,
    StoreFormMixin
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

  getInitialState: function () {
    return {
      items     : [],
      isLoading : false
    }
  },

  init: function () {
    this.data = this.getInitialState();
    this.listenTo(SessionStore, this.refreshData);
    this.listenToForms();
  },

  refreshData: function (data) {
    console.debug('TriggersStore::refreshData');
    if (SessionStore.getInstance() !== null) {
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

  onUpdateTriggerCompleted: function(paylod) {
    console.debug('TriggersStore::onUpdateTriggerCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onRemoveTriggersCompleted: function(payload) {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  }

});

module.exports = TriggersStore;