import Reflux from 'reflux';

// Utils & Mixins
import {StoreFormMixin, DialogStoreMixin, StoreLoadingMixin} from '../../../mixins';

// Stores & Actions
import Actions from './GCMSendMessagesActions';

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

  onSendMessagesToGCM() {
    console.debug('GCMDeviceDialogStore::onSendMessageToGCM');
    console.error('sendMessageGCM');
  },

  onSendMessagesToGCMCompleted() {
    this.dismissDialog();
    console.debug('GCMDeviceDialogStore::onSendMessageToGCMCompleted');
    console.error('sendMessageGCMCompleted');
  }
});
