import React from 'react';
import Reflux from 'reflux';
import MUI from 'material-ui';

import Store from './SnackbarNotificationStore';

export default React.createClass({
  displayName: 'SnackbarNotification',

  mixins: [
    Reflux.connect(Store)
  ],

  componentWillUpdate() {
    console.log('SnackbarNotification::componentWillUpdate');

    if (this.state.snackbar === null) {
      return;
    }

    if (this.state.snackbar.delay !== undefined) {
      delete this.state.snackbar.delay;
      return;
    }

    if (this.state.snackbar !== null) {
      this.refs.snackbar.dismiss();
    }
  },

  componentDidUpdate() {
    console.log('SnackbarNotification::componentDidUpdate');

    if (this.state.snackbar === null) {
      return;
    }

    if (this.state.snackbar.openOnMount === true) {
      return;
    }

    if (this.refs.snackbar._wasOpen === true) {
      return;
    }

    if (this.refs.snackbar.state.open === false) {
      this.refs.snackbar._wasOpen = true;
      this.refs.snackbar.show();
    }

  },

  render() {
    let snackbar = this.state.snackbar;

    if (snackbar === null) {
      return null;
    }

    return <MUI.Snackbar
      ref="snackbar"
      key={snackbar.key}
      message={snackbar.message}
      action={snackbar.action}
      autoHideDuration={snackbar.autoHideDuration}
      onActionTouchTap={(snackbar.onActionTouchTap) ? snackbar.onActionTouchTap.bind(this): undefined}
      openOnMount={snackbar.openOnMount}
      style={snackbar.style}/>;
  }
});
