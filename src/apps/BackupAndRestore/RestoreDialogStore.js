import Reflux from 'reflux';

// Utils & Mixins
import {StoreFormMixin, DialogStoreMixin, StoreLoadingMixin} from '../../mixins';

// Stores & Actions
import Actions from './RestoreDialogActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    StoreFormMixin,
    DialogStoreMixin,
    StoreLoadingMixin
  ],

  getInitialState() {
    return {
      clickedItem: null,
      isLoading: false
    };
  },

  init() {
    this.data = this.getInitialState();
    this.setLoadingStates();
    this.listenToForms();
  },

  onSetClickedBackup(item) {
    this.data.clickedItem = item;
    this.trigger(this.data);
  },

  onRestoreFromBackupCompleted() {
    console.debug('RestoreDialogStore::onRestoreFromBackupCompleted');
    this.dismissDialog();
  }
});
