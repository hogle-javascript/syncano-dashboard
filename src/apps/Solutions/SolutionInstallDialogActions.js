var Reflux     = require('reflux'),

    Connection = require('../Session/Connection').get();

var SolutionInstallDialogActions = Reflux.createActions({

  showDialog: {},
  dismissDialog: {},

});

module.exports = SolutionInstallDialogActions;
