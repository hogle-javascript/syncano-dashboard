import Stripe from '../../../stripe';
import _ from 'lodash';

export default {
  getProfile() {
    return this.Connection
            .Billing
            .getProfile()
            .then(this.completed)
            .catch(this.failure);
  },

  updateProfile(payload) {
    return this.Connection
            .Billing
            .updateProfile(payload)
            .then(this.completed)
            .catch(this.failure);
  },

  getCard() {
    return this.Connection
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
      return this.Connection
              .Billing
              .updateCard(response.id)
              .then(this.completed)
              .catch(this.failure);
    });
  },

  listInvoices(params = {}) {
    _.defaults(params, {ordering: 'desc'});
    return this.Connection
            .Billing
            .getInvoices(params)
            .then(this.completed)
            .catch(this.failure);
  },

  subscribePlan(plan, payload) {
    return this.Connection
            .Billing
            .subscribePlan(plan, payload)
            .then(this.completed)
            .catch(this.failure);
  },

  cancelNewPlan(subscriptions) {
    const currentPlan = subscriptions[0];

    this.Connection
      .Billing
      .cancelSubscription(subscriptions[1].id)
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

  listPlans(params = {}) {
    _.defaults(params, {ordering: 'desc'});
    this.Connection
      .Billing
      .getPlans(params)
      .then(this.completed)
      .catch(this.failure);
  },

  listSubscriptions(params = {}) {
    _.defaults(params, {ordering: 'desc'});
    this.Connection
      .Billing
      .getSubscriptions(params)
      .then(this.completed)
      .catch(this.failure);
  },

  cancelSubscriptions(ids) {
    const promises = ids.map((id) => this.Connection.Billing.cancelSubscription(id));

    return this.Promise.all(promises)
            .then(this.completed)
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
