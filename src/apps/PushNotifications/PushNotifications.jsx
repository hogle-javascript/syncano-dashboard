import React from 'react';
import Reflux from 'reflux';

import PushDevices from '../PushDevices';
import APNSPushNotificationsActions from './APNS/APNSPushNotificationsActions';
import APNSPushNotificationsStore from './APNS/APNSPushNotificationsStore';
import GCMPushNotificationsActions from './GCM/GCMPushNotificationsActions';
import GCMPushNotificationsStore from './GCM/GCMPushNotificationsStore';

import PushNotificationsList from './PushNotificationsList';
import APNSConfigDialog from './APNS/APNSConfigDialog';
import GCMConfigDialog from './GCM/GCMConfigDialog';
import ConfigPushNotificationsPopover from './ConfigPushNotificationsPopover';
import {RaisedButton} from 'syncano-material-ui';
import {Container} from 'syncano-components';
import SocketsInnerToolbar from '../Sockets/SocketsInnerToolbar';

export default React.createClass({
  displayName: 'PushNotifications',

  mixins: [
    Reflux.connect(APNSPushNotificationsStore, 'APNSPushNotifications'),
    Reflux.connect(GCMPushNotificationsStore, 'GCMPushNotifications')
  ],

  componentDidMount() {
    PushDevices.APNSActions.fetch();
    PushDevices.GCMActions.fetch();
    APNSPushNotificationsActions.fetch();
    GCMPushNotificationsActions.fetch();
  },

  render() {
    const {APNSPushNotifications, GCMPushNotifications} = this.state;
    const {pushSocketPopover} = this.refs;
    const items = APNSPushNotifications.items.concat(GCMPushNotifications.items);

    return (
      <div>
        <APNSConfigDialog/>
        <GCMConfigDialog/>
        <SocketsInnerToolbar>
          <RaisedButton
            label="Add"
            primary={true}
            style={{marginRight: 0}}
            onTouchTap={pushSocketPopover ? pushSocketPopover.toggle : null} />
        </SocketsInnerToolbar>
        <ConfigPushNotificationsPopover ref="pushSocketPopover"/>
        <Container>
          <PushNotificationsList
            isLoading={APNSPushNotifications.isLoading || GCMPushNotifications.isLoading}
            name="Push Notification Sockets"
            items={items}/>
        </Container>
      </div>
    );
  }
});
