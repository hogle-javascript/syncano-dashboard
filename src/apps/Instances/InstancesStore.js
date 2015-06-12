var Reflux = require('reflux'),

    SessionStore     = require('../Session/SessionStore'),
    InstancesActions = require('./InstancesActions');


var InstancesStore = Reflux.createStore({
  listenables: InstancesActions,

  getInitialState: function () {
    return {
      errors: {},
      instances: {
        myInstances: [],
        otherInstances: [],
      },
      checkedInstances: 0,
    }
  },

  init: function () {

    this.data = {
      instances: {
        myInstances: [],
        otherInstances: [],
      },
      checkedInstances: 0,
      canSubmit: true,
      errors: {},
    };

    // We want to know when we are ready to download data for this store,
    // it depends on instance we working on
    this.listenTo(SessionStore, this.refreshData);
  },

  refreshData: function () {
    console.debug('InstancesStore::refreshData');
    InstancesActions.getInstances();
  },

  onGetInstancesCompleted: function(instances) {
    console.debug('InstancesStore::onGetInstanesCompleted');

    var data = this.data;
    data.instances.myInstances = [];
    data.instances.otherInstances = [];

    Object.keys(instances).map(function(item) {
      if (instances[item].owner.email === SessionStore.getMyEmail()) {
        data.instances.myInstances.push(instances[item]);
      } else {
        data.instances.otherInstances.push(instances[item]);
      }
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
    this.data.checkedInstances = 0;
    this.data.instances.myInstances.forEach(function(item) {
      if (checkId == item.name) {
        item.checked = state;
      }
      // Counting 'checked' items in meantime
      if (item.checked) {
        this.data.checkedInstances += 1;
      }
    }.bind(this));
    this.trigger(this.data);
  },

  onUncheckAll: function() {
    console.debug('InstancesStore::onCheckItem');
    this.data.checkedInstances = 0;
    this.data.instances.myInstances.forEach(function(item) {
        item.checked = false;
    });
    this.trigger(this.data);
  },

  getCheckedItem: function() {
    console.debug('InstancesStore::getCheckedItem');

    // Looking for the first 'checked' item
    var checkedItem;
    this.data.instances.myInstances.some(function (item) {
      if (item.checked) {
        checkedItem = item;
        return true;
      }
    });
    return checkedItem;
  }

});

module.exports = InstancesStore;
