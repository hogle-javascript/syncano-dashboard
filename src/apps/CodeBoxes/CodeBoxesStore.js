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

  setCodeBoxes(items) {
    this.data.items = Object.keys(items).map((item) => items[item]);
    this.trigger(this.data);
  },

  getCodeBoxes(empty) {
    return this.data.items || empty || null;
  },

  refreshData() {
    Actions.fetchCodeBoxes();
  },

  onFetchCodeBoxes() {
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchCodeBoxesCompleted(items) {
    console.debug('CodeBoxesStore::onFetchCodeBoxesCompleted');
    this.data.isLoading = false;
    Actions.setCodeBoxes(items);
  },

  onRemoveCodeBoxesCompleted() {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  }
});
