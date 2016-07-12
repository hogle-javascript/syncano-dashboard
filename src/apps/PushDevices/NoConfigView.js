import React from 'react';

import APNSSocketActions from '../PushNotifications/APNS/APNSPushNotificationsActions';
import GCMSocketActions from '../PushNotifications/GCM/GCMPushNotificationsActions';

import { FontIcon, RaisedButton } from 'material-ui';

const NoConfigView = ({ type }) => {
  const socketType = type.toUpperCase();
  const showConfigDialog = {
    apns: APNSSocketActions.showDialog,
    gcm: GCMSocketActions.showDialog
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 32 }}>
      <FontIcon
        className="synicon-settings"
        style={{ color: '#AAA', fontSize: 56 }}
      />
      <div style={{ marginTop: 24, fontSize: 18, fontWeight: 500, color: '#AAA' }}>
        {`To add ${socketType} devices you have to config ${socketType} Push Notification Socket first.`}
      </div>
      <RaisedButton
        className="vm-4-t"
        primary={true}
        label={`Config ${socketType} Socket`}
        onTouchTap={showConfigDialog[type]}
      />
    </div>
  );
};

NoConfigView.contextTypes = { params: React.PropTypes.object };

export default NoConfigView;
