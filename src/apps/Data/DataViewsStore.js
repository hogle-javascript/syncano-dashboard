import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

// Stores & Actions
import SessionActions from '../Session/SessionActions';
import Actions from './DataViewsActions';

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

  getDataViews(empty) {
    return this.data.items || empty || null;
  },

  setDataViews(items) {
    console.debug('DataViewsStore::setDataViews');
    this.data.items = items;
    this.trigger(this.data);
  },

  refreshData() {
    console.debug('DataViewsStore::refreshData');
    Actions.fetchDataViews();
  },

  onFetchDataViewsCompleted(items) {
    console.debug('DataViewsStore::onFetchDataViewsCompleted');
    Actions.setDataViews(items._items);
  },

  onRemoveDataViewsCompleted() {
    console.debug('DataViewsStore::onRemoveDataViewsCompleted');
    this.refreshData();
  }
});
