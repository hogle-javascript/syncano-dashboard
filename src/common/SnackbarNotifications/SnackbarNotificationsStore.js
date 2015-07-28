import Reflux from 'reflux';
import _ from 'lodash';

import SnackbarNotificationsActions from './SnackbarNotificationsActions';

export default Reflux.createStore({
  listenables: SnackbarNotificationsActions,

  getInitialState() {
    return {notifications: []};
  },

  add(...snackbars) {
    console.log('SnackbarNotificationsStore::add');

    _.forEach(snackbars, snackbar => {
      let key                   = `notification-${Date.now()}`;
      snackbar.ref              = snackbar.ref              || key;
      snackbar.key              = snackbar.key              || key;
      snackbar.openOnMount      = snackbar.openOnMount      || true;
      snackbar.action           = snackbar.action           || 'dismiss';
      snackbar.onActionTouchTap = snackbar.onActionTouchTap || function(ref) { this.refs[ref].dismiss(); };
    });

    this.trigger({notifications: snackbars});
  },

  clear() {
    console.log('SnackbarNotificationsStore::clear');
    this.trigger({notifications: []});
  }

});
