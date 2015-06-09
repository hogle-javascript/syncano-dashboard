var Reflux     = require('reflux'),

    Connection = require('../Session/Connection').get();


var CodeBoxesActions = Reflux.createActions();

CodeBoxesActions.setCurrentCodeBoxId = Reflux.createAction();

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
  console.info('CodeBoxesActions::updateCodeBox');
  Connection
    .CodeBoxes.update(params.id, params)
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

CodeBoxesActions.loadCodeBoxTrace = Reflux.createAction({asyncResult: true, children: ['completed', 'failure']});
CodeBoxesActions.loadCodeBoxTrace.listen( function(codeboxId, traceId) {
  console.info('CodeBoxesActions::loadCodeBoxTrace');
  Connection
    .CodeBoxes.trace(traceId, codeboxId, {})
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