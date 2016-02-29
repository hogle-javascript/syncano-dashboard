import Reflux from 'reflux';

import {StoreLoadingMixin} from '../../mixins';
// Stores & Actions
import SessionStore from '../Session/SessionStore';
import SessionActions from '../Session/SessionActions';
import Actions from './ChannelHistoryActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [StoreLoadingMixin],

  getInitialState() {
    return {
      items: [],
      channelName: null,
      isLoading: true
    };
  },

  init() {
    this.data = this.getInitialState();

    // We want to know when we are ready to download data for this store,
    // it depends on instance we working on
    this.joinTrailing(
        SessionActions.setInstance,
        this.refreshData
    );
    this.setLoadingStates();
  },

  refreshData() {
    console.debug('ChannelHistoryStore::refreshData', this.data);

    if (SessionStore.instance && this.data.channelName) {
      Actions.fetchChannelHistory(this.data.channelName);
    }
  },

  onSetCurrentChannelName(channelName) {
    console.debug('ChannelHistoryStore::onSetCurrentChannelName', channelName);
    this.data.channelName = channelName;
    this.trigger(this.data);
  },

  setChannelHistory(channelHistory) {
    console.debug('ChannelHistoryStore::setChannelHistory');
    this.data.items = channelHistory;
    this.trigger(this.data);
  },

  onFetchChannelHistory(channelName) {
    Actions.setCurrentChannelName(channelName);
  },

  onFetchChannelHistoryCompleted(channelHistoryObj) {
    console.debug('ChannelHistoryStore::onFetchChannelHistoryCompleted', channelHistoryObj);
    this.setChannelHistory(channelHistoryObj._items);
  }

});
