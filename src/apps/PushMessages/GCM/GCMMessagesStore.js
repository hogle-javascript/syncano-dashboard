import Reflux from 'reflux';

// Utils & Mixins
import { WaitForStoreMixin, StoreLoadingMixin } from '../../../mixins';

// Stores & Actions
import Actions from './GCMMessagesActions';
import SessionActions from '../../Session/SessionActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    WaitForStoreMixin,
    StoreLoadingMixin
  ],

  getInitialState() {
    return {
      items: [],
      isLoading: true
    };
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setInstance,
      this.refreshData
    );
    this.setLoadingStates();
  },

  refreshData() {
    console.debug('APNSMessagesStore::refreshData');
    Actions.fetchMessages();
  },

  onFetchMessagesCompleted(messages) {
    console.debug('GCMMessagesStore::onFetchGCMMessagesCompleted');
    this.data.items = messages;
    this.trigger(this.data);
  }
});
