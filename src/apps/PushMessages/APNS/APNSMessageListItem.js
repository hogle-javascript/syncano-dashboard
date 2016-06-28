import React from 'react';

import PushMessagesListItem from '../PushMessagesListItem';

const APNSMessageListItem = (props) => {
  return (
    <PushMessagesListItem
      type="APNS"
      {...props}
    />
  );
};

export default APNSMessageListItem;
