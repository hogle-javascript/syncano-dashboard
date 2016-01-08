import Reflux from 'reflux';

// Utils & Mixins
import {StoreForm, DialogStore, StoreLoading} from '../../../mixins';

// Stores & Actions
import Actions from './GCMDevicesActions';

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

  onCreateDeviceCompleted() {
    console.debug('DeviceDialogStore::onCreateDeviceCompleted');
    this.dismissDialog();
    Actions.fetchDevices();
  },

  onUpdateDeviceCompleted() {
    console.debug('DeviceDialogStore::onUpdateDeviceCompleted');
    this.dismissDialog();
    Actions.fetchDevices();
  }
});
