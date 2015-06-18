var Reflux     = require('reflux'),

    Connection = require('../Session/Connection').get();


var TriggersActions = Reflux.createActions({
  checkItem  : {},
  uncheckAll : {},

  'getTriggers': {
      asyncResult: true,
      children: ['completed', 'failure']
  },
  'updateTrigger': {
      asyncResult: true,
      children: ['completed', 'failure']
  },
  'removeTrigger': {
      asyncResult: true,
      children: ['completed', 'failure']
  },


});

TriggersActions.getTriggers.listen( function(payload) {
  console.info('TriggersActions::getTriggers');
  Connection
    .Triggers
    .list()
    .then(this.completed)
    .catch(this.failure);
});

TriggersActions.updateTrigger.listen( function(name, payload) {
  console.info('TriggersActions::updateTrigger');
  Connection
    .Triggers
    .update(name, payload)
    .then(this.completed)
    .catch(this.failure);
});

TriggersActions.removeTrigger.listen( function(names) {
  names.map(function(name) {
    console.info('TriggersActions::removeTriggers');
    Connection
      .Triggers
      .remove(name)
      .then(this.completed)
      .catch(this.failure);
  }.bind(this));
});

module.exports = TriggersActions;