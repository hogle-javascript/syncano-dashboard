var Reflux         = require('reflux'),

    StoreFormMixin = require('../../mixins/StoreFormMixin'),

    SessionStore   = require('../Session/SessionStore'),
    SessionActions = require('../Session/SessionActions'),
    ProfileActions = require('./ProfileActions');


var ProfileSettingsStore = Reflux.createStore({
  listenables: ProfileActions,
  mixins: [StoreFormMixin],

  getInitialState: function () {
    var user = SessionStore.user || {};
    return {
      firstName : user.first_name,
      lastName  : user.last_name,
      email     : user.email
    }
  },

  init: function () {
    this.listenTo(SessionStore, this.checkSession);
  },

  checkSession: function (Session) {
    console.debug('ProfileSettingsStore:checkSession', Session.user);
    if (Session.isReady()) {
      this.trigger({
        firstName : Session.user.first_name,
        lastName  : Session.user.last_name,
        email     : Session.user.email
      });
    }
  },

  onUpdateSettingsCompleted: function (payload) {
    SessionActions.registerUser(payload);

    this.trigger({
      feedback: 'Profile saved successfully.'
    });
  },

});

module.exports = ProfileSettingsStore;