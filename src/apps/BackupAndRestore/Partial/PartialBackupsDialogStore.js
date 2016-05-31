import Reflux from 'reflux';

import {StoreLoadingMixin, StoreFormMixin, DialogStoreMixin} from '../../../mixins';

import Actions from './PartialBackupsActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    StoreLoadingMixin,
    StoreFormMixin,
    DialogStoreMixin
  ],

  getInitialState() {
    return {
      isLoading: false,
      queryArgs: ['{', '  ', '}'].join('\n')
    };
  },

  init() {
    this.data = this.getInitialState();
    this.listenToForms();
    this.setLoadingStates();
  },

  onCreatePartialBackupCompleted() {
    console.debug('PartialBackupsDialogStore::onCreatePartialBackupCompleted');
    Actions.fetchPartialBackups();
    this.dismissDialog();
  }
});
