import Reflux from 'reflux';
import D from 'd.js';

import Mixins from '../../mixins';

import SessionActions from '../Session/SessionActions';
import Actions from './CodeBoxesActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    Mixins.CheckListStore,
    Mixins.StoreLoading,
    Mixins.WaitForStore
  ],

  langMap: {
    python: 'python',
    nodejs: 'javascript',
    ruby: 'ruby',
    golang: 'golang'
  },

  runtimeColors: {
    nodejs: {color: '#80BD01', icon: 'language-javascript'},
    python: {color: '#4984B1', icon: 'language-python'},
    golang: {color: '#E0EBF5', icon: 'code-array'},
    ruby: {color: '#B21000', icon: 'code-array'}
  },

  getInitialState() {
    return {
      items: [],
      triggers: [],
      schedules: [],

      currentCodeBoxId: null,

      AddDialogVisible: true,
      availableRuntimes: null,
      label: '',
      payload: '{"112":111}',
      description: '',
      selectedRuntimeIndex: 0,
      traces: [],
      isLoading: true
    }
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      SessionActions.setInstance,
      this.refreshData
    );
    this.setLoadingStates();
    this.listenTo(Actions.setCurrentCodeBoxId, this.fetchTraces)
  },

  fetchTraces() {
    console.debug('CodeBoxesStore::fetchTraces');
    if (this.data.currentCodeBoxId === null) {
      return;
    }
    Actions.fetchCodeBoxTraces(this.data.currentCodeBoxId);
  },

  getItems() {
    return this.data.items;
  },

  getEditorMode(codeBox) {
    return this.langMap[codeBox.runtime_name];
  },

  getRuntimeColorIcon(runtime) {
    return this.runtimeColors[runtime];
  },

  getCodeBoxesDropdown() {
    return this.data.items.map((item) => {
      return {
        payload: item.id,
        text: item.label
      }
    });
  },

  getCurrentCodeBox() {
    if (!this.data.currentCodeBoxId) {
      return null;
    }

    let currentItem = null;

    this.data.items.some((item) => {
      if (item.id.toString() === this.data.currentCodeBoxId.toString()) {
        currentItem = item;
        return true;
      }
    });
    return currentItem;
  },

  getCodeBoxById(id) {
    let codeBox = null;

    this.data.items.some((item) => {
      if (item.id.toString() === id.toString()) {
        codeBox = item;
        return true;
      }
    });
    return codeBox;
  },

  getCodeBoxIndex(id) {
    let codeBoxIndex = null;

    this.data.items.some((item, index) => {
      if (item.id.toString() === id.toString()) {
        codeBoxIndex = index;
        return true;
      }
    });
    return codeBoxIndex;
  },

  refreshData() {
    console.debug('CodeBoxesStore::refreshData');
    D.all([
      Actions.fetchCodeBoxes(),
      Actions.fetchTriggers(),
      Actions.fetchSchedules()
    ]).then(() => {
      this.data.isLoading = false;
      this.trigger(this.data);
    })
  },

  setCodeBoxes(items) {
    this.data.items = Object.keys(items).map((key) => items[key]);
    this.trigger(this.data);
  },

  setCodeBoxTraces(items) {
    this.data.traces = Object.keys(items).sort().map((key) => items[key]);
    this.trigger(this.data);
  },

  onSetCurrentCodeBoxId(CodeBoxId) {
    console.debug('CodeBoxesStore::onSetCurrentCodeBoxId', CodeBoxId);
    this.data.currentCodeBoxId = CodeBoxId;
    this.trigger(this.data);
  },

  onRemoveCodeBoxesCompleted(payload) {
    console.debug('CodeBoxesStore::onRemoveCodeBoxesCompleted');
    this.data.hideDialogs = true;
    this.refreshData();
  },

  onFetchCodeBoxesCompleted(codeboxes) {
    console.debug('CodeBoxesStore::onFetchCodeBoxesCompleted');
    Actions.setCodeBoxes(codeboxes, 'items');
  },

  onFetchTriggersCompleted(triggers) {
    console.debug('CodeBoxesStore::onFetchTriggersCompleted');
    this.setItems(triggers, 'triggers')
  },

  onFetchSchedulesCompleted(schedules) {
    console.debug('CodeBoxesStore::onFetchSchedulesCompleted');
    this.setItems(schedules, 'schedules')
  },

  setItems(items, itemsType) {
    this.data[itemsType] = Object.keys(items).map((key) => items[key]);
  },

  onRunCodeBox() {
    console.debug('CodeBoxesStore::onRunCodeBox');
    this.trigger(this.data);
  },

  onRunCodeBoxCompleted(trace) {
    console.debug('CodeBoxesStore::onRunCodeBoxCompleted');
    this.data.lastTrace = trace;
    Actions.fetchCodeBoxTrace(this.data.currentCodeBoxId, trace.id);
  },

  onFetchCodeBoxTraceCompleted(trace) {
    console.debug('CodeBoxesStore::onFetchCodeBoxTrace');
    if (trace.status === 'pending') {
      let CodeBoxId = this.data.currentCodeBoxId;

      setTimeout(() => {
        Actions.fetchCodeBoxTrace(CodeBoxId, trace.id)
      }, 300);
    } else {
      this.data.lastTraceResult = trace.result;
    }
    this.trigger(this.data);
  },

  onFetchCodeBoxTracesCompleted(items) {
    console.debug('CodeBoxesStore::onFetchCodeBoxTraces');
    Actions.setCodeBoxTraces(items);
  }
});
