import Reflux from 'reflux';
import Actions from './ProfileActions';
import {StoreHelpersMixin} from '../../mixins';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [StoreHelpersMixin],

  getInitialState() {
    return {
      isLoading: true,
      invoices: []
    };
  },

  onFetchInvoicesCompleted(invoices) {
    console.debug('ProfileBillingInvoicesStore::onFetchInvoicesCompleted');
    this.trigger({
      isLoading: false,
      invoices: this.saveListFromSyncano(invoices)
    });
  },

  onFetchInvoicesFailure() {
    console.debug('ProfileBillingInvoicesStore::onFetchInvoicesFailure');
    this.trigger({isLoading: false});
  }
});
