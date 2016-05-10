export default {
  updateSettings(payload) {
    this.NewLibConnection
      .Account
      .update({
        first_name: payload.firstName,
        last_name: payload.lastName
      })
      .then(this.completed)
      .catch(this.failure);
  },

  changePassword(payload) {
    this.NewLibConnection
      .Account
      .changePassword({
        current_password: payload.current_password,
        new_password: payload.newPassword
      })
      .then(this.completed)
      .catch(this.failure);
  },

  setPassword(password) {
    this.NewLibConnection
      .Account
      .setPassword({password})
      .then(this.completed)
      .catch(this.failure);
  },

  getUser(token) {
    this.NewLibConnection.setAccountKey(token);
    this.Connection
      .setApiKey(token)
      .Accounts
      .get()
      .then(this.completed)
      .catch(this.failure);
  },

  resetKey() {
    this.NewLibConnection
      .Account
      .resetKey()
      .then(this.completed)
      .catch(this.failure);
  }
};
