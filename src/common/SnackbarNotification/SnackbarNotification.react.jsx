import React from 'react';
import Reflux from 'reflux';
import MUI from 'material-ui';

import Store from './SnackbarNotificationStore';

export default React.createClass({
  displayName: 'SnackbarNotification',

  mixins: [
    Reflux.connect(Store)
  ],

  render() {
    let snackbar = this.state.snackbar;

    if (snackbar === null) {
      return null;
    }

    return <MUI.Snackbar
              ref              = "snackbar"
              key              = {snackbar.key}
              message          = {snackbar.message}
              action           = {snackbar.action}
              autoHideDuration = {snackbar.autoHideDuration}
              onActionTouchTap = {snackbar.onActionTouchTap.bind(this)}
              openOnMount      = {snackbar.openOnMount}
              style            = {snackbar.style} />;
  }
});
