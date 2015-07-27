import Reflux from 'reflux';
import RequestActions from './RequestActions';
import SnackbarNotificationsActions from '../SnackbarNotifications/SnackbarNotificationsActions';

let RequestStore = Reflux.createStore({
  listenables: RequestActions,

  onCompleted(event, method, url) {
    this.addErrorSnackbar(event);
  },

  onError(event, method, url) {
    this.addErrorSnackbar(event);
  },

  addErrorSnackbar(event) {
    if (event.target.status >= 500 && event.target.status <= 599) {
      SnackbarNotificationsActions.add({
        message: 'Something went wrong',
        action: 'refresh',
        onActionTouchTap() {
          // Reloads current page without cache
          location.reload(true);
        }
      });
    }
  }

});

export default RequestStore;
