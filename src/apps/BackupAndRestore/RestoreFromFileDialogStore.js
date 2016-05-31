import Reflux from 'reflux';

// Utils & Mixins
import {StoreFormMixin, DialogStoreMixin, StoreLoadingMixin} from '../../mixins';

// Stores & Actions
import Actions from './RestoreFromFileDialogActions';

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

  onRestoreFromFileCompleted() {
    console.debug('RestoreFromFileDialogStore::onRestoreFromFileCompleted');
    this.dismissDialog();
  }
});
