import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';

import PushDevices from '../PushDevices';
import APNSPushNotificationsActions from './APNS/APNSPushNotificationsActions';
import APNSPushNotificationsStore from './APNS/APNSPushNotificationsStore';
import GCMPushNotificationsActions from './GCM/GCMPushNotificationsActions';
import GCMPushNotificationsStore from './GCM/GCMPushNotificationsStore';

import PushNotificationsList from './PushNotificationsList';
import APNSConfigDialog from './APNS/APNSConfigDialog';
import GCMConfigDialog from './GCM/GCMConfigDialog';
import GCMSummaryDialog from './GCM/GCMSummaryDialog';
import ConfigPushNotificationsPopover from './ConfigPushNotificationsPopover';
import { RaisedButton } from 'material-ui';
import { Container, EmptyView, Loading } from '../../common/';
import { colors as Colors } from 'material-ui/styles';
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

  renderContent() {
    const { APNSPushNotifications, GCMPushNotifications } = this.state;
    const items = APNSPushNotifications.items.concat(GCMPushNotifications.items);
    const APNSConfig = APNSPushNotifications.items[0];
    const GCMConfig = GCMPushNotifications.items[0];
    const isLoading = APNSPushNotifications.isLoading || GCMPushNotifications.isLoading;

    if (!APNSPushNotifications || !GCMPushNotifications) {
      return <div></div>;
    }

    if (isLoading) {
      return <Loading show={true} />;
    }

    if (APNSConfig && !APNSConfig.hasConfig && GCMConfig && !GCMConfig.hasConfig) {
      return (
        <EmptyView.PushNotifications
          iconClassName="synicon-socket-push"
          iconColor={Colors.indigo400}
          title="Push Notifications"
          description="Instantly message your iOS or Android users with timely and relevant content."
          APNSDocsUrl="http://docs.syncano.io/docs/push-notifications-socket-ios"
          GCMDocsUrl="http://docs.syncano.io/docs/push-notifications-socket-android"
          handleClickAddIOS={APNSPushNotificationsActions.showDialog}
          handleClickAddGCM={GCMPushNotificationsActions.showDialog}
        />
      );
    }

    return (
      <PushNotificationsList
        isLoading={isLoading}
        name="Push Notification Sockets (BETA)"
        items={items}
      />
    );
  },

  render() {
    const { pushSocketPopover } = this.refs;

    return (
      <div>
        <Helmet title="Push Notifications" />
        <APNSConfigDialog />
        <GCMConfigDialog />
        <GCMSummaryDialog />
        <SocketsInnerToolbar>
          <RaisedButton
            label="Add"
            primary={true}
            style={{ marginRight: 0 }}
            onTouchTap={pushSocketPopover ? pushSocketPopover.toggle : null}
          />
        </SocketsInnerToolbar>
        <ConfigPushNotificationsPopover ref="pushSocketPopover" />
        <Container>
          {this.renderContent()}
        </Container>
      </div>
    );
  }
});
