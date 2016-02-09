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
    console.debug('GCMDeviceDialogStore::onCreateDeviceCompleted');
    this.dismissDialog();
    Actions.fetchDevices();
  },

  onUpdateDeviceCompleted() {
    console.debug('GCMDeviceDialogStore::onUpdateDeviceCompleted');
    this.dismissDialog();
    Actions.fetchDevices();
  },

  onSendMessageToGCM() {
    console.debug('GCMDeviceDialogStore::onSendMessageToGCM');
    console.error('sendMessageGCM');
  },

  onSendMessageToGCMCompleted() {
    console.debug('GCMDeviceDialogStore::onSendMessageToGCMCompleted');
    console.error('sendMessageGCMCOmpleted');
    // this.dismissDialog();
  }
});
