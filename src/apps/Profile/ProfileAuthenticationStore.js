var Reflux         = require('reflux'),

    StoreFormMixin = require('../../mixins/StoreFormMixin'),

    SessionStore   = require('../Session/SessionStore'),
    SessionActions = require('../Session/SessionActions'),
    ProfileActions = require('./ProfileActions');

var ProfileAuthenticationStore = Reflux.createStore({
  listenables: ProfileActions,
  mixins: [StoreFormMixin],

  init: function() {
    this.listenToForms();
  },

  onChangePasswordCompleted: function(payload) {
    this.trigger({
      feedback: 'Password changed successfully.',
      currentPassword: null,
      newPassword: null,
      confirmNewPassword: null
    });
  },

});

module.exports = ProfileAuthenticationStore;
