import Reflux from 'reflux';

// Stores & Actions
import SessionStore from '../Session/SessionStore';
import SessionActions from '../Session/SessionActions';
import Actions from './ChannelHistoryActions';

export default Reflux.createStore({
  listenables: Actions,

  getInitialState() {
    return {
      items: [],
      objectId: null,
      tracesFor: null,
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
  },

  refreshData() {
    console.debug('ChannelHistoryStore::refreshData', this.data);

    if (SessionStore.instance && this.data.objectId) {
      this.fetchTraces();
      this.fetchCurrentItem();
    }
  },

  fetchCurrentItem() {
    Actions.fetchCurrentChannel(this.data.objectId);
  },

  fetchTraces() {
    Actions.fetchChannelListHistory(this.data.objectId);
  },

  onSetCurrentObjectId(ObjectId, tracesFor) {
    console.debug('ChannelHistoryStore::onSetCurrentObjectId', ObjectId, tracesFor);
    this.data.objectId = ObjectId;
    this.data.tracesFor = tracesFor;
    this.refreshData();
  },

  setTraces(traces) {
    console.debug('ChannelHistoryStore::setTraces');
    this.data.items = traces;
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  saveCurrentObj(currentObjName) {
    console.debug('ChannelHistoryStore::saveCurrentObj', currentObjName);
    this.data.currentObjectName = currentObjName;
    this.trigger({currentObjectName: currentObjName});
  },

  onFetchChannelListHistoryCompleted(tracesObj) {
    console.debug('ChannelHistoryStore::onFetchChannelListHistoryCompleted', tracesObj);
    this.setTraces(tracesObj._items);
  },

  onFetchCurrentChannelCompleted(channelName) {
    console.debug('ChannelHistoryStore::onFetchCurrentChannelCompleted', channelName);
    this.saveCurrentObj(channelName.name);
  }

});
