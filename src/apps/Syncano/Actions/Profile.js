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
        current_password : payload.currentPassword,
        new_password     : payload.newPassword
      })
      .then(this.completed)
      .catch(this.failure);
  },

  fetchUser(token) {
    this.Connection
      .setApiKey(token)
      .Accounts
      .get()
      .then(this.completed)
      .catch(this.failure)
  },

  resetKey() {
    this.Connection
      .Accounts
      .resetKey()
      .then(this.completed)
      .catch(this.failure);
  },

  // Billing
  fetchBillingProfile() {
    this.Connection
      .Billing
      .getProfile()
      .then(this.completed)
      .catch(this.failure);
  },

  updateBillingProfile(payload) {
    this.Connection
      .Billing
      .updateProfile(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  fetchBillingCard() {
    this.Connection
      .Billing
      .getCard()
      .then(this.completed)
      .catch(this.failure);
  },

  updateBillingCard(payload) {
    Stripe.card.createToken(payload, (status, response) => {
      if (response.error) {
        return this.failure(response.error);
      }
      this.Connection
        .Billing
        .updateCard(response.id)
        .then(this.completed)
        .catch(this.failure);
    });
  },

  fetchInvoices() {
    this.Connection
      .Billing
      .getInvoices()
      .then(this.completed)
      .catch(this.failure);
  }
};
