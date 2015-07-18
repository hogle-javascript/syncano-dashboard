var Reflux            = require('reflux'),

    StoreFormMixin    = require('../../mixins/StoreFormMixin'),
    WaitForStoreMixin = require('../../mixins/WaitForStoreMixin'),

    SessionActions    = require('../Session/SessionActions'),
    Actions           = require('./ProfileBillingPlanActions');

var ProfileBillingPlanStore = Reflux.createStore({
  listenables: Actions,
  mixins: [
    WaitForStoreMixin
  ],

  getInitialState: function() {
    return {
      profile   : null,
      usage     : null,
      isLoading : true
    }
  },

  init: function() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      this.refreshData
    );
  },

  refreshData: function() {
    console.debug('ClassesStore::refreshData');
    Actions.fetchBillingProfile();
    Actions.fetchBillingUsage();
    Actions.fetchBillingSubscriptions();
  },

  setProfile: function(profile) {
    this.data.profile = profile;
    this.trigger(this.data);
  },

  setUsage: function(usage) {
    this.data.usage = usage;
    this.trigger(this.data);
  },

  setSubscriptions: function(subscriptions) {
    this.data.subscriptions = subscriptions;
    this.trigger(this.data);
  },

  onFetchBillingProfileCompleted: function(payload) {
    this.data.isLoading = false;
    this.setProfile(payload);
  },

  onFetchBillingUsageCompleted: function(payload) {
    this.data.isLoading = false;
    this.setUsage(payload);
  },
  onFetchBillingSubscriptionsCompleted: function(payload) {
    this.data.isLoading = false;
    this.setSubscriptions(payload);
  },
  onCancelSubscriptionsCompleted: function(payload) {
    this.data.isLoading = false;
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

});

module.exports = ProfileBillingPlanStore;
