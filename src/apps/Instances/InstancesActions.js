var Reflux     = require('reflux'),
    Syncano    = require('../Session/Connection'),
    Connection = Syncano.get(),
    D          = Syncano.D;

var InstancesActions = Reflux.createActions({
  checkItem     : {},
  uncheckAll    : {},
  fetch         : {},
  setInstances  : {},
  showDialog    : {},
  dismissDialog : {},
  fetchInstances: {
    asyncResult : true,
    loading     : true,
    children    : ['completed', 'failure']
  },

  createInstance: {
    asyncResult : true,
    asyncForm   : true,
    loading     : true,
    children    : ['completed', 'failure']
  },

  updateInstance: {
    asyncResult : true,
    asyncForm   : true,
    loading     : true,
    children    : ['completed', 'failure']
  },

  removeInstances: {
    asyncResult : true,
    loading     : true,
    children    : ['completed', 'failure']
  }
});

InstancesActions.fetchInstances.listen(function() {
  console.info('InstancesActions::fetchInstances');
  Connection
    .Instances
    .list()
    .then(this.completed)
    .catch(this.failure);
});

InstancesActions.createInstance.listen(function(payload) {
  console.info('InstancesActions::createInstance');
  Connection
    .Instances
    .create({
      name        : payload.name,
      description : payload.description,
      metadata    : payload.metadata
    })
    .then(this.completed)
    .catch(this.failure);
});

InstancesActions.updateInstance.listen(function(name, payload) {
  console.info('InstancesActions::updateInstance');
  Connection
    .Instances
    .update(name, payload)
    .then(this.completed)
    .catch(this.failure);
});

InstancesActions.removeInstances.listen(function(names) {
  console.info('InstancesActions::removeInstances');
  var promises = names.map(function(name) {
    return Connection.Instances.remove(name);
  });

  D.all(promises)
    .success(this.completed)
    .error(this.failure);
});

module.exports = InstancesActions;
