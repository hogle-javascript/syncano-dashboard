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

  amIOwner: function(item) {
    if (item) {
      return item.owner.email === SessionStore.getUser().email;
    }
  },

  onCheckItem: function(checkId, state) {
    console.debug('InstancesStore::onCheckItem');

    var item         = this.getInstanceById(checkId);
    var checkedItems = this.getCheckedItems();

    // Unchecking or no items checked
    if (!state || checkedItems.length === 0) {
      item.checked = state;
      this.trigger(this.data);
      return;
    }

    // Checking if the item is from the same list as other checked
    var newItemFromMyList   = this.amIOwner(item),
        otherItemFromMyList = this.amIOwner(checkedItems[0]);

    item.checked = state;
    if (!(newItemFromMyList && otherItemFromMyList)) {
      this.data.items.forEach(function(existingItem) {
        // Uncheck all other then new one
        if (item.name !== existingItem.name) {
          existingItem.checked = false;
        }
      });
    }

    this.trigger(this.data);
  },

  getInstanceById: function(name) {
    var instance = null;
    this.data.items.some(function(item) {
      if (item.name.toString() === name.toString()) {
        instance = item;
        return true;
      }
    }.bind(this));
    return instance;
  },

  isCheckedInstanceShared: function() {
    var checkedItems = this.getCheckedItems();
    if (checkedItems) {
      return !this.amIOwner(checkedItems[0]);
    }
  },

  // Filters
  filterMyInstances: function(item) {
    return this.amIOwner(item);
  },

  filterOtherInstances: function(item) {
    return !this.amIOwner(item);
  },

  getMyInstances: function() {
    return this.data.items.filter(this.filterMyInstances);
  },

  getOtherInstances: function() {
    return this.data.items.filter(this.filterOtherInstances);
  },

  getInstancesDropdown: function() {
    return this.data.items.map(function(item) {
      return {
        payload : item.name,
        text    : item.name
      }
    });
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

  onUpdateInstanceCompleted: function() {
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
