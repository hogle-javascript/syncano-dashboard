import Reflux from 'reflux';
import moment from 'moment';
import _ from 'lodash';

import { StoreLoadingMixin } from '../../mixins';

import Actions from './ProfileBillingPlanActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    StoreLoadingMixin
  ],

  getInitialState() {
    return {
      profile: null,
      usage: null,
      overage: {
        amount: 0
      },
      subscriptions: null,
      isReady: false,
      isLoading: true,
      chartLegend: {
        rows: [],
        showPercents: false
      }
    };
  },

  init() {
    this.data = this.getInitialState();
    this.setLoadingStates();
  },

  clearData() {
    this.data = this.getInitialState();
    this.trigger(this.data);
  },

  refreshData() {
    console.debug('ProfileBillingPlanStore::refreshData');

    const join = this.joinTrailing(
      Actions.fetchBillingProfile.completed,
      Actions.fetchBillingSubscriptions.completed,
      () => {
        join.stop();
        this.data.isReady = true;
        this.data.isLoading = false;
        this.trigger(this.data);
      }
    );

    Actions.fetchBillingProfile();
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
  },

  setSubscriptions(subscriptions) {
    this.data.subscriptions = subscriptions;
  },

  getActiveSubscriptionEndDate() {
    const activeSubscription = _.last(this.data.subscriptions);

    return activeSubscription && activeSubscription.end;
  },

  isNewSubscription() {
    const { subscriptions } = this.data;
    const lastSubscription = _.last(subscriptions);

    if (!subscriptions || subscriptions.length < 3) {
      return false;
    }

    if (_.isString(lastSubscription.start) && !_.isString(lastSubscription.end)) {
      return true;
    }

    return false;
  },

  isNewSubscriptionSame() {
    const { subscriptions } = this.data;

    if (!subscriptions || !this.isNewSubscription()) {
      return false;
    }

    const newPricing = _.last(subscriptions).pricing;
    const pricing = _.nth(subscriptions, -2).pricing;

    if (newPricing.api.included === pricing.api.included && newPricing.cbx.included === pricing.cbx.included) {
      return true;
    }

    return false;
  },

  isNewSubscriptionVisible() {
    return (this.isNewSubscription() && !this.isNewSubscriptionSame());
  },

  isPlanCanceled() {
    const { subscriptions } = this.data;
    const lastSubscription = _.last(subscriptions);

    if (this.isNewSubscription() || !subscriptions) {
      return false;
    }

    if (_.isString(lastSubscription.start) && _.isString(lastSubscription.end)) {
      return true;
    }

    return false;
  },

  getBuilderLimits() {
    return {
      api: { included: '100000' },
      cbx: { included: '20000' }
    };
  },

  getPlan() {
    if (!this.data.profile || !this.data.profile.subscription) {
      return null;
    }

    return this.data.profile.subscription.plan;
  },

  getPlanName() {
    const planDict = {
      builder: 'Builder',
      'paid-commitment': 'Production',
      free: 'Free'
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
    });
  },

  getCovered() {
    let subscription = this.data.profile.subscription;
    let today = new Date();
    let desiredStart = moment(new Date(today.getFullYear(), today.getMonth(), 1));
    let start = moment(subscription.start);
    let covered = _.reduce(subscription.pricing, (result, value, key) => {
      let amount = value.included * value.overage;

      result.amount += amount;
      result[key] = _.extend({}, value, { amount });
      return result;
    }, { amount: 0 });

    if (start.isAfter(desiredStart, 'day') && start.isSame(desiredStart, 'month')) {
      let currentDate = start.get('date');
      let endDate = moment(start._i, 'YYYY-MM-DD').daysInMonth();
      let diff = endDate - currentDate + 1;

      covered.amount *= diff / endDate;
    }

    return covered;
  },

  setOverage(payload) {
    this.data.overage = payload;
    this.trigger(this.data);
  },

  getOverage() {
    return this.data.overage;
  },

  getTotalPlanValue(subscription) {
    let commitment = null;

    if (!subscription || subscription === 'default') {
      commitment = this.data.profile.subscription.commitment;
    } else {
      commitment = subscription.commitment;
    }

    if (_.isString(commitment)) {
      // Workaround for SYNCORE-851
      commitment = commitment.replace(/u'/g, "'").replace(/'/g, '"');
      commitment = JSON.parse(commitment);
    }

    return parseInt(commitment.api, 10) + parseInt(commitment.cbx, 10);
  },

  onFetchBillingProfileCompleted(payload) {
    this.setProfile(payload);
  },

  onFetchBillingSubscriptionsCompleted(payload) {
    this.setSubscriptions(payload);
  },

  onCancelSubscriptionsCompleted() {
    this.data.hideDialogs = true;
    this.refreshData();
  },

  onSubscribePlanCompleted() {
    this.data.hideDialogs = true;
    this.refreshData();
  },

  onUpdateBillingProfileCompleted(payload) {
    this.setProfile(payload);
  },

  setChartLegend(payload) {
    this.data.chartLegend = payload;
    this.trigger(this.data);
  }
});
