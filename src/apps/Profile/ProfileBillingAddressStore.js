var Reflux         = require('reflux'),

    StoreFormMixin = require('../../mixins/StoreFormMixin'),

    ProfileActions = require('./ProfileActions');

var ProfileBillingAddressStore = Reflux.createStore({
  listenables: ProfileActions,
  mixins: [StoreFormMixin],

  init: function() {
    this.listenToForms();
  },

  onFetchBillingProfileCompleted: function(payload) {
    this.trigger(payload);
  },

  onUpdateBillingProfileCompleted: function() {
    this.trigger({feedback: 'Billing address changed successfully.'});
  }

});

module.exports = ProfileBillingAddressStore;
