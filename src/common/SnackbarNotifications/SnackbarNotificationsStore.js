import Reflux from 'reflux';
import SnackbarNotificationsActions from './SnackbarNotificationsActions';

export default Reflux.createStore({
  listenables: SnackbarNotificationsActions,

  init() {
    this.notifications = []
  },

  get() {
    return this.notifications;
  },

  add(snackbar) {
    this.notifications.push(snackbar);
  }

});
