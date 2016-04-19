import Reflux from 'reflux';

// Utils & Mixins
import {StoreFormMixin, DialogStoreMixin, StoreLoadingMixin} from '../../../mixins';

// Stores & Actions
import Actions from './GCMDevicesActions';

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
    console.debug('GCMDeviceDialogStore::onCreateDeviceCompleted');
    this.dismissDialog();
    Actions.fetchDevices();
    this.trigger(this.data);
  },

  onUpdateDeviceCompleted() {
    console.debug('GCMDeviceDialogStore::onUpdateDeviceCompleted');
    this.dismissDialog();
    Actions.fetchDevices();
    this.trigger(this.data);
  }
});
