import React from 'react';

import APNSMessagesList from './APNS/APNSMessagesList';
import GCMMessagesList from './GCM/GCMMessagesList';

const AllPushMessagesList = () => {
  return (
    <div>
      <GCMMessagesList />
      <div style={{ marginTop: '-90px' }}>
        <APNSMessagesList />
      </div>
    </div>
  );
};

export default AllPushMessagesList;
