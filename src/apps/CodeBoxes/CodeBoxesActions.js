var Reflux     = require('reflux'),

    Connection = require('../Session/Connection').get();


var CodeBoxesActions = Reflux.createActions();

CodeBoxesActions.setCurrentCodeBoxId = Reflux.createAction();

// TODO: Mixin?
CodeBoxesActions.checkItem = Reflux.createAction();
CodeBoxesActions.uncheckAll = Reflux.createAction();

CodeBoxesActions.getCodeBoxes = Reflux.createAction({asyncResult: true, children: ['completed', 'failure']});
CodeBoxesActions.getCodeBoxes.listen( function(payload) {
  console.info('CodeBoxesActions::getCodeBoxes');
  Connection
    .CodeBoxes
    .list()
    .then(this.completed)
    .catch(this.failure);
});

CodeBoxesActions.addCodeBox = Reflux.createAction({asyncResult: true, children: ['completed', 'failure']});
CodeBoxesActions.addCodeBox.listen( function(payload) {
  console.info('CodeBoxesActions::addCodeBox');
  Connection
    .CodeBoxes.create({
      runtime_name : payload.runtime_name,
      name         : payload.name,
      description  : payload.description,
      source: '#Start coding!',
    })
    .then(this.completed)
    .catch(this.failure);
});

CodeBoxesActions.updateCodeBox = Reflux.createAction({asyncResult: true, children: ['completed', 'failure']});
CodeBoxesActions.updateCodeBox.listen( function(codeboxId, params) {
  console.info('CodeBoxesActions::updateCodeBox');
  Connection
    .CodeBoxes.update(codeboxId, params)
    .then(this.completed)
    .catch(this.failure);
});

CodeBoxesActions.runCodeBox = Reflux.createAction({asyncResult: true, children: ['completed', 'failure']});
CodeBoxesActions.runCodeBox.listen( function(params) {
  console.info('CodeBoxesActions::runCodeBox');
  Connection
    .CodeBoxes.run(params.id, {payload: params.payload})
    .then(this.completed)
    .catch(this.failure);
});

CodeBoxesActions.removeCodeBoxes = Reflux.createAction({asyncResult: true, children: ['completed', 'failure']});
CodeBoxesActions.removeCodeBoxes.listen( function(idArray) {
  console.info('CodeBoxesActions::removeCodeBoxes');
  idArray.map(function(id) {
    Connection
      .CodeBoxes.remove(id)
      .then(this.completed)
      .catch(this.failure);
  }.bind(this));
});

CodeBoxesActions.getCodeBoxTrace = Reflux.createAction({asyncResult: true, children: ['completed', 'failure']});
CodeBoxesActions.getCodeBoxTrace.listen( function(codeboxId, traceId) {
  console.info('CodeBoxesActions::getCodeBoxTrace');
  Connection
    .CodeBoxes.trace(traceId, codeboxId, {})
    .then(this.completed)
    .catch(this.failure);
});

CodeBoxesActions.getCodeBoxTraces = Reflux.createAction({asyncResult: true, children: ['completed', 'failure']});
CodeBoxesActions.getCodeBoxTraces.listen( function(codeboxId) {
  console.info('CodeBoxesActions::getCodeBoxTraces', codeboxId);
  Connection
    .CodeBoxes.traces(codeboxId, {})
    .then(this.completed)
    .catch(this.failure);
});

CodeBoxesActions.getCodeBoxRuntimes = Reflux.createAction({asyncResult: true, children: ['completed', 'failure']});
CodeBoxesActions.getCodeBoxRuntimes.listen( function() {
  console.info('CodeBoxesActions::getCodeBoxRuntimes');
  Connection
    .CodeBoxes.listRuntimes()
    .then(this.completed)
    .catch(this.failure);
});

module.exports = CodeBoxesActions;