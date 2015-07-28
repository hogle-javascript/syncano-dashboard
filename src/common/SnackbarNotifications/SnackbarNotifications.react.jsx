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
              ref              = {notification.ref}
              key              = {notification.key}
              message          = {notification.message}
              action           = {notification.action}
              autoHideDuration = {notification.autoHideDuration}
              onActionTouchTap = {notification.onActionTouchTap.bind(this, notification.ref)}
              openOnMount      = {notification.openOnMount}
              style            = {notification.style} />;
  },

  render() {
    return <div>{this.state.notifications.map(this.renderNotification)}</div>;
  }
});
