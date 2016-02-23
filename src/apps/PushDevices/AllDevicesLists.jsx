import React from 'react';

import APNSDevices from './APNSDevices/APNSDevices';
import GCMDevices from './GCMDevices/GCMDevices';

export default () => {
  const styles = {
    APNSList: {
      marginTop: '-90px'
    }
  };

  return (
    <div>
      <GCMDevices visibleItems={3}/>
      <div style={styles.APNSList}>
        <APNSDevices visibleItems={3}/>
      </div>
    </div>
  );
};
