import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

// Stores & Actions
import SessionActions from '../Session/SessionActions';
import SchedulesActions from './SchedulesActions';

export default Reflux.createStore({
  listenables: SchedulesActions,
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

  getSchedules(empty) {
    return this.data.items || empty || null;
  },

  setSchedules(items) {
    console.debug('SchedulesStore::setSchedules');
    this.data.items = items;
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  refreshData() {
    console.debug('SchedulesStore::refreshData');
    SchedulesActions.fetchSchedules();
  },

  onFetchSchedules() {
    console.debug('SchedulesStore::onFetchSchedules');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchSchedulesCompleted(items) {
    console.debug('SchedulesStore::onFetchSchedulesCompleted');
    SchedulesActions.setSchedules(items._items);
  },

  onRemoveSchedulesCompleted() {
    console.debug('SchedulesStore::onRemoveSchedulesCompleted');
    this.data.hideDialogs = true;
    this.refreshData();
  }
});
