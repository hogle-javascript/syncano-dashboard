var Reflux     = require('reflux'),

    Connection = require('../Session/Connection').get();


var TracesActions = Reflux.createActions({
    'setCurrentObjectId': {},
    'getTraces': {
      asyncResult: true,
      children: ['completed', 'failure']
  },
});

TracesActions.getTraces.listen( function(objectId) {
  console.info('TracesActions::getTraces', objectId);
  Connection
    .CodeBoxes.traces(objectId, {})
    .then(this.completed)
    .catch(this.failure);
});

module.exports = TracesActions;