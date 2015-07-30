import Reflux from 'reflux';

import Mixins from '../../mixins';

import SessionActions from '../Session/SessionActions';
import BillingPlanActions from './ProfileBillingPlanActions';
import Actions from './ProfileBillingPlanDialogActions';

module.exports = Reflux.createStore({
  listenables: Actions,
  mixins: [
    Mixins.StoreForm,
    Mixins.DialogStore,
    Mixins.WaitForStore
  ],

  init() {
    this.waitFor(
      SessionActions.setUser,
      this.refreshData
    );
    this.listenToForms();
  },

  refreshData() {
    console.debug('ProfileBillingPlanDialogStore::refreshData');
    Actions.fetchBillingPlans();
    Actions.fetchBillingSubscriptions();
  },

  setPlans(plans) {
    this.trigger({plan: plans[Object.keys(plans)[0]]});
  },

  onFetchBillingPlansCompleted(payload) {
    this.isLoading = false;
    this.setPlans(payload);
  },

  onFetchBillingCardCompleted(payload) {
    this.trigger({
      isLoading: false,
      card: payload
    });
  },

  onFetchBillingCardFailure() {
    this.trigger({
      isLoading: false,
      card: null
    });
  },

  onSubscribePlanCompleted() {
    this.dismissDialog();
    BillingPlanActions.fetch();
  }
});
