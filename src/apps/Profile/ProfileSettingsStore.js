var Reflux         = require('reflux'),

    StoreFormMixin = require('../../mixins/StoreFormMixin'),

    SessionStore   = require('../Session/SessionStore'),
    SessionActions = require('../Session/SessionActions'),
    ProfileActions = require('./ProfileActions');

var ProfileSettingsStore = Reflux.createStore({
  listenables: ProfileActions,
  mixins: [StoreFormMixin],

  getInitialState: function() {
    var user = SessionStore.getUser({});
    return {
      firstName : user.first_name,
      lastName  : user.last_name,
      email     : user.email
    }
  },

  init: function() {
    this.data = this.getInitialState();
    this.listenTo(SessionStore, this.checkSession);
    this.listenToForms();
  },

  checkSession: function(Session) {
    console.debug('ProfileSettingsStore:checkSession');
    if (Session.isReady()) {
      var user = SessionStore.getUser({});
      this.trigger({
        firstName : user.first_name,
        lastName  : user.last_name,
        email     : user.email
      });
    }
  },

  onUpdateSettingsCompleted: function(payload) {
    SessionActions.setUser(payload);

    this.trigger({
      feedback: 'Profile saved successfully.'
    });
  },

});

module.exports = ProfileSettingsStore;
