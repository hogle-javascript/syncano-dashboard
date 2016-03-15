import Reflux from 'reflux';

// Utils & Mixins
import {CheckListStoreMixin, WaitForStoreMixin, StoreLoadingMixin} from '../../mixins';

// Stores & Actions
import SessionActions from '../Session/SessionActions';
import Actions from './DataEndpointsActions';

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
      this.refreshData
    );
    this.setLoadingStates();
  },

  getDataEndpoints(empty) {
    return this.data.items || empty || null;
  },

  setDataEndpoints(items) {
    console.debug('DataEndpointsStore::setDataEndpoints');
    this.data.items = items;
    this.trigger(this.data);
  },

  refreshData() {
    console.debug('DataEndpointsStore::refreshData');
    Actions.fetchDataEndpoints();
  },

  onFetchDataEndpointsCompleted(items) {
    console.debug('DataEndpointsStore::onFetchDataEndpointsCompleted');
    Actions.setDataEndpoints(items._items);
  },

  onRemoveDataEndpointsCompleted() {
    console.debug('DataEndpointsStore::onRemoveDataEndpointsCompleted');
    this.refreshData();
  }
});
