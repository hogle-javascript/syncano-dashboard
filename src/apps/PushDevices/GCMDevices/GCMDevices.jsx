import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';

import Store from './GCMDevicesStore';
import Actions from './GCMDevicesActions';

import { Container } from '../../../common/';
import DevicesList from '../DevicesList';
import GCMDialog from './GCMDeviceDialog';
import GCMConfigDialog from '../../PushNotifications/GCM/GCMConfigDialog';
import GCMDeviceSummaryDialog from './GCMDeviceSummaryDialog';

export default React.createClass({

  displayName: 'GCMDevices',

  mixins: [
    Reflux.connect(Store)
  ],

  componentDidMount() {
    Actions.fetch();
  },

  render() {
    const { hasConfig, hideDialogs, isLoading, items, ...other } = this.state;
    const { visibleItems } = this.props;

    return (
      <Container>
        <Helmet title="Android Devices" />
        <GCMDialog />
        <GCMConfigDialog />
        <GCMDeviceSummaryDialog />
        <DevicesList
          type="gcm"
          hasConfig={hasConfig}
          visibleItems={visibleItems}
          getCheckedItems={Store.getCheckedItems}
          actions={Actions}
          emptyItemHandleClick={Actions.showDialog}
          emptyItemContent="Add GCM Device"
          hideDialogs={hideDialogs}
          isLoading={isLoading}
          items={items}
          {...other}
        />
      </Container>
    );
  }
});
