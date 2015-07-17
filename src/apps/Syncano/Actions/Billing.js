export default {
  getProfile() {
    this.Connection
      .Billing
      .getProfile()
      .then(this.completed)
      .catch(this.failure);
  },

  updateProfile(payload) {
    this.Connection
      .Billing
      .updateProfile(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  getCard() {
    this.Connection
      .Billing
      .getCard()
      .then(this.completed)
      .catch(this.failure);
  },

  updateCard(payload) {
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

  listInvoices() {
    this.Connection
      .Billing
      .getInvoices()
      .then(this.completed)
      .catch(this.failure);
  }
};
