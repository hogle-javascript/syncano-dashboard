import Reflux from 'reflux';

// Utils & Mixins
import {CheckListStore, WaitForStore, StoreHelpers, StoreLoading} from '../../../mixins';

// Stores & Actions
import Actions from './APNSDevicesActions';
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

  setDevices(devices) {
    console.debug('PushNotificationsStore::setDevices');
    this.data.items = devices;
    this.trigger(this.data);
  },

  refreshData() {
    console.debug('PushNotificationsStore::refreshData');
    Actions.fetchDevices();
  },

  onFetchDevicesCompleted(devices) {
    console.debug('PushNotificationsStore::onFetchDevicesCompleted');
    let items = this.saveListFromSyncano(devices);

    Actions.setDevices(items);
  },

  onRemoveDevicesCompleted() {
    console.debug('APNSDevicesStore::onRemoveDevicesCompleted');
    this.refreshData();
  }
});
