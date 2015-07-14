var Reflux     = require('reflux'),

    Connection = require('../Session/Connection').get();

var SolutionVersionDialogActions = Reflux.createActions({

  showDialog: {},
  dismissDialog: {},

});

module.exports = SolutionVersionDialogActions;
