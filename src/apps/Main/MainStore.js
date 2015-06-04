var Reflux        = require('reflux'),

    // Utils
    Syncano       = require('../../lib/syncano4');

    // Stores and Actions
    MainActions   = require('./MainActions');


var MainStore = Reflux.createStore({

  init: function () {

    this.listenTo(MainActions.registerRouter, this.onRegisterRouter);

    this.connection = new Syncano();
    this.router = null;
  },

  onRegisterRouter: function (router) {
    this.router = router;
  },

});

module.exports = MainStore;
