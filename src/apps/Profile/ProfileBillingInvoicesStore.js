var Reflux         = require('reflux'),
    ProfileActions = require('./ProfileActions');

var ProfileBillingInvoicesStore = Reflux.createStore({
  listenables: ProfileActions,

  getInitialState: function() {
    return {
      isLoading: true,
      invoices: []
    }
  },

  onFetchInvoicesCompleted: function(invoices) {
    console.debug('ProfileBillingInvoicesStore::onFetchInvoicesCompleted');

    invoices = Object.keys(invoices).map(function(key) {
      return invoices[key];
    });

    this.trigger({
      isLoading: false,
      invoices: invoices
    });
  },

  onFetchInvoicesFailure: function() {
    console.debug('ProfileBillingInvoicesStore::onFetchInvoicesFailure');
    this.trigger({isLoading: false});
  }

});

module.exports = ProfileBillingInvoicesStore;
