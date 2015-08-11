import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

// Stores & Actions
import SessionActions from '../Session/SessionActions';
import Actions from './ApiKeysActions';

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
      SessionActions.setUser,
      SessionActions.setInstance,
      this.refreshData
    );
    this.setLoadingStates();
  },

  refreshData() {
    console.debug('ApiKeysStore::refreshData');
    Actions.fetchApiKeys();
  },

  setApiKeys(items) {
    console.debug('AdminsStore::setApiKeys');

    this.data.items = Object.keys(items).map(key => items[key]);
    this.trigger(this.data);
  },

  onFetchApiKeys() {
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchApiKeysCompleted(items) {
    console.debug('ApiKeysStore::onFetchApiKeysCompleted');
    Actions.setApiKeys(items);
  },

  onRemoveApiKeysCompleted() {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onResetApiKeyCompleted() {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  }
});
