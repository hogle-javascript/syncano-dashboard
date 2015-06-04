var Reflux          = require('reflux'),

    MainStore       = require('../Main/MainStore');

var CodeBoxesActions = Reflux.createActions();

CodeBoxesActions.getCodeBoxes = Reflux.createAction({asyncResult: true, children: ['completed', 'failure']});
CodeBoxesActions.getCodeBoxes.listen( function(payload) {

  MainStore.connection.CodeBoxes.list()
    .then(this.completed)
    .catch(this.failure);
});

module.exports = CodeBoxesActions;