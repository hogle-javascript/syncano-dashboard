import Reflux from 'reflux';
import RequestActions from './RequestActions';
import SnackbarNotificationActions from '../../apps/SnackbarNotification/SnackbarNotificationActions';

let RequestStore = Reflux.createStore({
  listenables: RequestActions,

  onCompleted(event) {
    this.setErrorSnackbar(event);
  },

  onError(event) {
    this.setErrorSnackbar(event);
  },

  setErrorSnackbar(event) {
    if (event.target && event.target.status >= 500 && event.target.status <= 599) {
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
