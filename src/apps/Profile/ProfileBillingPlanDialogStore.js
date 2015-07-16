var Reflux            = require('reflux'),

    StoreFormMixin    = require('../../mixins/StoreFormMixin'),
    DialogStoreMixin  = require('../../mixins/DialogStoreMixin'),
    WaitForStoreMixin = require('../../mixins/WaitForStoreMixin'),

    SessionActions    = require('../Session/SessionActions'),
    Actions           = require('./ProfileBillingPlanDialogActions');

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
  },

  refreshData: function() {
    console.debug('ProfileBillingPlanDialogStore::refreshData');
    Actions.fetchBillingPlans();
  },

  setPlans: function(plans) {
    this.trigger({plan: plans[Object.keys(plans)[0]]});
  },

  onFetchBillingPlansCompleted: function(payload) {
    this.isLoading = false;
    this.setPlans(payload);
  },

});