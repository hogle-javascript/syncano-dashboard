import Reflux from 'reflux';

// Utils & Mixins
import {CheckListStore, WaitForStore, StoreHelpers} from '../../../mixins';

// Stores & Actions
import Actions from '../DevicesActions';
import SessionActions from '../../Session/SessionActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    CheckListStore,
    WaitForStore,
    StoreHelpers
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
  },

  getDevices(empty) {
    return this.data.items || empty || null;
  },

  setDevices(devices) {
    console.debug('PushNotificationsStore::setAPNsDevices');
    this.data.items = devices;
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  refreshData() {
    console.debug('PushNotificationsStore::refreshData');
    Actions.fetchAPNsDevices();
  },

  onFetchAPNsDevices() {
    console.debug('PushNotificationsStore::onFetchAPNsDevices');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchAPNsDevicesCompleted(devices) {
    console.debug('PushNotificationsStore::onFetchAPNsDevicesCompleted');
    let items = this.saveListFromSyncano(devices);

    this.setDevices(items);
  },

  onRemoveAPNsDevices() {
    console.debug('APNsDevicesStore::onRemoveAPNsDevices');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onRemoveAPNsDevicesCompleted() {
    console.debug('APNsDevicesStore::onRemoveAPNsDevicesCompleted');
    this.data.hideDialogs = true;
    this.data.isLoading = false;
    this.refreshData();
  }
});
