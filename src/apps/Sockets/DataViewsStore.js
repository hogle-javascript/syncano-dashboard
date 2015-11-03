import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

// Stores & Actions
import SessionActions from '../Session/SessionActions';
import DataViewsActions from './DataViewsActions';

export default Reflux.createStore({
  listenables: DataViewsActions,
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

  getDataViews(empty) {
    return this.data.items || empty || null;
  },

  setDataViews(items) {
    console.debug('DataViewsStore::setDataViews');
    this.data.items = Object.keys(items).map((key) => items[key]);
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  refreshData() {
    console.debug('DataViewsStore::refreshData');
    DataViewsActions.fetchDataViews();
  },

  onFetchDataViewsCompleted(items) {
    console.debug('DataViewsStore::onFetchDataViewsCompleted');
    DataViewsActions.setDataViews(items);
  },

  onRemoveDataViewsCompleted() {
    console.debug('DataViewsStore::onRemoveDataViewsCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  }
});
