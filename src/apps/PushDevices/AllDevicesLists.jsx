import React from 'react';

import APNSDevices from './APNSDevices/APNSDevices';
import GCMDevices from './GCMDevices/GCMDevices';
import PushNotifications from '../PushNotifications';

export default () => {
  const styles = {
    APNSList: {
      marginTop: '-90px'
    }
  };

  return (
    <div>
      <PushNotifications.GCMSummaryDialog />
      <GCMDevices visibleItems={3} />
      <div style={styles.APNSList}>
        <APNSDevices visibleItems={3} />
      </div>
    </div>
  );
};
