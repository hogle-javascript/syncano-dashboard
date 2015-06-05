var Reflux          = require('reflux'),

    MainStore       = require('../Main/MainStore');

var CodeBoxesActions = Reflux.createActions();

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

CodeBoxesActions.getCodeBoxRuntimes = Reflux.createAction({asyncResult: true, children: ['completed', 'failure']});
CodeBoxesActions.getCodeBoxRuntimes.listen( function(payload) {
  MainStore.connection.CodeBoxes.listRuntimes()
    .then(this.completed)
    .catch(this.failure);
});

module.exports = CodeBoxesActions;