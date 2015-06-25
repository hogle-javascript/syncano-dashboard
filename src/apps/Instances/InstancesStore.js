var Reflux              = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    StoreFormMixin      = require('../../mixins/StoreFormMixin'),
    StoreLoadingMixin   = require('../../mixins/StoreLoadingMixin'),

    SessionStore        = require('../Session/SessionStore'),
    InstancesActions    = require('./InstancesActions');


var InstancesStore = Reflux.createStore({
  listenables : InstancesActions,
  mixins      : [
    CheckListStoreMixin,
    StoreFormMixin,
    StoreLoadingMixin
  ],

  getInitialState: function () {
    return {
      items: [],
    }
  },

  init: function () {
    this.data = this.getInitialState();
    this.listenTo(SessionStore, this.refreshData);
    this.listenToForms();
    this.setLoadingStates();
  },

  refreshData: function () {
    console.debug('InstancesStore::refreshData');
    InstancesActions.getInstances();
  },

  // Filters
  filterMyInstances: function(item) {
    return item.owner.email === SessionStore.getUser().email;
  },

  filterOtherInstances: function(item) {
    return item.owner.email !== SessionStore.getUser().email;
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

    this.data.items = Object.keys(items).map(function(item) {
        return items[item];
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
    this.refreshData();
  },

  onUpdateInstanceCompleted: function(paylod) {
    console.debug('InstancesStore::onUpdateInstanceCompleted');
    this.data.hideDialogs = true;
    this.refreshData();
  },

  onRemoveInstancesCompleted: function(payload) {
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