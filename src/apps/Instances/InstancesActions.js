var Reflux     = require('reflux'),

    Connection = require('../Session/Connection').get();


var InstancesActions = Reflux.createActions();

InstancesActions.getInstances = Reflux.createAction({asyncResult: true, children: ['completed', 'failure']});
InstancesActions.getInstances.listen( function(payload) {
  console.info('InstancesActions::getInstances');
  Connection
    .Instances
    .list()
    .then(this.completed)
    .catch(this.failure);
});

InstancesActions.createInstance = Reflux.createAction({asyncResult: true, children: ['completed', 'failure']});
InstancesActions.createInstance.listen( function(payload) {
  console.info('InstancesActions::createInstance');
  Connection
    .Instances
    .create({
      name        : payload.name,
      description : payload.description
    })
    .then(this.completed)
    .catch(this.failure);
});

module.exports = InstancesActions;