import Reflux from 'reflux';

// Utils & Mixins
import {StoreFormMixin, DialogStoreMixin, StoreLoadingMixin} from '../../mixins';

// Stores & Actions
import Actions from './RestoreDialogActions';
import FullBackupsActions from './Full/FullBackupsActions';
import PartialBackupsActions from './Partial/PartialBackupsActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    StoreFormMixin,
    DialogStoreMixin,
    StoreLoadingMixin
  ],

  getInitialState() {
    return {
      clickedItem: null
    };
  },

  init() {
    this.data = this.getInitialState();
    this.listenToForms();
  },

  refreshData() {
    console.debug('RestoreDialogStore::refreshData');
    FullBackupsActions.fetchFullBackups();
    PartialBackupsActions.fetchPartialBackups();
  },

  onSetClickedBackup(item) {
    this.data.clickedItem = item;
    this.trigger(this.data);
  },

  onRestoreFromBackupCompleted(resp) {
    console.debug('RestoreDialogStore::onRestoreFromBackupCompleted');
    this.dismissDialog();
    this.refreshData();
  }
});
