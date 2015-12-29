import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

// Stores & Actions
import Actions from './PushNotificationsActions';
import SessionActions from '../Session/SessionActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    Mixins.CheckListStore,
    Mixins.WaitForStore
  ],

  getInitialState() {
    return {
      gcmDevices: [],
      apnsDevices: [],
      isLoading: true
    };
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setInstance,
      this.refreshData
    );
  },

  getGCMDevices(empty) {
    return this.data.gcmDevices || empty || null;
  },

  getAPNsDevices(empty) {
    return this.data.apnsDevices || empty || null;
  },

  setGCMDevices(devices) {
    console.debug('PushNotificationsStore::setGCMDevices');
    this.data.gcmDevices = devices;
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  setAPNsDevices(devices) {
    console.debug('PushNotificationsStore::setAPNsDevices');
    this.data.apnsDevices = devices;
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  refreshData() {
    console.debug('PushNotificationsStore::refreshData');
    Actions.fetchGCMDevices();
    Actions.fetchAPnsDevices();
  },

  onFetchGCMDevices() {
    console.debug('PushNotificationsStore::onFetchGCMDevices');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchGCMDevicesCompleted(devices) {
    console.debug('PushNotificationsStore::onFetchGCMDevicesCompleted');
    console.error(devices);
    Actions.setGCMDevices(devices._items);
  },

  onFetchAPNsDevices() {
    console.debug('PushNotificationsStore::onFetchAPNsDevices');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchAPNsDevicesCompleted(devices) {
    console.debug('PushNotificationsStore::onFetchAPNsDevicesCompleted');
    Actions.setAPNsDevices(devices._items);
  }
});
