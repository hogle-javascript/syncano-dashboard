import React from 'react';
import Reflux from 'reflux';

// Utils
import {DialogMixin} from '../../mixins';

// Stores and Actions
import Store from './SocketsDialogStore';

// Components
import {Dialog} from '../../common';
import EmptyView from './EmptyView';

export default React.createClass({
  displayName: 'SocketsDialog',

  mixins: [
    DialogMixin,
    Reflux.connect(Store)
  ],

  render() {
    const {open} = this.state;

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        style={{zIndex: 1499}}
        onRequestClose={this.handleCancel}
        open={open}>
        <EmptyView />
      </Dialog.FullPage>
    );
  }
});

