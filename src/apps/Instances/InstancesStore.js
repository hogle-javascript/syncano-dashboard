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
    this.refreshData();
  },

  onUpdateInstanceCompleted: function(paylod) {
    console.debug('InstancesStore::onUpdateInstanceCompleted');
    this.refreshData();
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
