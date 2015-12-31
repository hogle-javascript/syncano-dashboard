import Reflux from 'reflux';

// Utils & Mixins
import {StoreForm, DialogStore} from '../../mixins';

// Stores & Actions
import Actions from './DevicesActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    StoreForm,
    DialogStore
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
  },

  onCreateAPNsDevice() {
    console.debug('DeviceDialogStore::onCreateDevice');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onCreateAPNsDeviceCompleted() {
    console.debug('DeviceDialogStore::onCreateDeviceCompleted');
    this.dismissDialog();
    this.data.isLoading = false;
    Actions.fetchAPNsDevices();
  },

  onUpdateAPNsDevice() {
    console.debug('DeviceDialogStore::onCreateDevice');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onUpdateAPNsDeviceCompleted() {
    console.debug('DeviceDialogStore::onUpdateDeviceCompleted');
    this.dismissDialog();
    this.data.isLoading = false;
    Actions.fetchAPNsDevices();
  },

  onCreateGCMDevice() {
    console.debug('DeviceDialogStore::onCreateDevice');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onCreateGCMDeviceCompleted() {
    console.debug('DeviceDialogStore::onCreateDeviceCompleted');
    this.dismissDialog();
    this.data.isLoading = false;
    Actions.fetchGCMDevices();
  },

  onUpdateGCMDevice() {
    console.debug('DeviceDialogStore::onCreateDevice');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onUpdateGCMDeviceCompleted() {
    console.debug('DeviceDialogStore::onUpdateDeviceCompleted');
    this.dismissDialog();
    this.data.isLoading = false;
    Actions.fetchGCMDevices();
  }
});
