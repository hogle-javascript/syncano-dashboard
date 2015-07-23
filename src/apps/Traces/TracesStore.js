import Reflux from 'reflux';

    // Utils & Mixins
import CheckListStoreMixin from '../../mixins/CheckListStoreMixin';

    // Stores & Actions
import SessionStore from '../Session/SessionStore';
import AuthStore from '../Account/AuthStore';
import TracesActions from './TracesActions';

export default Reflux.createStore({
  listenables: TracesActions,

  getInitialState() {
    return {
      items     : [],
      objectId  : null,
      tracesFor : null,
      isLoading : true
    }
  },

  init() {
    this.data = this.getInitialState();

    // We want to know when we are ready to download data for this store,
    // it depends on instance we working on
    this.listenTo(SessionStore, this.refreshData);
  },

  refreshData() {
    console.debug('TracesStore::refreshData');

    if (SessionStore.instance && this.data.objectId) {
      this.fetchTraces();
    }
  },

  fetchTraces() {
    if (this.data.tracesFor === 'codebox') {
      TracesActions.fetchCodeBoxTraces(this.data.objectId);
      return
    }
    if (this.data.tracesFor === 'webhook') {
      TracesActions.fetchWebhookTraces(this.data.objectId);
    }
    if (this.data.tracesFor === 'trigger') {
      TracesActions.fetchTriggerTraces(this.data.objectId);
    }
    if (this.data.tracesFor === 'schedule') {
      TracesActions.fetchScheduleTraces(this.data.objectId);
    }
  },

  onSetCurrentObjectId(ObjectId, tracesFor) {
    console.debug('TracesStore::onSetCurrentObjectId', ObjectId, tracesFor);
    this.data.objectId = ObjectId;
    this.data.tracesFor = tracesFor;
    this.trigger(this.data);
    this.refreshData();
  },

  saveTraces(tracesObj) {
    this.data.items = Object.keys(tracesObj).map((item) => {
      return tracesObj[item];
    });
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onFetchCodeBoxTracesCompleted(tracesObj) {
    console.debug('TracesStore::onGetCodeBoxTraces', tracesObj);
    this.saveTraces(tracesObj);
  },

  onFetchWebhookTracesCompleted(tracesObj) {
    console.debug('TracesStore::onGetCodeBoxTraces', tracesObj);
    this.saveTraces(tracesObj);
  },

  onFetchTriggerTracesCompleted(tracesObj) {
    console.debug('TracesStore::onGetCodeBoxTraces', tracesObj);
    this.saveTraces(tracesObj);
  },

  onFetchScheduleTracesCompleted(tracesObj) {
    console.debug('TracesStore::onGetCodeBoxTraces', tracesObj);
    this.saveTraces(tracesObj);
  }

});
