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
    }
  },

  init: function () {
    this.data = {
      instances: {
        myInstances: [],
        otherInstances: [],
      },
      checkedItemNumber: 0,
      canSubmit: true,
      errors: {},
    };
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
      if (instances[item].owner.email === SessionStore.user.email) {

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
  }

});

module.exports = InstancesStore;
