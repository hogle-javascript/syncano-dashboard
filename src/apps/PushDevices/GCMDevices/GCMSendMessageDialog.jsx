import React from 'react';

import Actions from './GCMSendMessagesActions';
import Store from './GCMSendMessageDialogStore';

import SendMessageDialog from '../SendMessageDialog';

let getPhoneIcon = () => {
  return <div dangerouslySetInnerHTML={{__html: require('./phone-android-empty-screen.svg')}}></div>;
};
const props = {
  type: 'GCM',
  handleSendMessage: Actions.sendMessageToGCM,
  phoneIcon: getPhoneIcon()
};

export default SendMessageDialog(Store, props);
