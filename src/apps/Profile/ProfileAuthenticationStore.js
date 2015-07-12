var Reflux         = require('reflux'),

    StoreFormMixin = require('../../mixins/StoreFormMixin'),

    SessionStore   = require('../Session/SessionStore'),
    SessionActions = require('../Session/SessionActions'),

    ProfileActions = require('./ProfileActions');

var ProfileAuthenticationStore = Reflux.createStore({
  listenables: ProfileActions,
  mixins: [StoreFormMixin],

  getInitialState: function() {
    var account_key = SessionStore.getUser({}).account_key;
    return {
      isLoading: account_key === undefined,
      account_key: account_key
    }
  },

  init: function() {
    this.listenToForms();
    this.listenTo(SessionActions.setUser, this.setUser);
  },

  setUser: function() {
    this.trigger({
      isLoading: false,
      account_key: SessionStore.getUser({}).account_key
    });
  },

  onResetKeyCompleted: function(payload) {
    SessionActions.setUser(payload);
  },

  onChangePasswordCompleted: function(payload) {
    this.trigger({
      feedback: 'Password changed successfully.',
      currentPassword: null,
      newPassword: null,
      confirmNewPassword: null
    });
  }

});

module.exports = ProfileAuthenticationStore;
