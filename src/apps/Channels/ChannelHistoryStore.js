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
      objectId: null,
      isLoading: true,
      currentObjectName: null
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

    if (SessionStore.instance && this.data.objectId) {
      Actions.fetchChannelHistory(this.data.objectId);
      Actions.fetchCurrentChannel(this.data.objectId);
    }
  },

  onSetCurrentObjectId(ObjectId) {
    console.debug('ChannelHistoryStore::onSetCurrentObjectId', ObjectId);
    this.data.objectId = ObjectId;
    this.refreshData();
  },

  setChannelHistory(channelHistory) {
    console.debug('ChannelHistoryStore::setTraces');
    this.data.items = channelHistory;
    this.trigger(this.data);
  },

  saveCurrentObj(currentObjName) {
    console.debug('ChannelHistoryStore::saveCurrentObj', currentObjName);
    this.data.currentObjectName = currentObjName;
    this.trigger(this.data);
  },

  onFetchChannelHistoryCompleted(channelHistoryObj) {
    console.debug('ChannelHistoryStore::onFetchChannelHistoryCompleted', channelHistoryObj);
    this.setChannelHistory(channelHistoryObj._items);
  },

  onFetchCurrentChannelCompleted(channelName) {
    console.debug('ChannelHistoryStore::onFetchCurrentChannelCompleted', channelName);
    this.saveCurrentObj(channelName.name);
  }

});
