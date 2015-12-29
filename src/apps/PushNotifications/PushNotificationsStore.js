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
      devices: [],
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
    return this.data.devices || empty || null;
  },

  setDevices(devices) {
    console.debug('SchedulesStore::setSchedules');
    this.data.devices = devices;
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  refreshData(deviceType) {
    console.debug('SchedulesStore::refreshData');
    Actions.fetchDevices(deviceType);
  },

  onFetchDevices() {
    console.debug('SchedulesStore::onFetchSchedules');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchDevicesCompleted(devices) {
    console.debug('SchedulesStore::onFetchSchedulesCompleted');
    console.error(devices);
    Actions.setDevices(devices);
  }
});
