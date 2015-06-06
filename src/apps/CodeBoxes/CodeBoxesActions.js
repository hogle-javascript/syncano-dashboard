var Reflux     = require('reflux'),

    Connection = require('../Session/Connection').get();

var CodeBoxesActions = Reflux.createActions();

CodeBoxesActions.getCodeBoxes = Reflux.createAction({asyncResult: true, children: ['completed', 'failure']});
CodeBoxesActions.getCodeBoxes.listen( function(payload) {
  Connection
    .CodeBoxes
    .list()
    .then(this.completed)
    .catch(this.failure);
});

module.exports = CodeBoxesActions;