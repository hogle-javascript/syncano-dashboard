import Reflux from 'reflux';

// Utils & Mixins
import { WaitForStoreMixin, StoreLoadingMixin } from '../../mixins';

// Stores & Actions
import SessionActions from '../Session/SessionActions';
import Actions from './DemoAppsActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
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
      SessionActions.setUser,
      this.refreshData
    );
    this.setLoadingStates();
  },

  refreshData() {
    console.debug('DemoAppsStore::refreshData');
    Actions.fetchDemoApps();
  },

  onFetchDemoAppsCompleted(demoApps) {
    console.debug('DemoAppsStore::onFetchDemoAppsCompleted');
    this.data.items = demoApps.data.objects;
    this.trigger(this.data);
  }
});
