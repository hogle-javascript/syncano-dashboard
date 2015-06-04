var Reflux = require('reflux');


var MainActions = Reflux.createActions();
MainActions.registerRouter = Reflux.createAction();

module.exports = MainActions;