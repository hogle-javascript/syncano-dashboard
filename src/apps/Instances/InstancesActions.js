var Reflux     = require('reflux'),

    Connection = require('../Session/Connection').get();


var InstancesActions = Reflux.createActions();

InstancesActions.getInstances = Reflux.createAction({asyncResult: true, children: ['loading', 'completed', 'failure']});
InstancesActions.getInstances.listen( function(payload) {
  this.loading();
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

InstancesActions.updateInstance = Reflux.createAction({asyncResult: true, children: ['completed', 'failure']});
InstancesActions.updateInstance.listen( function(name, payload) {
  console.info('InstancesActions::updateInstance');
  Connection
    .Instances
    .update(name, payload)
    .then(this.completed)
    .catch(this.failure);
});

InstancesActions.removeInstances = Reflux.createAction({asyncResult: true, children: ['completed', 'failure']});
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

InstancesActions.checkItem = Reflux.createAction();
InstancesActions.uncheckAll = Reflux.createAction();

module.exports = InstancesActions;