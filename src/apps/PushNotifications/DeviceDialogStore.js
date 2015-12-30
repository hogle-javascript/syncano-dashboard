import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

// Stores & Actions
import Actions from './DevicesActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    Mixins.StoreForm,
    Mixins.DialogStore
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
    this.listenToForms();
  },

  onCreateAPNsDeviceCompleted() {
    console.debug('ScheduleDialogStore::onCreateScheduleCompleted');
    this.dismissDialog();
    Actions.fetchAPNsDevices();
  },

  onUpdateAPNsDeviceCompleted() {
    console.debug('ScheduleDialogStore::onUpdateScheduleCompleted');
    this.dismissDialog();
    Actions.fetchAPNsDevices();
  },

  onCreateGCMDeviceCompleted() {
    console.debug('ScheduleDialogStore::onCreateScheduleCompleted');
    this.dismissDialog();
    Actions.fetchGCMDevices();
  },

  onUpdateGCMDeviceCompleted() {
    console.debug('ScheduleDialogStore::onUpdateScheduleCompleted');
    this.dismissDialog();
    Actions.fetchGCMDevices();
  }
});
