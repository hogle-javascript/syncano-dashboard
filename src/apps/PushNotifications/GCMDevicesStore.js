import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

// Stores & Actions
import Actions from './DevicesActions';
import SessionActions from '../Session/SessionActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    Mixins.CheckListStore,
    Mixins.WaitForStore
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

  getNumberOfChecked

  setDevices(devices) {
    console.debug('PushNotificationsStore::setGCMDevices');
    this.data.items = devices.map((device) => {
      device.id = device.registration_id;
      return device;
    });
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  refreshData() {
    console.debug('PushNotificationsStore::refreshData');
    Actions.fetchGCMDevices();
  },

  onFetchGCMDevices() {
    console.debug('PushNotificationsStore::onFetchGCMDevices');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchGCMDevicesCompleted(devices) {
    console.debug('PushNotificationsStore::onFetchGCMDevicesCompleted');
    this.setDevices(devices._items);
  }
});
