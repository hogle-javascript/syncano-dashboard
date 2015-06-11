var Reflux         = require('reflux'),

    ProfileActions = require('./ProfileActions');


var ProfileStore = Reflux.createStore({
  listenables: ProfileActions,

  getInitialState: function () {
    return {
      settings: {
        errors: {},
        firstName: null,
        lastName: null,
        email: null,
        feedback: null
      },
      invitations: {},
      authentication: {},
      billing: {}
    }
  },

  init: function () {
    this.settings       = {};
    this.invitations    = {};
    this.authentication = {};
    this.billing        = {};
  }

});

module.exports = ProfileStore;