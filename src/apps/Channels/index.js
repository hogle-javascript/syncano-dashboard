import Channels from './Channels';
import ChannelsStore from './ChannelsStore';
import ChannelsList from './ChannelsList';
import ChannelsActions from './ChannelsActions';
import ChannelDialog from './ChannelDialog';
import ChannelDialogStore from './ChannelDialogStore';

import ChannelHistory from './ChannelHistory';
import ChannelHistoryStore from './ChannelHistoryStore';
import ChannelHistoryList from './ChannelHistoryList';
import ChannelHistoryActions from './ChannelHistoryActions';
import ChannelHistoryMessages from './ChannelHistoryMessages';

Channels.Actions = ChannelsActions;
Channels.Store = ChannelsStore;
Channels.List = ChannelsList;
Channels.Dialog = ChannelDialog;
Channels.DialogStore = ChannelDialogStore;

Channels.History = ChannelHistory;
Channels.HistoryStore = ChannelHistoryStore;
Channels.HistoryList = ChannelHistoryList;
Channels.HistoryActions = ChannelHistoryActions;
Channels.HistoryMessages = ChannelHistoryMessages;

export default Channels;
