var Reflux         = require('reflux'),
    StoreFormMixin = require('../../mixins/StoreFormMixin'),
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
  }

});

module.exports = ProfileAuthenticationStore;
