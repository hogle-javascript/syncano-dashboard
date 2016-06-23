import React from 'react';

import Actions from './APNSPushNotificationsActions';

import PushNotificationsListItem from '../PushNotificationsListItem';

export default (props) => {
  const params = {
    development_certificate: false,
    development_certificate_name: null,
    development_bundle_identifier: null,
    production_certificate: false,
    production_certificate_name: null,
    production_bundle_identifier: null
  };

  return (
    <PushNotificationsListItem
      {...props}
      label="Apple Push Notification service (APNs)"
      devicesRoute="apns-devices"
      icon="apple"
      clearConfig={() => Actions.removeCertificate(params)}
      deviceIcon="synicon-cellphone-iphone"
      showConfigDialog={Actions.showDialog}
    />
  );
};
