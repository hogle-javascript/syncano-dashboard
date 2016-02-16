import Reflux from 'reflux';

// Utils & Mixins
import {WaitForStoreMixin, StoreLoadingMixin} from '../../../mixins';

// Stores & Actions
import Actions from './GCMPushNotificationsActions';
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
    Actions.fetchGCMPushNotificationConfig();
  },

  hasConfig() {
    const items = this.data.items;

    if (items.length > 0) {
      return items[0].development_api_key || items[0].production_api_key;
    }

    return false;
  },

  onFetchGCMPushNotificationConfigCompleted(items) {
    console.debug('GCMPushNotificationsStore::onFetchGCMPushNotificationConfigCompleted');
    this.data.items = [items];
    this.trigger(this.data);
  }
});
