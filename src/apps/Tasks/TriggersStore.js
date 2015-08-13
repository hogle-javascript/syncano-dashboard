import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

// Stores & Actions
import ClassesActions from '../Classes/ClassesActions';
import CodeBoxesActions from '../CodeBoxes/CodeBoxesActions';
import SessionActions from '../Session/SessionActions';
import TriggersActions from './TriggersActions';

export default Reflux.createStore({
  listenables: TriggersActions,
  mixins: [
    Mixins.CheckListStore,
    Mixins.WaitForStore
  ],

  getInitialState() {
    return {
      items: [],
      isLoading: true
    }
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      SessionActions.setInstance,
      ClassesActions.fetchClasses,
      CodeBoxesActions.fetchCodeBoxes,
      this.refreshData
    );
  },

  setTriggers(items) {
    this.data.items = Object.keys(items).map(item => items[item]);
    this.trigger(this.data);
  },

  getTriggers(empty) {
    return this.data.items || empty || null;
  },

  refreshData() {
    TriggersActions.fetchTriggers();
  },

  onFetchTriggers() {
    console.debug('TriggersStore::onFetchTriggers');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchTriggersCompleted(items) {
    console.debug('TriggersStore::onFetchTriggersCompleted');
    this.data.isLoading = false;
    TriggersActions.setTriggers(items);
  },

  onRemoveTriggersCompleted() {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  }
});
