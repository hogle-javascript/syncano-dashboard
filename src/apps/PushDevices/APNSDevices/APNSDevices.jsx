import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';

import Store from './APNSDevicesStore';
import Actions from './APNSDevicesActions';
import SendMessagesActions from './APNSSendMessagesActions';

import {Container} from '../../../common/';
import DevicesList from '../DevicesList';
import APNSDialog from './APNSDeviceDialog';

export default React.createClass({

  displayName: 'APNSDevices',

  mixins: [
    Reflux.connect(Store)
  ],

  render() {
    const {hasConfig, hideDialogs, isLoading, items} = this.state;
    const {visibleItems} = this.props;

    return (
      <Container>
        <Helmet title="iOS Devices" />
        <APNSDialog />
        <DevicesList
          type="apns"
          hasConfig={hasConfig}
          visibleItems={visibleItems}
          getCheckedItems={Store.getCheckedItems}
          actions={Actions}
          showSendMessagesDialog={SendMessagesActions.showDialog}
          emptyItemHandleClick={Actions.showDialog}
          emptyItemContent="Add APNS Device"
          hideDialogs={hideDialogs}
          isLoading={isLoading}
          items={items}/>
      </Container>
    );
  }
});
