var Reflux         = require('reflux'),

    SessionStore   = require('../Session/SessionStore'),
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

    this.listenTo(SessionStore, this.checkSession);
  },

  checkSession: function (state) {
    console.log('ProfileStore::checkSession', state);
    // if (!state.isAuthenticated() || !state.user) {
    //   return
    // }

    // console.log(state);
  }
});

module.exports = ProfileStore;