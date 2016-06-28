import Reflux from 'reflux';
import { StoreFormMixin, StoreLoadingMixin, WaitForStoreMixin } from '../../mixins';
import Actions from './ProfileActions';
import SessionActions from '../Session/SessionActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    StoreFormMixin,
    StoreLoadingMixin,
    WaitForStoreMixin
  ],

  getInitialState() {
    return {
      showForm: false,
      show_form: false,
      isLoading: true,
      card: {},
      number: null,
      cvc: null,
      exp_month: null,
      exp_year: null
    };
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      SessionActions.setInstance,
      this.refreshData
    );
    this.setLoadingStates();
    this.listenToForms();
  },

  refreshData() {
    console.debug('AdminsStore::refreshData');
    Actions.fetchBillingCard();
  },

  setCard(card) {
    this.data.card = card;
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onFetchBillingCardCompleted(payload) {
    this.setCard(payload);
  },

  onFetchBillingCardFailure() {
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onUpdateBillingCardCompleted(payload) {
    this.setCard(payload);
  },

  onAddBillingCardCompleted(payload) {
    this.setCard(payload);
  },

  onDeleteBillingCardCompleted() {
    this.data = this.getInitialState();
    this.refreshData();
    this.trigger(this.data);
  }
});
