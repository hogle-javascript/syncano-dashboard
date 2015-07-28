import Reflux from 'reflux';
import _ from 'lodash';

import SnackbarNotificationsActions from './SnackbarNotificationsActions';

export default Reflux.createStore({
  listenables: SnackbarNotificationsActions,

  init() {
    this.notifications = []
  },

  get() {
    console.log('SnackbarNotificationsStore::get');
    return _.remove(this.notifications, n => true);
  },

  add(snackbar) {
    console.log('SnackbarNotificationsStore::add');
    snackbar.openOnMount = snackbar.openOnMount || true;
    this.notifications.push(snackbar);
    this.trigger({});
  }

});
