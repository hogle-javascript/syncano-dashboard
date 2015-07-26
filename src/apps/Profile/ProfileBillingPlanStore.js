import Reflux from 'reflux';

import StoreFormMixin from '../../mixins/StoreFormMixin';
import WaitForStoreMixin from '../../mixins/WaitForStoreMixin';

import SessionActions from '../Session/SessionActions';
import Actions from './ProfileBillingPlanActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    WaitForStoreMixin
  ],

  getInitialState() {
    return {
      profile   : null,
      usage     : null,
      isLoading : true
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
    this.data.profile    = profile;
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

});
