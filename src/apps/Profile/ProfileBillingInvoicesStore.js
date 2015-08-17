import Reflux from 'reflux';
import Actions from './ProfileActions';

export default Reflux.createStore({
  listenables: Actions,

  getInitialState() {
    return {
      isLoading: true,
      invoices: []
    }
  },

  onFetchInvoicesCompleted(invoices) {
    console.debug('ProfileBillingInvoicesStore::onFetchInvoicesCompleted');

    invoices = Object.keys(invoices).map((key) => invoices[key]);
    this.trigger({
      isLoading: false,
      invoices: invoices
    });
  },

  onFetchInvoicesFailure() {
    console.debug('ProfileBillingInvoicesStore::onFetchInvoicesFailure');
    this.trigger({isLoading: false});
  }
});
