import React from 'react';
import Reflux from 'reflux';

import Store from './GCMDevicesStore';
import Actions from './GCMDevicesActions';
import SendMessagesActions from './GCMSendMessagesActions';

import {Container} from 'syncano-components';
import DevicesList from '../DevicesList';
import GCMDialog from './GCMDeviceDialog';

export default React.createClass({

  displayName: 'GCMDevices',

  mixins: [
    Reflux.connect(Store)
  ],

  componentWillMount() {
    Actions.fetch();
  },

  render() {
    return (
      <Container>
        <GCMDialog />
        <DevicesList
          type="gcm"
          visibleItems={this.props.visibleItems}
          getChekcedItems={Store.getCheckedItems}
          actions={Actions}
          showSendMessagesDialog={SendMessagesActions.showDialog}
          emptyItemHandleClick={Actions.showDialog}
          emptyItemContent="Add GCM Device"
          hideDialogs={this.state.hideDialogs}
          isLoading={this.state.isLoading}
          items={this.state.items}/>
      </Container>
    );
  }
});
