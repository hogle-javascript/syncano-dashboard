import Stripe from '../../../stripe';

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
  },

  subscribePlan(plan, payload) {
    this.Connection
      .Billing
      .subscribePlan(plan, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  cancelNewPlan(subscriptions) {
    let currentPlan = subscriptions[0];

    this.Connection.
      Billing.cancelSubscription(subscriptions[1].id)
      .then(
      this.Connection
        .Billing
        .subscribePlan(currentPlan.plan, {
          commitment: JSON.stringify({
            api: currentPlan.commitment.api,
            cbx: currentPlan.commitment.cbx
          })
        })
        .then(this.completed)
        .catch(this.failure)
    )
      .catch(this.failure);
  },

  listPlans() {
    this.Connection
      .Billing
      .getPlans()
      .then(this.completed)
      .catch(this.failure);
  },

  listSubscriptions() {
    this.Connection
      .Billing
      .getSubscriptions()
      .then(this.completed)
      .catch(this.failure);
  },

  cancelSubscriptions(ids) {
    let promises = ids.map((id) => this.Connection.Billing.cancelSubscription(id));

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  getUsage() {
    this.Connection
      .Billing
      .getUsage()
      .then(this.completed)
      .catch(this.failure);
  }
};
