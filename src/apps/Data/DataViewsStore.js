import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

//Stores & Actions
import Constants from '../../constants/Constants';
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
    }
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      SessionActions.setInstance,
      this.refreshData
    );
  },

  getDataViews(empty) {
    return this.data.items || empty || null;
  },

  setDataViews(items) {
    console.debug('DataViewsStore::setDataViews');
    this.data.items = Object.keys(items).map(key => items[key]);
    this.trigger(this.data);
  },

  refreshData() {
    console.debug('DataViewsStore::refreshData');
    DataViewsActions.fetchDataViews();
  },

  onFetchDataViews() {
    console.debug('DataViewsStore::onFetchDataViews');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchDataViewsCompleted(items) {
    console.debug('DataViewsStore::onFetchDataViewsCompleted');
    this.data.isLoading = false;
    DataViewsActions.setDataViews(items);
  },

  onRemoveDataViewsCompleted() {
    console.debug('DataViewsStore::onRemoveDataViewsCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  }
});
