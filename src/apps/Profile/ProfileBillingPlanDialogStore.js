var Reflux            = require('reflux'),

    StoreFormMixin    = require('../../mixins/StoreFormMixin'),
    DialogStoreMixin  = require('../../mixins/DialogStoreMixin'),
    WaitForStoreMixin = require('../../mixins/WaitForStoreMixin'),

    SessionActions     = require('../Session/SessionActions'),
    BillingPlanActions = require('./ProfileBillingPlanActions'),
    Actions            = require('./ProfileBillingPlanDialogActions');

module.exports = Reflux.createStore({
  listenables: Actions,
  mixins: [
    StoreFormMixin,
    DialogStoreMixin,
    WaitForStoreMixin,
  ],

  init: function() {
    this.waitFor(
      SessionActions.setUser,
      this.refreshData
    );
    this.listenToForms();
  },

  refreshData: function() {
    console.debug('ProfileBillingPlanDialogStore::refreshData');
    Actions.fetchBillingPlans();
    Actions.fetchBillingSubscriptions();
  },

  setPlans: function(plans) {
    this.trigger({plan: plans[Object.keys(plans)[0]]});
  },

  onFetchBillingPlansCompleted: function(payload) {
    this.isLoading = false;
    this.setPlans(payload);
  },

  onFetchBillingCardCompleted: function(payload) {
    this.trigger({
      isLoading: false,
      card: payload
    });
  },

  onFetchBillingCardFailure: function() {
    this.trigger({
      isLoading: false,
      card: null,
    });
  },

  onSubscribePlanCompleted() {
    this.dismissDialog();
    BillingPlanActions.fetch();
  }

});
