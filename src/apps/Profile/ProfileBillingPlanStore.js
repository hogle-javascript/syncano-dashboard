import Reflux from 'reflux';

import Mixins from '../../mixins';

import SessionActions from '../Session/SessionActions';
import Actions from './ProfileBillingPlanActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    Mixins.WaitForStore
  ],

  getInitialState() {
    return {
      profile: null,
      usage: null,
      isLoading: true
    }
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      this.refreshData
    );
  },

  refreshData() {
    console.debug('ClassesStore::refreshData');
    Actions.fetchBillingProfile();
    Actions.fetchBillingUsage();
    Actions.fetchBillingSubscriptions();
  },

  setProfile(profile) {
    this.data.profile = profile;
    this.data.soft_limit = profile.soft_limit;
    this.data.hard_limit = profile.hard_limit;
    this.trigger(this.data);
  },

  setUsage(usage) {
    this.data.usage = usage;
    this.trigger(this.data);
  },

  setSubscriptions(subscriptions) {
    this.data.subscriptions = subscriptions;
    this.trigger(this.data);
  },

  isPlanCanceled() {
    if (!this.data.subscriptions || this.data.subscriptions.length > 1) {
      return false;
    }
    return this.data.subscriptions._items[0].end || false;
  },

  onFetchBillingProfileCompleted(payload) {
    this.data.isLoading = false;
    this.setProfile(payload);
  },

  onFetchBillingUsageCompleted(payload) {
    this.data.isLoading = false;
    this.setUsage(payload);
  },

  onFetchBillingSubscriptionsCompleted(payload) {
    this.data.isLoading = false;
    this.setSubscriptions(payload);
  },

  onCancelSubscriptionsCompleted(payload) {
    this.data.isLoading = false;
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onCancelNewPlanCompleted() {
    this.data.isLoading = false;
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onSubscribePlanCompleted() {
    this.data.isLoading = false;
    this.data.hideDialogs = true;
    this.refreshData();
  }
});
