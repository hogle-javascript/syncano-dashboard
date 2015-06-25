var Reflux     = require('reflux'),

    Connection = require('../Session/Connection').get();


var CodeBoxesActions = Reflux.createActions({
  checkItem           : {},
  uncheckAll          : {},

  fetch               : {},
  setCodeBoxes        : {},
  setCodeBoxTraces    : {},
  setCurrentCodeBoxId : {},

  fetchCodeBoxes: {
    asyncResult : true,
    loading     : true,
    children    : ['completed', 'failure']
  },
  createCodeBox: {
    asyncForm   : true,
    asyncResult : true,
      children    : ['completed', 'failure']
},
  updateCodeBox: {
    asyncResult : true,
    asyncForm   : true,
    children    : ['completed', 'failure']
  },
  runCodeBox: {
    asyncResult: true,
    loading    : true,
    children   : ['completed', 'failure']
  },
  removeCodeBoxes: {
    asyncResult : true,
    children    : ['completed', 'failure']
  },
  fetchCodeBoxTrace: {
    asyncResult : true,
    loading     : true,
    children    : ['completed', 'failure']
  },
  fetchCodeBoxTraces: {
    asyncResult : true,
    loading     : true,
    children    : ['completed', 'failure']
  },
  fetchCodeBoxRuntimes: {
    asyncResult : true,
    children    : ['completed', 'failure']
  }
});

CodeBoxesActions.fetchCodeBoxes.listen( function() {
  console.info('CodeBoxesActions::fetchCodeBoxes');
  Connection
    .CodeBoxes
    .list()
    .then(this.completed)
    .catch(this.failure);
});

CodeBoxesActions.createCodeBox.listen( function(payload) {
  console.info('CodeBoxesActions::createCodeBox');
  Connection
    .CodeBoxes.create({
      runtime_name : payload.runtime_name,
      label        : payload.label,
      description  : payload.description,
      source: '# Start coding!'
    })
    .then(this.completed)
    .catch(this.failure);
});

CodeBoxesActions.updateCodeBox.listen( function(codeboxId, params) {
  console.info('CodeBoxesActions::updateCodeBox');
  Connection
    .CodeBoxes.update(codeboxId, params)
    .then(this.completed)
    .catch(this.failure);
});

CodeBoxesActions.runCodeBox.listen( function(params) {
  console.info('CodeBoxesActions::runCodeBox');
  Connection
    .CodeBoxes.run(params.id, {payload: params.payload})
    .then(this.completed)
    .catch(this.failure);
});

CodeBoxesActions.removeCodeBoxes.listen( function(idArray) {
  console.info('CodeBoxesActions::removeCodeBoxes');
  idArray.map(function(id) {
    Connection
      .CodeBoxes.remove(id)
      .then(this.completed)
      .catch(this.failure);
  }.bind(this));
});

CodeBoxesActions.fetchCodeBoxTrace.listen( function(codeboxId, traceId) {
  console.info('CodeBoxesActions::fetchCodeBoxTrace');
  Connection
    .CodeBoxes.trace(traceId, codeboxId, {})
    .then(this.completed)
    .catch(this.failure);
});

CodeBoxesActions.fetchCodeBoxTraces.listen( function(codeboxId) {
  console.info('CodeBoxesActions::fetchCodeBoxTraces', codeboxId);
  Connection
    .CodeBoxes.traces(codeboxId, {})
    .then(this.completed)
    .catch(this.failure);
});

CodeBoxesActions.fetchCodeBoxRuntimes.listen( function() {
  console.info('CodeBoxesActions::fetchCodeBoxRuntimes');
  Connection
    .CodeBoxes.listRuntimes()
    .then(this.completed)
    .catch(this.failure);
});

module.exports = CodeBoxesActions;