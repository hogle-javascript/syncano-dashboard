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
    const {hideDialogs, isLoading, items} = this.state;
    const {visibleItems} = this.props;

    return (
      <Container>
        <GCMDialog />
        <DevicesList
          type="gcm"
          visibleItems={visibleItems}
          getCheckedItems={Store.getCheckedItems}
          actions={Actions}
          showSendMessagesDialog={SendMessagesActions.showDialog}
          emptyItemHandleClick={Actions.showDialog}
          emptyItemContent="Add GCM Device"
          hideDialogs={hideDialogs}
          isLoading={isLoading}
          items={items}/>
      </Container>
    );
  }
});
