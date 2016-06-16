import React from 'react';

import Actions from './GCMSendMessagesActions';
import Store from './GCMSendMessageDialogStore';
import DevicesStore from './GCMDevicesStore';

import SendMessageDialog from '../SendMessageDialog';

const getPhoneIcon = () => {
  return <div dangerouslySetInnerHTML={{ __html: require('./phone-android-empty-screen.svg') }}></div>;
};
const props = {
  getCheckedItems: DevicesStore.getCheckedItems,
  onSendMessage: Actions.sendMessagesToGCM,
  phoneIcon: getPhoneIcon()
};

export default SendMessageDialog(Store, props);
