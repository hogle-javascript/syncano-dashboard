var Reflux     = require('reflux'),

    Syncano    = require('../Session/Connection'),
    Connection = Syncano.get(),
    D          = Syncano.D;


var TriggersActions = Reflux.createActions({
  checkItem   : {},
  uncheckAll  : {},
  fetch       : {},
  setTriggers : {},

  createTrigger: {
      asyncResult : true,
      asyncForm   : true,
      children    : ['completed', 'failure']
  },
  fetchTriggers: {
      asyncResult : true,
      children    : ['completed', 'failure']
  },
  updateTrigger: {
      asyncResult : true,
      asyncForm   : true,
      children    : ['completed', 'failure']
  },
  removeTriggers: {
      asyncResult : true,
      children    : ['completed', 'failure']
  }
});

TriggersActions.createTrigger.listen( function (payload) {
  console.info('TriggersActions::createTrigger');
  Connection
    .Triggers
    .create(payload)
    .then(this.completed)
    .catch(this.failure);
});

TriggersActions.fetchTriggers.listen( function (payload) {
  console.info('TriggersActions::fetchTriggers');
  Connection
    .Triggers
    .list()
    .then(this.completed)
    .catch(this.failure);
});

TriggersActions.updateTrigger.listen( function (id, payload) {
  console.info('TriggersActions::updateTrigger');
  Connection
    .Triggers
    .update(id, payload)
    .then(this.completed)
    .catch(this.failure);
});

TriggersActions.removeTriggers.listen( function (ids) {
  console.info('TriggersActions::removeTriggers');
  var promises = ids.map(function (id) {
    return Connection.Triggers.remove(id);
  });

  D.all(promises)
    .success(this.completed)
    .error(this.failure);
});

module.exports = TriggersActions;