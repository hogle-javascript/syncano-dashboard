var Reflux = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),

    SessionStore     = require('../Session/SessionStore'),
    InstancesActions = require('./InstancesActions');


var InstancesStore = Reflux.createStore({
  listenables : InstancesActions,
  mixins      : [CheckListStoreMixin],

  getInitialState: function () {
    return {
      // Lists
      //items: [],
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

  refreshData: function () {
    console.debug('InstancesStore::refreshData');
    InstancesActions.getInstances();
  },

  // Filters
  filterMyInstances: function(item) {
    return item.owner.email === SessionStore.user.email;
  },

  filterOtherInstances: function(item) {
    return item.owner.email !== SessionStore.user.email;
  },

  getMyInstances: function(){
    return this.data.items.filter(this.filterMyInstances);
  },

  getOtherInstances: function(){
    return this.data.items.filter(this.filterOtherInstances);
  },

  onGetInstances: function(instances) {
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onGetInstancesCompleted: function(items) {
    console.debug('InstancesStore::onGetInstanesCompleted');

    var data = this.data;
    data.items = [];
    Object.keys(items).map(function(item) {
        data.items.push(items[item]);
    });
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onGetInstancesFailure: function () {
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onCreateInstanceCompleted: function(payload) {
    console.debug('InstancesStore::onCreateInstanceCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onCreateInstanceFailure: function(payload) {
    console.debug('InstancesStore::onCreateInstanceCompleted');

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

  onUpdateInstanceCompleted: function(paylod) {
    console.debug('InstancesStore::onUpdateInstanceCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onUpdateInstanceFailure: function(payload) {
    console.debug('InstancesStore::onUpdateInstanceFailure');

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

  onRemoveInstancesCompleted: function(payload) {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  getCheckedItemIconColor: function() {
    var singleItem = this.getCheckedItem();

    if (!singleItem) {
      return {
        color : null,
        icon  : null
      }
    }

    return {
      color : singleItem.metadata.color,
      icon  : singleItem.metadata.icon
    };
  }

});

module.exports = InstancesStore;