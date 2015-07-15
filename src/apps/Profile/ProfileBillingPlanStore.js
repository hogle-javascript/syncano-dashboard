var Reflux         = require('reflux'),

    StoreFormMixin = require('../../mixins/StoreFormMixin'),

    ProfileBillingPlanActions = require('./ProfileBillingPlanActions');

var ProfileBillingPlanStore = Reflux.createStore({
  listenables: ProfileBillingPlanActions,
  mixins: [StoreFormMixin],

  init: function() {
    this.listenToForms();
  },

  //onFetchBillingProfileCompleted: function(payload) {
  //  this.trigger(payload);
  //},
  //
  //onUpdateBillingProfileCompleted: function() {
  //  this.trigger({feedback: 'Billing address changed successfully.'});
  //}

});

module.exports = ProfileBillingPlanStore;
