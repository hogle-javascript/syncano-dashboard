import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';

import Store from './GCMDevicesStore';
import Actions from './GCMDevicesActions';
import SendMessagesActions from './GCMSendMessagesActions';

import {Container} from '../../../common/';
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
        <Helmet title="Android Devices" />
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
