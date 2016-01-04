import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

// Stores & Actions
import SessionActions from '../Session/SessionActions';
import Actions from './SchedulesActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    Mixins.CheckListStore,
    Mixins.WaitForStore,
    Mixins.StoreLoading
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
    this.setLoadingStates();
  },

  getSchedules(empty) {
    return this.data.items || empty || null;
  },

  setSchedules(items) {
    console.debug('SchedulesStore::setSchedules');
    this.data.items = items;
    this.trigger(this.data);
  },

  refreshData() {
    console.debug('SchedulesStore::refreshData');
    Actions.fetchSchedules();
  },

  onFetchSchedulesCompleted(items) {
    console.debug('SchedulesStore::onFetchSchedulesCompleted');
    Actions.setSchedules(items._items);
  },

  onRemoveSchedulesCompleted() {
    console.debug('SchedulesStore::onRemoveSchedulesCompleted');
    this.refreshData();
  }
});
