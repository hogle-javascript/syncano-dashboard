import React from 'react';

import Actions from './APNSSendMessagesActions';
import Store from './APNSSendMessagesDialogStore';
import DevicesStore from './APNSDevicesStore';

import SendMessageDialog from '../SendMessageDialog';

let getPhoneIcon = () => {
  return <div dangerouslySetInnerHTML={{__html: require('./phone-apple-empty-screen.svg')}}></div>;
};
const props = {
  getCheckedItems: DevicesStore.getCheckedItems,
  handleSendMessage: Actions.sendMessagesToAPNS,
  phoneIcon: getPhoneIcon()
};

export default SendMessageDialog(Store, props);
