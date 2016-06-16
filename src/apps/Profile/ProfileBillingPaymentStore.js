import Reflux from 'reflux';

import {StoreFormMixin} from '../../mixins';

import Actions from './ProfileActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [StoreFormMixin],

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
    this.listenToForms();
  },

  onFetchBillingCardCompleted(payload) {
    this.trigger({
      isLoading: false,
      card: payload
    });
  },

  onFetchBillingCardFailure() {
    this.trigger({isLoading: false});
  },

  setCard(card) {
    let state = this.getInitialState();

    state.card = card;
    state.isLoading = false;
    this.trigger(state);
  },

  onUpdateBillingCardCompleted(payload) {
    this.setCard(payload);
  },

  onAddBillingCardCompleted(payload) {
    this.setCard(payload);
  }
});
