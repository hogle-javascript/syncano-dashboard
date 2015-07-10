var Reflux     = require('reflux'),
    Syncano    = require('../Session/Connection'),
    Connection = Syncano.get();

var CodeBoxActions = Reflux.createActions({
  setCurrentCodeBoxTraces : {},
  setCurrentCodeBoxId     : {},
  setCurrentCodeBox       : {},
  fetch                   : {},

  fetchCodeBox: {
    asyncResult : true,
    loading     : true,
    children    : ['completed', 'failure']
  },

  updateCodeBox: {
    asyncResult : true,
    asyncForm   : true,
    children    : ['completed', 'failure']
  },
  runCodeBox: {
    asyncResult : true,
    loading     : true,
    children    : ['completed', 'failure']
  },

  fetchCodeBoxTraces: {
    asyncResult : true,
    loading     : true,
    children    : ['completed', 'failure']
  }
});

CodeBoxActions.fetchCodeBox.listen(function(codeboxId) {
  console.info('CodeBoxActions::fetchCodeBox');
  Connection
    .CodeBoxes
    .get(codeboxId)
    .then(this.completed)
    .catch(this.failure);
});

CodeBoxActions.updateCodeBox.listen(function(codeboxId, params) {
  console.info('CodeBoxActions::updateCodeBox');
  Connection
    .CodeBoxes.update(codeboxId, params)
    .then(this.completed)
    .catch(this.failure);
});

CodeBoxActions.runCodeBox.listen(function(params) {
  console.info('CodeBoxActions::runCodeBox');
  Connection
    .CodeBoxes.run(params.id, {payload: params.payload})
    .then(this.completed)
    .catch(this.failure);
});

CodeBoxActions.fetchCodeBoxTraces.listen(function(codeboxId) {
  console.info('CodeBoxActions::fetchCodeBoxTraces', codeboxId);
  Connection
    .CodeBoxes.traces(codeboxId, {})
    .then(this.completed)
    .catch(this.failure);
});

module.exports = CodeBoxActions;
