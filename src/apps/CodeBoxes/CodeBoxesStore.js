import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

// Stores & Actions
import SessionActions from '../Session/SessionActions';
import Actions from './CodeBoxesActions';

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

  setCodeBoxes(items) {
    this.data.items = items;
    this.trigger(this.data);
  },

  getCodeBoxes(empty) {
    return this.data.items || empty || null;
  },

  refreshData() {
    Actions.fetchCodeBoxes();
  },

  onFetchCodeBoxesCompleted(items) {
    console.debug('CodeBoxesStore::onFetchCodeBoxesCompleted');
    Actions.setCodeBoxes(items._items);
  },

  onRemoveCodeBoxesCompleted() {
    this.refreshData();
  }
});
