import React from 'react';

import APNSPushNotificationsActions from './APNSPushNotificationsActions';

import PushNotificationsListItem from '../PushNotificationsListItem';

export default (props) => {
  return (
    <PushNotificationsListItem
      {...props}
      label="Apple Push Notification service (APNs)"
      devicesRoute="apns-devices"
      icon="apple"
      showConfigDialog={APNSPushNotificationsActions.showDialog}/>
  );
};
