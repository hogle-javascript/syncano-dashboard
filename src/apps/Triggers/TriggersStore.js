import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

// Stores & Actions
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
    };
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setInstance,
      this.refreshData
    );
  },

  setTriggers(items) {
    this.data.items = Object.keys(items).map((item) => items[item]);
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  getTriggers(empty) {
    return this.data.items || empty || null;
  },

  refreshData() {
    console.debug('TriggersStore::refreshData');
    TriggersActions.fetchTriggers();
  },

  onFetchTriggers() {
    console.debug('TriggersStore::onFetchTriggers');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchTriggersCompleted(items) {
    console.debug('TriggersStore::onFetchTriggersCompleted');
    TriggersActions.setTriggers(items);
  },

  onRemoveTriggersCompleted() {
    this.data.hideDialogs = true;
    this.refreshData();
  }
});
