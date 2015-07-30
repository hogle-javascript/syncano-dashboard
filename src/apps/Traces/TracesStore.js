import Reflux from 'reflux';

// Utils & Mixins
import CheckListStoreMixin from '../../mixins/CheckListStoreMixin';

// Stores & Actions
import SessionStore from '../Session/SessionStore';
import AuthStore from '../Account/AuthStore';
import Actions from './TracesActions';

export default Reflux.createStore({
  listenables: Actions,

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
    let fetch = {
      codebox  : Actions.fetchCodeBoxTraces,
      webhook  : Actions.fetchWebhookTraces,
      trigger  : Actions.fetchTriggerTraces,
      schedule : Actions.fetchScheduleTraces
    };

    fetch[this.data.tracesFor](this.data.objectId);
  },

  onSetCurrentObjectId(ObjectId, tracesFor) {
    console.debug('TracesStore::onSetCurrentObjectId', ObjectId, tracesFor);
    this.data.objectId = ObjectId;
    this.data.tracesFor = tracesFor;
    this.trigger(this.data);
    this.refreshData();
  },

  saveTraces(tracesObj) {
    this.data.items = Object.keys(tracesObj).map(item => tracesObj[item]);
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
