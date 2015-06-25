var Reflux     = require('reflux'),

    Connection = require('../Session/Connection').get();


var InstancesActions = Reflux.createActions({
    checkItem  : {},
    uncheckAll : {},

    getInstances: {
       asyncResult : true,
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
    },

});



InstancesActions.getInstances.listen( function(payload) {
  console.info('InstancesActions::getInstances');
  Connection
    .Instances
    .list()
    .then(this.completed)
    .catch(this.failure);
});

InstancesActions.createInstance.listen( function(payload) {
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

InstancesActions.updateInstance.listen( function(name, payload) {
  console.info('InstancesActions::updateInstance');
  Connection
    .Instances
    .update(name, payload)
    .then(this.completed)
    .catch(this.failure);
});

InstancesActions.removeInstances.listen( function(names) {
  names.map(function(name) {
    console.info('InstancesActions::removeInstances');
    Connection
      .Instances
      .remove(name)
      .then(this.completed)
      .catch(this.failure);
  }.bind(this));
});

module.exports = InstancesActions;