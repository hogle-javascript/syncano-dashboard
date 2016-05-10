import Reflux from 'reflux';
import _ from 'lodash';

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

    if (!_.isEmpty(SessionStore.getInstance()) && !_.isEmpty(this.data.objectId)) {
      this.fetchTraces();
      this.fetchCurrentItem();
    }
  },

  fetchCurrentItem() {
    let fetch = {
      script: Actions.fetchCurrentScript,
      scriptEndpoint: Actions.fetchCurrentScriptEndpoint,
      trigger: Actions.fetchCurrentTrigger,
      schedule: Actions.fetchCurrentSchedule
    };

    fetch[this.data.tracesFor](this.data.objectId);
  },

  fetchTraces() {
    let fetch = {
      script: Actions.fetchScriptTraces,
      scriptEndpoint: Actions.fetchScriptEndpointTraces,
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

  onFetchScriptTracesCompleted(tracesObj) {
    console.debug('TracesStore::onFetchScriptTracesCompleted', tracesObj);
    this.setTraces(tracesObj._items);
  },

  onFetchScriptEndpointTracesCompleted(scriptEndpointTraces) {
    console.debug('TracesStore::onFetchScriptEndpointTracesCompleted', scriptEndpointTraces);
    this.setTraces(scriptEndpointTraces);
  },

  onFetchTriggerTracesCompleted(triggerTraces) {
    console.debug('TracesStore::onFetchTriggerTracesCompleted', triggerTraces);
    this.setTraces(triggerTraces);
  },

  onFetchScheduleTracesCompleted(scheduleTraces) {
    console.debug('TracesStore::onFetchScheduleTracesCompleted', scheduleTraces);
    this.setTraces(scheduleTraces);
  },

  onFetchCurrentScriptCompleted(currentObj) {
    console.debug('TracesStore::onFetchCurrentScriptCompleted', currentObj);
    this.saveCurrentObj(currentObj.label);
  },

  onFetchCurrentScriptEndpointCompleted(currentObj) {
    console.debug('TracesStore::onFetchCurrentScriptEndpointCompleted', currentObj);
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
