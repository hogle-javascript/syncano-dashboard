import Reflux from 'reflux';

// Utils & Mixins
import { StoreFormMixin, DialogStoreMixin, StoreLoadingMixin } from '../../../mixins';

// Stores & Actions
import Actions from './APNSDevicesActions';
import APNSDeviceSummaryDialogActions from './APNSDeviceSummaryDialogActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    StoreFormMixin,
    DialogStoreMixin,
    StoreLoadingMixin
  ],

  getInitialState() {
    return {
      isLoading: false
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
    APNSDeviceSummaryDialogActions.showDialog();
    Actions.fetchDevices();
    this.trigger(this.data);
  },

  onUpdateDeviceCompleted() {
    console.debug('DeviceDialogStore::onUpdateDeviceCompleted');
    this.dismissDialog();
    Actions.fetchDevices();
    this.trigger(this.data);
  }
});
