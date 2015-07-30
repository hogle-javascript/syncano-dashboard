import Reflux from 'reflux';

import SnackbarNotificationActions from './SnackbarNotificationActions';

export default Reflux.createStore({
  listenables: SnackbarNotificationActions,

  getInitialState() {
    return {snackbar: null};
  },

  init() {
    this.snackbar = null;
  },

  set(snackbar) {
    console.log('SnackbarNotificationStore::set');

    snackbar.key  = snackbar.key || Date.now();
    this.snackbar = snackbar;
    this.trigger({snackbar: this.snackbar});
  },

  dismiss() {
    console.log('SnackbarNotificationStore::dismiss');

    if (this.snackbar === null) {
      return;
    }

    this.snackbar = null;
    // Small debounce
    setTimeout(() => this.trigger({snackbar: this.snackbar}), 150);
  }

});
