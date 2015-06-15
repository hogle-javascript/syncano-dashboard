var Reflux = require('reflux'),

    SessionStore     = require('../Session/SessionStore'),
    InstancesActions = require('./InstancesActions');


var InstancesStore = Reflux.createStore({
  listenables: InstancesActions,

  getInitialState: function () {
    return {
      // Lists
      instances: [],

      // Dialogs
      errors: {},
    }
  },

  init: function () {

    this.data = {
      // List
      instances: [],

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

  getNumberOfChecked: function() {
    var checkedFilter = function(item) {
      return item.checked === true;
    };
    return this.data.instances.filter(checkedFilter).length;
  },

  onGetInstancesCompleted: function(instances) {
    console.debug('InstancesStore::onGetInstanesCompleted');

    var data = this.data;
    data.instances = [];
    Object.keys(instances).map(function(item) {
        data.instances.push(instances[item]);
    });
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

  onCheckItem: function(checkId, state) {
    console.debug('InstancesStore::onCheckItem');

    this.data.instances.forEach(function(item) {
      if (checkId == item.name) {
        item.checked = state;
      }
    }.bind(this));
    this.trigger(this.data);
  },

  onUncheckAll: function() {
    console.debug('InstancesStore::onCheckItem');

    this.data.instances.forEach(function(item) {
        item.checked = false;
    });
    this.trigger(this.data);
  },

  onRemoveInstancesCompleted: function(payload) {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  getCheckedItem: function() {
    console.debug('InstancesStore::getCheckedItem');

    // Looking for the first 'checked' item
    var checkedItem = null;
    this.data.instances.some(function (item) {
      if (item.checked) {
        checkedItem = item;
        return true;
      }
    });
    return checkedItem;
  },

  getCheckedItemIconColor: function() {
    var singleItem = this.getCheckedItem();

    if (!singleItem) {
      return {
        color : null,
        icon  : null,
      }
    }

    return {
      color : singleItem.metadata.color,
      icon  : singleItem.metadata.icon
    };
  },

  // TODO: Combine it somehow with getCheckedItems? general filter function? mixin for filtering lists?
  getCheckedItems: function() {
    // Looking for the first 'checked' item
    var checkedItems = [];
    this.data.instances.map(function (item) {
      if (item.checked) {
        checkedItems.push(item);
      }
    });
    return checkedItems;
  }

});

module.exports = InstancesStore;