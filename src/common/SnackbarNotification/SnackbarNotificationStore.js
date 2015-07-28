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

    let key                   = `notification-${Date.now()}`;
    snackbar.key              = snackbar.key              || key;
    snackbar.openOnMount      = snackbar.openOnMount      || true;
    snackbar.action           = snackbar.action           || 'dismiss';
    snackbar.onActionTouchTap = snackbar.onActionTouchTap || function() { this.refs.snackbar.dismiss(); };
    this.snackbar             = snackbar;
    this.trigger({snackbar: this.snackbar});
  },

  dismiss() {
    console.log('SnackbarNotificationStore::dismiss');

    if (this.snackbar === null) {
      return;
    }

    this.snackbar = null;
    this.trigger({snackbar: this.snackbar});
  }

});
