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
import Popover from './ConfigPushNotificationsPopover';
import {InnerToolbar} from '../../common';
import {Container, Socket} from 'syncano-components';

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
    const items = this.state.APNSPushNotifications.items.concat(this.state.GCMPushNotifications.items);

    return (
      <div>
        <APNSConfigDialog/>
        <GCMConfigDialog/>
        <InnerToolbar title="Push Notifications">
          <Socket.Push
            tooltip="Configure Push Notification Socket"
            tooltipPosition="bottom-left"
            onTouchTap={this.refs.pushSocketPopover ? this.refs.pushSocketPopover.toggle : null}/>
        </InnerToolbar>
        <Popover ref="pushSocketPopover"/>
        <Container>
          <PushNotificationsList
            isLoading={this.state.APNSPushNotifications.isLoading || this.state.GCMPushNotifications.isLoading}
            name="Push Notification Sockets"
            items={items}/>
        </Container>
      </div>
    );
  }
});
