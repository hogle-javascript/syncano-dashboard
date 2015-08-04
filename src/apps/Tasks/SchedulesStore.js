import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

//Stores & Actions
import Constants from '../../constants/Constants';
import CodeBoxesActions from '../CodeBoxes/CodeBoxesActions';
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
    }
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      SessionActions.setInstance,
      CodeBoxesActions.fetchCodeBoxes,
      this.refreshData
    );
  },

  getSchedules(empty) {
    return this.data.items || empty || null;
  },

  setSchedules(items) {
    console.debug('SchedulesStore::setSchedules');
    this.data.items = Object.keys(items).map(key => items[key]);
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
    this.data.isLoading = false;
    SchedulesActions.setSchedules(items);
  },

  onRemoveSchedulesCompleted() {
    console.debug('SchedulesStore::onRemoveSchedulesCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  }
});
