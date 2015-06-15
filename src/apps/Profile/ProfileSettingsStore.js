var Reflux         = require('reflux'),

    SessionStore   = require('../Session/SessionStore')
    ProfileActions = require('./ProfileActions');


var ProfileSettingsStore = Reflux.createStore({
  listenables: ProfileActions,

  getInitialState: function () {
    return {
      errors    : {},
      firstName : null,
      lastName  : null,
      email     : null,
      feedback  : null,
      canSubmit : true
    }
  },

  init: function () {
    this.errors    = {};
    this.firstName = null;
    this.lastName  = null;
    this.email     = null;
    this.feedback  = null;
    this.canSubmit = true;

    this.listenTo(SessionStore, this.checkSession);
  },

  checkSession: function (Session) {
    if (Session.isReady()) {
      this.firstName = Session.user.first_name;
      this.lastName  = Session.user.last_name;
      this.email     = Session.user.email;
      this.trigger(this);
    }
  },

  onUpdateSettings: function () {
    this.trigger({canSubmit: false});
  },

  onUpdateSettingsCompleted: function (payload) {
    this.errors    = {};
    this.canSubmit = true;
    this.feedback  = 'Profile saved successfully.'
    this.trigger(this);
  },

  onUpdateSettingsFailure: function (payload) {
    this.errors    = {};
    this.canSubmit = true;
    this.feedback  = null;

    if (typeof payload === 'string') {
      this.errors.feedback = payload;
    } else {
      if (payload.non_field_errors !== undefined) {
        this.errors.feedback = payload.non_field_errors.join();
      }

      for (var field in payload) {
        this.errors[field] = payload[field];
      }
    }

    this.trigger(this);
  }

});

module.exports = ProfileSettingsStore;