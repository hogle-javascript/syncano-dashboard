import Reflux from 'reflux';
import _ from 'lodash';

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
      items: [],
      objectId: null,
      tracesFor: null,
      isLoading: true,
      currentObjectName: null
    }
  },

  init() {
    this.data = this.getInitialState();

    // We want to know when we are ready to download data for this store,
    // it depends on instance we working on
    this.listenTo(SessionStore, this.refreshData);
  },

  refreshData() {
    console.debug('TracesStore::refreshData', this.data);

    if (SessionStore.instance && this.data.objectId) {
      this.fetchTraces();
      this.fetchCurrentItem();
    }
  },

  fetchCurrentItem() {
    let fetch = {
      codebox: Actions.fetchCurrentCodeBox,
      webhook: Actions.fetchCurrentWebhook,
      trigger: Actions.fetchCurrentTrigger,
      schedule: Actions.fetchCurrentSchedule
    };

    fetch[this.data.tracesFor](this.data.objectId);
  },

  fetchTraces() {
    let fetch = {
      codebox: Actions.fetchCodeBoxTraces,
      webhook: Actions.fetchWebhookTraces,
      trigger: Actions.fetchTriggerTraces,
      schedule: Actions.fetchScheduleTraces
    };

    fetch[this.data.tracesFor](this.data.objectId);
  },

  onSetCurrentObjectId(ObjectId, tracesFor) {
    console.debug('TracesStore::onSetCurrentObjectId', ObjectId, tracesFor);
    this.data.objectId = ObjectId;
    this.data.tracesFor = tracesFor;
    this.refreshData();
  },

  saveTraces(tracesObj) {
    console.debug('TracesStore::saveTraces');
    this.data.items = _.chain(Object.keys(tracesObj)).map(item => tracesObj[item]).sortByOrder('id', 'desc').value();
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  saveCurrentObj(currentObjName) {
    console.debug('TracesStore::saveCurrentObj', currentObjName);
    this.data.currentObjectName = currentObjName;
    this.trigger(this.data);
  },

  onFetchCodeBoxTracesCompleted(tracesObj) {
    console.debug('TracesStore::onFetchCodeBoxTracesCompleted', tracesObj);
    this.saveTraces(tracesObj);
  },

  onFetchWebhookTracesCompleted(tracesObj) {
    console.debug('TracesStore::onFetchWebhookTracesCompleted', tracesObj);
    this.saveTraces(tracesObj);
  },

  onFetchTriggerTracesCompleted(tracesObj) {
    console.debug('TracesStore::onFetchTriggerTracesCompleted', tracesObj);
    this.saveTraces(tracesObj);
  },

  onFetchScheduleTracesCompleted(tracesObj) {
    console.debug('TracesStore::onFetchScheduleTracesCompleted', tracesObj);
    this.saveTraces(tracesObj);
  },

  onFetchCurrentCodeBoxCompleted(currentObj) {
    console.debug('TracesStore::onFetchCurrentCodBoxCompleted', currentObj);
    this.saveCurrentObj(currentObj.label)
  },

  onFetchCurrentWebhookCompleted(currentObj) {
    console.debug('TracesStore::onFetchCurrentCodBoxCompleted', currentObj);
    this.saveCurrentObj(currentObj.name)
  },
  onFetchCurrentTriggerCompleted(currentObj) {
    console.debug('TracesStore::onFetchCurrentCodBoxCompleted', currentObj);
    this.saveCurrentObj(currentObj.label)
  },

  onFetchCurrentScheduleCompleted(currentObj) {
    console.debug('TracesStore::onFetchCurrentCodBoxCompleted', currentObj);
    this.saveCurrentObj(currentObj.label)
  }


});
