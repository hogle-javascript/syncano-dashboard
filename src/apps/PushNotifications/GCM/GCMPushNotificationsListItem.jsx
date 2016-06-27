import React from 'react';

import Actions from './GCMPushNotificationsActions';

import PushNotificationsListItem from '../PushNotificationsListItem';

export default (props) => {
  const params = {
    production_api_key: null,
    development_api_key: null
  };

  return (
    <PushNotificationsListItem
      {...props}
      name="GCM"
      label="Google Cloud Messaging (GCM)"
      devicesRoute="gcm-devices"
      icon="android"
      clearConfig={() => Actions.configGCMPushNotification(params)}
      deviceIcon="synicon-cellphone-android"
      showConfigDialog={Actions.showDialog}
    />
  );
};
