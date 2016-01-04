import Reflux from 'reflux';

// Utils & Mixins
import {CheckListStore, WaitForStore, StoreHelpers, StoreLoading} from '../../../mixins';

// Stores & Actions
import Actions from '../DevicesActions';
import SessionActions from '../../Session/SessionActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    CheckListStore,
    WaitForStore,
    StoreHelpers,
    StoreLoading
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

  getDevices(empty) {
    return this.data.items || empty || null;
  },

  setDevices(devices) {
    console.debug('PushNotificationsStore::setAPNsDevices');
    this.data.items = devices;
    this.trigger(this.data);
  },

  refreshData() {
    console.debug('PushNotificationsStore::refreshData');
    Actions.fetchAPNsDevices();
  },

  onFetchAPNsDevicesCompleted(devices) {
    console.debug('PushNotificationsStore::onFetchAPNsDevicesCompleted');
    let items = this.saveListFromSyncano(devices);

    this.setDevices(items);
  },

  onRemoveAPNsDevicesCompleted() {
    console.debug('APNsDevicesStore::onRemoveAPNsDevicesCompleted');
    this.data.hideDialogs = true;
    this.refreshData();
  }
});
