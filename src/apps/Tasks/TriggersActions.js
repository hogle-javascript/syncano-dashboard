var Reflux     = require('reflux'),

    Connection = require('../Session/Connection').get();


var TriggersActions = Reflux.createActions({
  checkItem  : {},
  uncheckAll : {},

  'createTrigger': {
      asyncResult: true,
      children: ['completed', 'failure']
  },
  'getTriggers': {
      asyncResult: true,
      children: ['completed', 'failure']
  },
  'updateTrigger': {
      asyncResult: true,
      children: ['completed', 'failure']
  },
  'removeTriggers': {
      asyncResult: true,
      children: ['completed', 'failure']
  }
});

TriggersActions.createTrigger.listen( function(payload) {
  console.info('TriggersActions::createTrigger');
  Connection
    .Triggers
    .create(payload)
    .then(this.completed)
    .catch(this.failure);
});

TriggersActions.getTriggers.listen( function(payload) {
  console.info('TriggersActions::getTriggers');
  Connection
    .Triggers
    .list()
    .then(this.completed)
    .catch(this.failure);
});

TriggersActions.updateTrigger.listen( function(id, payload) {
  console.info('TriggersActions::updateTrigger');
  Connection
    .Triggers
    .update(id, payload)
    .then(this.completed)
    .catch(this.failure);
});

TriggersActions.removeTriggers.listen( function(ids) {
  ids.map(function(id) {
    console.info('TriggersActions::removeTriggers');
    Connection
      .Triggers
      .remove(id)
      .then(this.completed)
      .catch(this.failure);
  }.bind(this));
});

module.exports = TriggersActions;