import Reflux from 'reflux';

// Utils & Mixins
import {StoreForm, DialogStore, StoreLoading} from '../../mixins';

// Stores & Actions
import Actions from './DevicesActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    StoreForm,
    DialogStore,
    StoreLoading
  ],

  getInitialState() {
    return {
      label: null,
      user_id: null,
      registration_id: null,
      device_id: null,
      is_active: true
    };
  },

  init() {
    this.data = this.getInitialState();
    this.listenToForms();
    this.setLoadingStates();
  },

  onCreateAPNSDeviceCompleted() {
    console.debug('DeviceDialogStore::onCreateDeviceCompleted');
    this.dismissDialog();
    Actions.fetchAPNSDevices();
  },

  onUpdateAPNSDeviceCompleted() {
    console.debug('DeviceDialogStore::onUpdateDeviceCompleted');
    this.dismissDialog();
    Actions.fetchAPNSDevices();
  },

  onCreateGCMDeviceCompleted() {
    console.debug('DeviceDialogStore::onCreateDeviceCompleted');
    this.dismissDialog();
    Actions.fetchGCMDevices();
  },

  onUpdateGCMDeviceCompleted() {
    console.debug('DeviceDialogStore::onUpdateDeviceCompleted');
    this.dismissDialog();
    Actions.fetchGCMDevices();
  }
});
