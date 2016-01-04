import Reflux from 'reflux';

// Stores & Actions
import SessionStore from '../Session/SessionStore';
import SessionActions from '../Session/SessionActions';
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
    console.debug('TracesStore::refreshData', this.data);

    if (SessionStore.instance && this.data.objectId) {
      this.fetchTraces();
      this.fetchCurrentItem();
    }
  },

  fetchCurrentItem() {
    let fetch = {
      snippet: Actions.fetchCurrentSnippet,
      codeBox: Actions.fetchCurrentCodeBox,
      trigger: Actions.fetchCurrentTrigger,
      schedule: Actions.fetchCurrentSchedule
    };

    fetch[this.data.tracesFor](this.data.objectId);
  },

  fetchTraces() {
    let fetch = {
      snippet: Actions.fetchSnippetTraces,
      codeBox: Actions.fetchCodeBoxTraces,
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

  setTraces(traces) {
    console.debug('TracesStore::setTraces');
    this.data.items = traces;
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  saveCurrentObj(currentObjName) {
    console.debug('TracesStore::saveCurrentObj', currentObjName);
    this.data.currentObjectName = currentObjName;
    this.trigger({currentObjectName: currentObjName});
  },

  onFetchSnippetTracesCompleted(tracesObj) {
    console.debug('TracesStore::onFetchSnippetTracesCompleted', tracesObj);
    this.setTraces(tracesObj._items);
  },

  onFetchCodeBoxTracesCompleted(tracesObj) {
    console.debug('TracesStore::onFetchCodeBoxTracesCompleted', tracesObj);
    this.setTraces(tracesObj._items);
  },

  onFetchTriggerTracesCompleted(tracesObj) {
    console.debug('TracesStore::onFetchTriggerTracesCompleted', tracesObj);
    this.setTraces(tracesObj._items);
  },

  onFetchScheduleTracesCompleted(tracesObj) {
    console.debug('TracesStore::onFetchScheduleTracesCompleted', tracesObj);
    this.setTraces(tracesObj._items);
  },

  onFetchCurrentSnippetCompleted(currentObj) {
    console.debug('TracesStore::onFetchCurrentSnippetCompleted', currentObj);
    this.saveCurrentObj(currentObj.label);
  },

  onFetchCurrentCodeBoxCompleted(currentObj) {
    console.debug('TracesStore::onFetchCurrentCodeBoxCompleted', currentObj);
    this.saveCurrentObj(currentObj.name);
  },
  onFetchCurrentTriggerCompleted(currentObj) {
    console.debug('TracesStore::onFetchCurrentTriggerCompleted', currentObj);
    this.saveCurrentObj(currentObj.label);
  },

  onFetchCurrentScheduleCompleted(currentObj) {
    console.debug('TracesStore::onFetchCurrentScheduleCompleted', currentObj);
    this.saveCurrentObj(currentObj.label);
  }
});
