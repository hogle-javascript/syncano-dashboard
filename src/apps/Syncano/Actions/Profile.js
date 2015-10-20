export default {
  updateSettings(payload) {
    this.Connection
      .Accounts
      .update({
        first_name: payload.firstName,
        last_name: payload.lastName
      })
      .then(this.completed)
      .catch(this.failure);
  },

  changePassword(payload) {
    this.Connection
      .Accounts
      .changePassword({
        current_password: payload.current_password,
        new_password: payload.newPassword
      })
      .then(this.completed)
      .catch(this.failure);
  },

  getUser(token) {
    this.Connection
      .setApiKey(token)
      .Accounts
      .get()
      .then(this.completed)
      .catch(this.failure);
  },

  resetKey() {
    this.Connection
      .Accounts
      .resetKey()
      .then(this.completed)
      .catch(this.failure);
  }
};
