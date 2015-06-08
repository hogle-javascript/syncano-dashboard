var Reflux          = require('reflux'),

    MainStore       = require('../Main/MainStore');

var CodeBoxesActions = Reflux.createActions();

CodeBoxesActions.setCurrentCodeBoxId = Reflux.createAction();

CodeBoxesActions.getCodeBoxes = Reflux.createAction({asyncResult: true, children: ['completed', 'failure']});
CodeBoxesActions.getCodeBoxes.listen( function(payload) {

  MainStore.connection.CodeBoxes.list()
    .then(this.completed)
    .catch(this.failure);
});

CodeBoxesActions.addCodeBox = Reflux.createAction({asyncResult: true, children: ['completed', 'failure']});
CodeBoxesActions.addCodeBox.listen( function(payload) {
  MainStore.connection.CodeBoxes.create({
    runtime_name : payload.runtime,
    name         : payload.label,
    description  : payload.description,
    source       : '#Start coding!',
  })
    .then(this.completed)
    .catch(this.failure);
});

CodeBoxesActions.updateCodeBox = Reflux.createAction({asyncResult: true, children: ['completed', 'failure']});
CodeBoxesActions.updateCodeBox.listen( function(params) {
  MainStore.connection.CodeBoxes.update(params.id, params)
    .then(this.completed)
    .catch(this.failure);
});


CodeBoxesActions.runCodeBox = Reflux.createAction({asyncResult: true, children: ['completed', 'failure']});
CodeBoxesActions.runCodeBox.listen( function(params) {
  MainStore.connection.CodeBoxes.run(params.id, {payload: params.payload})
    .then(this.completed)
    .catch(this.failure);
});

CodeBoxesActions.loadCodeboxTrace = Reflux.createAction({asyncResult: true, children: ['completed', 'failure']});
CodeBoxesActions.loadCodeboxTrace.listen( function(codeboxId, traceId) {
  MainStore.connection.CodeBoxes.trace(traceId, codeboxId, {})
    .then(this.completed)
    .catch(this.failure);
});

CodeBoxesActions.getCodeBoxRuntimes = Reflux.createAction({asyncResult: true, children: ['completed', 'failure']});
CodeBoxesActions.getCodeBoxRuntimes.listen( function() {
  MainStore.connection.CodeBoxes.listRuntimes()
    .then(this.completed)
    .catch(this.failure);
});

module.exports = CodeBoxesActions;