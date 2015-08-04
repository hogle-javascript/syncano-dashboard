import Channels from './Channels.react';
import ChannelsStore from './ChannelsStore';
import ChannelsList from './ChannelsList.react';
import ChannelsActions from './ChannelsActions';
import ChannelDialog from './ChannelDialog.react';
import ChannelDialogStore from './ChannelDialogStore';

Channels.Actions = ChannelsActions;
Channels.Store = ChannelsStore;
Channels.List = ChannelsList;
Channels.Dialog = ChannelDialog;
Channels.DialogStore = ChannelDialogStore;

export default Channels;
