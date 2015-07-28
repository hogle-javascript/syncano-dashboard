import Reflux from 'reflux';
import RequestActions from './RequestActions';
import SnackbarNotificationActions from '../SnackbarNotification/SnackbarNotificationActions';

let RequestStore = Reflux.createStore({
  listenables: RequestActions,

  onCompleted(event, method, url) {
    this.setErrorSnackbar(event);
  },

  onError(event, method, url) {
    this.setErrorSnackbar(event);
  },

  setErrorSnackbar(event) {
    if (event.target.status >= 500 && event.target.status <= 599) {
      SnackbarNotificationActions.set({
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
