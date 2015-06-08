var Reflux     = require('reflux'),

    Connection = require('../Session/Connection').get();


var CodeBoxesActions = Reflux.createActions();

CodeBoxesActions.setCurrentCodeBoxId = Reflux.createAction();

CodeBoxesActions.getCodeBoxes = Reflux.createAction({asyncResult: true, children: ['completed', 'failure']});
CodeBoxesActions.getCodeBoxes.listen( function(payload) {
  Connection
    .CodeBoxes
    .list()
    .then(this.completed)
    .catch(this.failure);
});

CodeBoxesActions.addCodeBox = Reflux.createAction({asyncResult: true, children: ['completed', 'failure']});
CodeBoxesActions.addCodeBox.listen( function(payload) {
  Connection
    .CodeBoxes.create({
      runtime_name: payload.runtime,
      name: payload.label,
      description: payload.description,
      source: '#Start coding!',
    })
    .then(this.completed)
    .catch(this.failure);
});

CodeBoxesActions.updateCodeBox = Reflux.createAction({asyncResult: true, children: ['completed', 'failure']});
CodeBoxesActions.updateCodeBox.listen( function(params) {
  Connection
    .CodeBoxes.update(params.id, params)
    .then(this.completed)
    .catch(this.failure);
});


CodeBoxesActions.runCodeBox = Reflux.createAction({asyncResult: true, children: ['completed', 'failure']});
CodeBoxesActions.runCodeBox.listen( function(params) {
  Connection
    .CodeBoxes.run(params.id, {payload: params.payload})
    .then(this.completed)
    .catch(this.failure);
});

CodeBoxesActions.loadCodeboxTrace = Reflux.createAction({asyncResult: true, children: ['completed', 'failure']});
CodeBoxesActions.loadCodeboxTrace.listen( function(codeboxId, traceId) {
  Connection
    .CodeBoxes.trace(traceId, codeboxId, {})
    .then(this.completed)
    .catch(this.failure);
});

CodeBoxesActions.getCodeBoxRuntimes = Reflux.createAction({asyncResult: true, children: ['completed', 'failure']});
CodeBoxesActions.getCodeBoxRuntimes.listen( function() {
  Connection
    .CodeBoxes.listRuntimes()
    .then(this.completed)
    .catch(this.failure);
});

module.exports = CodeBoxesActions;