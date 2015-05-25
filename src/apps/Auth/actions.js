var AppDispatcher = require('../../dispatcher/AppDispatcher');

module.exports = {

  registerAccount: function (data) {
    AppDispatcher.handleAuthAction({
      type: 'REGISTER_ACCOUNT',
      data: data,
    });
  },

  passwordSignIn: function (data) {
    AppDispatcher.handleAuthAction({
      type: 'PASSWORD_SIGN_IN',
      data: data,
    });
  },

  facebookSignIn: function (token) {
    AppDispatcher.handleAuthAction({
      type: 'FACEBOOK_SIGN_IN',
      token: token,
    });
  },

  googleSignIn: function (token) {
    AppDispatcher.handleAuthAction({
      type: 'GOOGLE_SIGN_IN',
      token: token,
    });
  },

  githubSignIn: function (token) {
    AppDispatcher.handleAuthAction({
      type: 'GITHUB_SIGN_IN',
      token: token,
    });
  },

  logOut: function () {
    AppDispatcher.handleAuthAction({
      type: 'LOGOUT',
    });
  },


};