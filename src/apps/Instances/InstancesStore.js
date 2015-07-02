var Reflux              = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    StoreFormMixin      = require('../../mixins/StoreFormMixin'),
    StoreLoadingMixin   = require('../../mixins/StoreLoadingMixin'),
    WaitForStoreMixin   = require('../../mixins/WaitForStoreMixin'),

    // Stores & Actions
    SessionActions      = require('../Session/SessionActions'),
    SessionStore        = require('../Session/SessionStore'),
    InstancesActions    = require('./InstancesActions');

var InstancesStore = Reflux.createStore({
  listenables : InstancesActions,
  mixins      : [
    CheckListStoreMixin,
    StoreFormMixin,
    StoreLoadingMixin,
    WaitForStoreMixin
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
      this.refreshData
    );
    this.listenToForms();
    this.setLoadingStates();
  },

  refreshData: function() {
    console.debug('InstancesStore::refreshData');
    InstancesActions.fetchInstances();
  },

  // Filters
  filterMyInstances: function(item) {
    return item.owner.email === SessionStore.getUser().email;
  },

  filterOtherInstances: function(item) {
    return item.owner.email !== SessionStore.getUser().email;
  },

  getMyInstances: function() {
    return this.data.items.filter(this.filterMyInstances);
  },

  getOtherInstances: function() {
    return this.data.items.filter(this.filterOtherInstances);
  },

  setInstances: function(instances) {
    console.debug('InstancesStore::setInstances');
    this.data.items = Object.keys(instances).map(function(key) {
      return instances[key];
    });
    this.trigger(this.data);
  },

  onFetchInstances: function(instances) {
    console.debug('InstancesStore::onFetchInstances');
    this.trigger(this.data);
  },

  onFetchInstancesCompleted: function(items) {
    console.debug('InstancesStore::onFetchInstancesCompleted');
    InstancesActions.setInstances(items);
  },

  onFetchInstancesFailure: function() {
    console.debug('InstancesStore::onFetchInstancesFailure');
    this.trigger(this.data);
  },

  onRemoveInstancesCompleted: function() {
    this.data.hideDialogs = true;
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
