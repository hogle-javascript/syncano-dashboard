import React from 'react';

import PushMessagesListItem from '../PushMessagesListItem';

const GCMMessageListItem = (props) => {
  return (
    <PushMessagesListItem
      type="GCM"
      {...props}
    />
  );
};

export default GCMMessageListItem;
