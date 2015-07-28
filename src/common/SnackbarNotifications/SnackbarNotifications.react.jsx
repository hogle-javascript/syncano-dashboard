import React from 'react';
import Reflux from 'reflux';
import MUI from 'material-ui';

import Store from './SnackbarNotificationsStore';

export default React.createClass({
  displayName: 'SnackbarNotifications',

  mixins: [
    Reflux.connect(Store)
  ],

  renderNotification(notification, index) {
    return <MUI.Snackbar
              ref              = {`notification-${index}`}
              key              = {`notification-${index}`}
              message          = {notification.message}
              action           = {notification.action}
              autoHideDuration = {notification.autoHideDuration}
              onActionTouchTap = {notification.onActionTouchTap}
              openOnMount      = {notification.openOnMount}
              style            = {notification.style} />;
  },

  render() {
    let notifications = Store.get();

    if (notifications.length === 0) {
      return null;
    }

    return <div>{notifications.map(this.renderNotification)}</div>;
  }
});
