import React from 'react';

import Actions from './APNSSendMessagesActions';
import Store from './APNSSendMessagesDialogStore';

import SendMessageDialog from '../SendMessageDialog';

let getPhoneIcon = () => {
  return <div dangerouslySetInnerHTML={{__html: require('./phone-apple-empty-screen.svg')}}></div>;
};
const props = {
  type: 'APNS',
  handleSendMessage: Actions.sendMessageToAPNS,
  phoneIcon: getPhoneIcon()
};

export default SendMessageDialog(Store, props);
