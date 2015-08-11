import Reflux from 'reflux';
import D from 'd.js';

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
      subscriptions: null,
      isReady: false,
      isLoading: true,
      chartLegend: {
        rows: [],
        showPercents: false
      }
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

    D.all([
      Actions.fetchBillingProfile(),
      Actions.fetchBillingUsage(),
      Actions.fetchBillingSubscriptions()
    ])
      .then(() => {
        this.data.isReady = true;
        this.data.isLoading = false;
        this.trigger(this.data);
      });
  },

  setProfile(profile) {
    this.data.profile = profile;
    this.data.soft_limit = profile.soft_limit;
    this.data.hard_limit = profile.hard_limit;
  },

  setUsage(usage) {
    this.data.usage = usage;
  },

  setSubscriptions(subscriptions) {
    this.data.subscriptions = subscriptions;
  },

  isPlanCanceled() {
    if (!this.data.subscriptions || this.data.subscriptions.length > 1) {
      return false;
    }
    return this.data.subscriptions._items[0].end || false;
  },

  isNewSubscription() {
    return (this.data.subscriptions && this.data.subscriptions.length > 1);
  },

  getBuilderLimits() {
    return {
      api: {included: '100000'},
      cbx: {included: '1000'}
    };
  },

  getPlan() {
    return this.data.profile.subscription.plan;
  },

  getPlanName() {
    const planDict = {
      builder: 'Builder',
      'paid-commitment': 'Production'
    };

    return planDict[this.getPlan()];
  },


  getLimitsData(subscription, plan) {
    if (plan === 'builder') {
      return this.getBuilderLimits();
    }

    let pricing = null;
    if (!subscription || subscription === 'default') {
      pricing = this.data.profile.subscription.pricing;
    } else {
      pricing = subscription.pricing;
    }

    return ({
      api: {
        included: pricing.api.included,
        overage: pricing.api.overage
      },
      cbx: {
        included: pricing.cbx.included,
        overage: pricing.cbx.overage
      }
    })
  },

  getCovered() {
    return _.reduce(this.data.profile.subscription.pricing, (r, v, k) => {
      let amount = v.included * v.overage;
      r.amount += amount;
      r[k] = _.extend({}, v, {amount: amount});
      return r;
    }, {amount: 0});
  },

  getOverage() {
    const covered = this.getCovered();
    let usageAmount = {'api': 0, 'cbx': 0};
    let columns = {'api': {}, 'cbx': {}};

    _.forEach(this.data.usage.objects, _usage => {
      if (columns[_usage.source] === undefined) {
        return;
      }

      let amount = pricing[_usage.source].overage * _usage.value;
      columns[_usage.source][_usage.date] = amount;
      usageAmount[_usage.source] += amount;
    });

    return _.reduce(this.data.profile.subscription.pricing, (r, v, k) => {
      let cover = covered[k];
      let amount = (usageAmount[k] > cover.amount) ? usageAmount[k] - cover.amount : 0;
      let included = _.round(amount / v.overage);

      r.amount += amount;
      r[k] = r[k] = _.extend({}, v, {amount, included});
      return r;
    }, {amount: 0});
  },

  getTotalPlanValue(subscription) {
    let commitment = null;
    if (!subscription || subscription === 'default') {
      commitment = this.data.profile.subscription.commitment;
    } else {
      commitment = subscription.commitment;
    }

    return parseInt(commitment.api, 10) + parseInt(commitment.cbx, 10);
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
  },

  setChartLegend(payload) {
    this.data.chartLegend = payload;
    this.trigger(this.data);
  }
});
