var Reflux     = require('reflux'),
    Syncano    = require('../Session/Connection'),
    Connection = Syncano.get(),
    D          = Syncano.D;

var ProfileBillingPlanActions = Reflux.createActions({
  fetch: {},
  setBillingPlan: {},
  fetchBillingProfile: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure']
  },
  fetchBillingUsage: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure']
  },

});

ProfileBillingPlanActions.fetchBillingProfile.listen(function() {
  console.info('ProfileBillingPlanActions::fetchBillingProfile');
  Connection
    .Billing
    .getProfile()
    .then(this.completed)
    .catch(this.failure);
});

ProfileBillingPlanActions.fetchBillingUsage.listen(function() {
  console.info('ProfileBillingPlanActions::fetchBillingUsage');
  Connection
    .Billing
    .getUsage()
    .then(this.completed)
    .catch(this.failure);
});

module.exports = ProfileBillingPlanActions;
