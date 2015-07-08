var Reflux         = require('reflux'),

    StoreFormMixin = require('../../mixins/StoreFormMixin'),

    ProfileActions = require('./ProfileActions');

var ProfileBillingPaymentStore = Reflux.createStore({
  listenables: ProfileActions,
  mixins: [StoreFormMixin],

  getInitialState: function() {
    return {
      showForm: false,
      show_form: false,
      isLoading: true,
      card: {},
      number: null,
      cvc: null,
      exp_month: null,
      exp_year: null
    }
  },

  init: function() {
    this.listenToForms();
  },

  onFetchBillingCardCompleted: function(payload) {
    this.trigger({
      isLoading: false,
      card: payload
    });
  },

  onFetchBillingCardFailure: function() {
    this.trigger({isLoading: false});
  },

  onUpdateBillingCardCompleted: function(payload) {
    var state = this.getInitialState();
    state.card      = payload;
    state.isLoading = false;
    this.trigger(state);
  }

});

module.exports = ProfileBillingPaymentStore;
