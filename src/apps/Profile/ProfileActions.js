var Reflux     = require('reflux'),
    Connection = require('../Session/Connection').get(),
    Stripe     = require('../../stripe');

var ProfileActions = Reflux.createActions({
  updateSettings: {
    asyncResult: true,
    asyncForm: true,
    children: ['completed', 'failure']
  },
  changePassword: {
    asyncResult: true,
    children: ['completed', 'failure']
  },
  fetchBillingProfile: {
    asyncResult: true,
    children: ['completed', 'failure']
  },
  updateBillingProfile: {
    asyncResult: true,
    asyncForm: true,
    children: ['completed', 'failure']
  },
  fetchBillingCard: {
    asyncResult: true,
    children: ['completed', 'failure']
  },
  updateBillingCard: {
    asyncResult: true,
    asyncForm: true,
    children: ['completed', 'failure']
  }
});

ProfileActions.updateSettings.listen(function(payload) {
  console.info('ProfileActions::updateSettings');
  Connection
    .Accounts
    .update({
      // jscs:disable
      first_name : payload.firstName,
      last_name  : payload.lastName
      // jscs:enable
    })
    .then(this.completed)
    .catch(this.failure);
});

ProfileActions.changePassword.listen(function(payload) {
  console.info('ProfileActions::changePassword');
  Connection
    .Accounts
    .changePassword({
      // jscs:disable
      current_password : payload.currentPassword,
      new_password     : payload.newPassword
      // jscs:enable
    })
    .then(this.completed)
    .catch(this.failure);
});

ProfileActions.fetchBillingProfile.listen(function() {
  console.info('ProfileActions::fetchBillingProfile');
  Connection
    .Billing
    .getProfile()
    .then(this.completed)
    .catch(this.failure);
});

ProfileActions.updateBillingProfile.listen(function(payload) {
  console.info('ProfileActions::updateBillingProfile');
  Connection
    .Billing
    .updateProfile(payload)
    .then(this.completed)
    .catch(this.failure);
});

ProfileActions.fetchBillingCard.listen(function() {
  console.info('ProfileActions::fetchBillingCard');
  Connection
    .Billing
    .getCard()
    .then(this.completed)
    .catch(this.failure);
});

ProfileActions.updateBillingCard.listen(function(payload) {
  console.info('ProfileActions::updateBillingCard');
  Stripe.card.createToken(payload, function(status, response) {
    if (response.error) {
      return this.failure(response.error);
    }

    Connection
      .Billing
      .updateCard(response.id)
      .then(this.completed)
      .catch(this.failure);
  }.bind(this));
});

module.exports = ProfileActions;
