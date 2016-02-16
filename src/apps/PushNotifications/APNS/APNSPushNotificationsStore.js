import Reflux from 'reflux';

// Utils & Mixins
import {WaitForStoreMixin, StoreLoadingMixin} from '../../../mixins';

// Stores & Actions
import Actions from './APNSPushNotificationsActions';
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
    Actions.fetchAPNSPushNotificationConfig();
  },

  hasConfig() {
    const items = this.data.items;

    if (items.length > 0) {
      return items[0].development_certificate || items[0].production_certificate;
    }

    return false;
  },

  onFetchAPNSPushNotificationConfigCompleted(items) {
    console.debug('APNSPushNotificationsStore::onFetchAPNSPushNotificationConfigCompleted');
    this.data.items = [items];
    this.trigger(this.data);
  }
});
