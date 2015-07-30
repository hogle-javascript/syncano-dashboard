import SnackbarNotificationActions from './SnackbarNotificationActions';

export default {
  setSnackbarNotification(snackbar) {
    SnackbarNotificationActions.set(snackbar);
  },

  dismissSnackbarNotification() {
    SnackbarNotificationActions.dismiss();
  }
};
