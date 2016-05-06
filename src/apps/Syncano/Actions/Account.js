import Hello from '../../Account/Hello.js';

export default {
  resendActivationEmail(email) {
    this.NewLibConnection
      .Account
      .resendEmail(email)
      .then((err) => console.error(err))
      .catch((err) => console.error(err));
  },

  activate(payload) {
    this.Connection
      .Accounts
      .activate(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  passwordSignIn(payload) {
    this.Connection
      .connect(payload.email, payload.password)
      .then(this.completed)
      .catch(this.failure);
  },

  passwordSignUp(payload) {
    this.Connection
      .Accounts
      .create({
        email: payload.email,
        password: payload.password
      })
      .then(this.completed)
      .catch(this.failure);
  },

  passwordReset(email) {
    console.error('passwordReset');
    this.NewLibConnection
      .Account
      .resetPassword(email)
      .then(this.completed)
      .catch(this.failure);
  },

  passwordResetConfirm(payload) {
    console.error('passwordResetConfirm');
    this.Connection
      .Accounts
      .passwordResetConfirm(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  socialLogin(network) {
    Hello
      .login(network)
      .then((auth) => {
        this.Connection
          .socialConnect(
          auth.network,
          auth.authResponse.access_token
        )
          .then((payload) => {
            payload.network = network;
            return payload;
          })
          .then(this.completed)
          .catch(this.failure);
      });
  }
};
