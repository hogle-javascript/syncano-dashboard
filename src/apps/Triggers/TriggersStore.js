import Reflux from 'reflux';

// Utils & Mixins
import { CheckListStoreMixin, WaitForStoreMixin, StoreLoadingMixin } from '../../mixins';

// Stores & Actions
import SessionActions from '../Session/SessionActions';
import Actions from './TriggersActions';
import ScriptsActions from '../Scripts/ScriptsActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    CheckListStoreMixin,
    WaitForStoreMixin,
    StoreLoadingMixin
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
      ScriptsActions.fetchScripts.completed,
      this.refreshData
    );
    this.setLoadingStates();
  },

  setTriggers(items) {
    this.data.items = items;
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  getTriggers(empty) {
    return this.data.items || empty || null;
  },

  refreshData() {
    console.debug('TriggersStore::refreshData');
    Actions.fetchTriggers();
  },

  onFetchTriggersCompleted(items) {
    console.debug('TriggersStore::onFetchTriggersCompleted');
    Actions.setTriggers(items);
  },

  onRemoveTriggersCompleted() {
    this.refreshData();
  }
});
