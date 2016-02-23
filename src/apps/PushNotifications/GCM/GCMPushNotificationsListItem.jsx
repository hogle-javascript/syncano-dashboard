import React from 'react';

import GCMPushNotificationsActions from './GCMPushNotificationsActions';

import PushNotificationsListItem from '../PushNotificationsListItem';

export default (props) => {
  return (
    <PushNotificationsListItem
      {...props}
      name="GCM"
      label="Google Cloud Messaging (GCM)"
      devicesRoute="gcm-devices"
      icon="android"
      showConfigDialog={GCMPushNotificationsActions.showDialog}/>
  );
};
