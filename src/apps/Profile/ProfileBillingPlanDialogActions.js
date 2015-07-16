var Reflux     = require('reflux'),

    Connection = require('../Session/Connection').get();

var ProfileBillingPlanDialogActions = Reflux.createActions({

  showDialog    : {},
  dismissDialog : {},
  fetch         : {},

  fetchBillingPlans: {
    asyncResult : true,
    loading     : true,
    children    : ['completed', 'failure']
  },

  subscribePlan: {
    asyncResult : true,
    loading     : true,
    children    : ['completed', 'failure']
  }

});

ProfileBillingPlanDialogActions.subscribePlan.listen((plan, payload) => {
  console.info('ProfileBillingPlanActions::fetchBillingUsage');
  Connection
    .Billing
    .subscribePlan(plan, payload)
    .then(completed)
    .catch(failure);
});

ProfileBillingPlanDialogActions.fetchBillingPlans.listen(function() {
  console.info('ProfileBillingPlanActions::fetchBillingUsage');
  Connection
    .Billing
    .getPlans()
    .then(this.completed)
    .catch(this.failure);
});

module.exports = ProfileBillingPlanDialogActions;