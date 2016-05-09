import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';

import Store from './APNSDevicesStore';
import Actions from './APNSDevicesActions';
import SendMessagesActions from './APNSSendMessagesActions';

import {Container} from 'syncano-components';
import DevicesList from '../DevicesList';
import APNSDialog from './APNSDeviceDialog';

export default React.createClass({

  displayName: 'APNSDevices',

  mixins: [
    Reflux.connect(Store)
  ],

  componentWillMount() {
    Actions.fetch();
  },

  render() {
    return (
      <Container>
        <Helmet title="iOS Devices" />
        <APNSDialog />
        <DevicesList
          type="apns"
          visibleItems={this.props.visibleItems}
          getCheckedItems={Store.getCheckedItems}
          actions={Actions}
          showSendMessagesDialog={SendMessagesActions.showDialog}
          emptyItemHandleClick={Actions.showDialog}
          emptyItemContent="Add APNS Device"
          hideDialogs={this.state.hideDialogs}
          isLoading={this.state.isLoading}
          items={this.state.items}/>
      </Container>
    );
  }
});
